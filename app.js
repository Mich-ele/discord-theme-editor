const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');
const asar = require('asar');

// Promisify readdir for async/await usage
const readdir = util.promisify(fs.readdir);

// Define variables
let mainWindow;
let maximized = false;
let customCSSPath = null;
const assetsPath = path.join(__dirname, 'assets');
const themesDir = path.join(assetsPath, 'themes');

// App initialization
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1250,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'assets', 'images', 'logo-brush.png'),
        frame: false,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    customCSSPath = getCustomCssFile();
    const htmlFile = customCSSPath ? 'themes.html' : 'patch.html';
    mainWindow.loadFile(path.join(assetsPath, htmlFile));

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith('file://')) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// Quit app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle header button actions
ipcMain.on('closeApp', () => mainWindow.close());
ipcMain.on('minimizeApp', () => mainWindow.minimize());
ipcMain.on('maximizeApp', () => {
    maximized = !maximized;
    maximized ? mainWindow.maximize() : mainWindow.restore();
});

// Handle custom CSS updates
ipcMain.on('update-css-text', async (event, text) => {
    try {
        customCSSPath = getCustomCssFile();
        if (customCSSPath) {
            await fs.promises.writeFile(customCSSPath, text, 'utf-8');
        }
    } catch (err) {
        console.error('Error updating CSS:', err);
    }
});


// Handle load theme
ipcMain.on('load-theme', async (event, theme) => {
    try {
        customCSSPath = getCustomCssFile();
        
        if (customCSSPath) {
            const themePath = path.join(themesDir, theme, "src.css");
            const themeSrc = await fs.promises.readFile(themePath, 'utf-8');
            await fs.promises.writeFile(customCSSPath, themeSrc, 'utf-8');
        }
    } catch (err) {
        console.error('Error updating CSS:', err);
    }
});

// Handle load theme
ipcMain.on('update-font', async (event, font_src) => {
    customCSSPath = getCustomCssFile();
    if (!customCSSPath) return;

    let themeSrc = (await fs.promises.readFile(customCSSPath, 'utf-8')).trim();

    themeSrc = themeSrc.replace(/\n?\s*\/\*Custom Font Start\*\/[\s\S]*?\/\*Custom Font End\*\//g, '').trim();

    const lines = font_src.split('\n').map(line => line.trim());
    const importLines = lines.filter(line => /^@import/.test(line));
    const codeLines = lines.filter(line => !/^@import/.test(line));

    const newFontSection = `/*Custom Font Start*/\n${importLines.join('\n')}\n/*Custom Font End*/\n\n${themeSrc}\n\n/*Custom Font Start*/\n${codeLines.join('\n')}\n/*Custom Font End*/`.trim();

    await fs.promises.writeFile(customCSSPath, newFontSection, 'utf-8');
});

ipcMain.on("update-header-icon", async (_, data) => {
    customCSSPath = getCustomCssFile();
    if (!customCSSPath) return;

    let themeSrc = (await fs.promises.readFile(customCSSPath, 'utf-8')).trim();
    themeSrc = themeSrc.replace(/\n?\s*\/\*Custom Header Icon Start\*\/[\s\S]*?\/\*Custom Header Icon End\*\//g, '').trim();
    
    const base64 = Buffer.from(data).toString("base64");
    const header_logo = `.wordmark__421ed::before {
        content: "";
        display: block;
        width: 70px;
        height: 17px;
        margin: 2px 2px;
        background-image: url("data:image/png;base64,${base64}");
        background-repeat: no-repeat;
        background-size: contain;
    }
    .wordmark__421ed svg {
        display: none;
    }`;

    const newFontSection = `${themeSrc}\n\n/*Custom Header Icon Start*/\n${header_logo}\n/*Custom Header Icon End*/`;
    await fs.promises.writeFile(customCSSPath, newFontSection, 'utf-8');
});

// Handle requests from renderer process
ipcMain.handle('get-custom-css-source', async () => {
    try {
        customCSSPath = getCustomCssFile();
        return customCSSPath ? await fs.promises.readFile(customCSSPath, 'utf-8') : '';
    } catch (err) {
        return '';
    }
});

ipcMain.handle('get-installed-themes', async () => {
    return getFoldersInDirectory();
});

ipcMain.handle('is-already-patched', async () => {
    customCSSPath = getCustomCssFile();
    return fs.existsSync(customCSSPath);
});

ipcMain.handle('patch-discord', async () => {
    return await doPatch();
});

ipcMain.handle('reset-asar', async () => {
    return revertAsar();
});

// Backend functions
function removeDuplicateLines(inputString) {
    const lines = inputString.split('\n');
    const uniqueLines = [...new Set(lines)];
    return uniqueLines.join('\n');
}

async function removeExtractedFolder() {
    const extracted = path.join(getDiscordPath(), 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'extracted');
    try {
        await fs.promises.rm(extracted, { recursive: true, force: true });
    } catch (err) {
        console.error('Error removing extracted folder:', err);
    }
}

function getCustomCssFile() {
    const localAppData = process.env.LOCALAPPDATA;
    if (!localAppData) throw new Error('Cannot access %LocalAppData%');

    const discordDir = path.join(localAppData, 'discord');
    if (!fs.existsSync(discordDir)) throw new Error('Discord directory not found.');

    const subDirs = fs.readdirSync(discordDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith('app-'))
        .map((dirent) => dirent.name)
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

    if (!subDirs.length) throw new Error('No app dir found.');

    const latestAppDir = path.join(discordDir, subDirs[0]);
    customCSSPath = path.join(latestAppDir, 'custom.css');
    
    return fs.existsSync(customCSSPath) ? customCSSPath : null;
}

function getDiscordPath() {
    const localAppData = process.env.LOCALAPPDATA;
    if (!localAppData) return null;

    const discordDir = path.join(localAppData, 'discord');
    if (!fs.existsSync(discordDir)) return null;

    const subDirs = fs.readdirSync(discordDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith('app-'))
        .map((dirent) => dirent.name)
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

    if (!subDirs.length) return null;

    return path.join(discordDir, subDirs[0]);
}

async function getFoldersInDirectory() {
    try {
        const items = await readdir(themesDir, { withFileTypes: true });
        const folders = items.filter(item => item.isDirectory());
        return await Promise.all(folders.map(async (folder) => {
            const folderPath = path.join(themesDir, folder.name);
            const folderData = {
                name: folder.name,
                css: null,
                img: null,
            };

            const cssFilePath = path.join(folderPath, 'src.css');
            try {
                await access(cssFilePath);
                folderData.css = cssFilePath;
            } catch (error) {}

            try {
                const filesInFolder = await readdir(folderPath);
                const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
                const imageFile = filesInFolder.find(file =>
                    imageExtensions.includes(path.extname(file).toLowerCase())
                );
                if (imageFile) {
                    folderData.img = imageFile;
                }
            } catch (error) {}

            return folderData;
        }));
    } catch (error) {
        console.error('Error reading themes directory:', error);
        return [];
    }
}

async function revertAsar() {
    const discordPath = getDiscordPath();
    if (!discordPath) return "Can't find Discord path. It may not be installed.";

    const customCSSPath = path.join(discordPath, 'custom.css');
    await killDiscordWindows();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const coreAsar = path.join(discordPath, 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'core.asar');
    const backupAsar = path.join(discordPath, 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'backup.asar');

    try {
        await fs.promises.unlink(coreAsar);
        await fs.promises.rename(backupAsar, coreAsar);
        await fs.promises.unlink(customCSSPath);
    } catch (error) {
        console.error('Error reverting ASAR:', error);
        return error.message;
    }
    startDiscord();

    return '';
}

async function killDiscordWindows() {
    return new Promise((resolve) => {
        exec('taskkill /F /IM discord.exe', (error, stdout, stderr) => {
            resolve();
        });
    });
}

async function startDiscord() {
    const discordPath = path.join(getDiscordPath(), "Discord.exe");
    return new Promise((resolve) => {
        exec(`"${discordPath}"`, (error, stdout, stderr) => {
            resolve();
        });
    });
  }

async function doPatch() {
    const discordPath = getDiscordPath();
    if (!discordPath) return "Can't find Discord path. It may not be installed.";

    const customCSSPath = path.join(discordPath, 'custom.css');
    await killDiscordWindows();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const coreAsar = path.join(discordPath, 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'core.asar');
    const backupAsar = path.join(discordPath, 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'backup.asar');
    const extractedPath = path.join(discordPath, 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'extracted');
    const mainScreenPath = path.join(extractedPath, 'app', 'mainScreen.js');
    const preloadPath = path.join(extractedPath, 'app', 'mainScreenPreload.js');

    try {
        await fs.promises.rename(coreAsar, backupAsar);
        await asar.extractAll(backupAsar, extractedPath);
    } catch (error) {
        return `Error extracting ASAR: ${error}`;
    }

    let mainScreenContent = await fs.promises.readFile(mainScreenPath, 'utf8');
    let preloadContent = await fs.promises.readFile(preloadPath, 'utf8');

    const cssInjectionScript = `
    window._fileWatcher = null;
    window._styleTag = {};

    window.applyCSS = function(path, name) {
      var customCSS = window.DiscordThemeEditor.loadFile(path);
      if (!window._styleTag.hasOwnProperty(name)) {
        window._styleTag[name] = document.createElement("style");
        document.documentElement.appendChild(window._styleTag[name]);
      }
      window._styleTag[name].innerHTML = customCSS;
    }

    window.clearCSS = function(name) {
      if (window._styleTag.hasOwnProperty(name)) {
        window._styleTag[name].innerHTML = "";
        window._styleTag[name].parentElement.removeChild(window._styleTag[name]);
        delete window._styleTag[name];
      }
    }

    window.watchCSS = function(path) {
      let files;
      let dirname;

      if (window.DiscordThemeEditor.isDirectory(path)) {
        files = window.DiscordThemeEditor.readDir(path);
        dirname = path;
      } else {
        files = [window.DiscordThemeEditor.basename(path)];
        dirname = window.DiscordThemeEditor.dirname(path);
      }

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.endsWith(".css")) {
          window.applyCSS(window.DiscordThemeEditor.join(dirname, file), file)
        }
      }

      if (window._fileWatcher === null) {
        window._fileWatcher = window.DiscordThemeEditor.watcher(path,
          function(eventType, filename) {
            if (!filename.endsWith(".css")) return;
            path = window.DiscordThemeEditor.join(dirname, filename);
            if (eventType === "rename" && !window.DiscordThemeEditor.pathExists(path)) {
              window.clearCSS(filename);
            } else {
              window.applyCSS(window.DiscordThemeEditor.join(dirname, filename), filename);
            }
          }
        );
      }
    };

    window.tearDownCSS = function() {
      for (var key in window._styleTag) {
        if (window._styleTag.hasOwnProperty(key)) {
          window.clearCSS(key)
        }
      }
      if (window._fileWatcher !== null) { 
        window._fileWatcher.close(); 
        window._fileWatcher = null; 
      }
    };

    window.removeDuplicateCSS = function() {
      const styles = [...document.getElementsByTagName("style")];
      const styleTags = window._styleTag;

      for (let key in styleTags) {
        for (var i = 0; i < styles.length; i++) {
          const keyStyle = styleTags[key];
          const curStyle = styles[i];

          if (curStyle !== keyStyle) {
            const compare = keyStyle.innerText.localeCompare(curStyle.innerText);

            if (compare === 0) {
              const parent = curStyle.parentElement;
              parent.removeChild(curStyle);
            }
          }
        }
      }
    };

    window.applyAndWatchCSS = function(path) {
      window.tearDownCSS();
      window.watchCSS(path);
    };

    window.applyAndWatchCSS('${customCSSPath.replaceAll("\\", "/")}');
    window.removeDuplicateCSS();
    `;

    const cssReloadScript = `
        mainWindow.webContents.on('dom-ready', function () {
            mainWindow.webContents.executeJavaScript(\`${cssInjectionScript}\`);
        });
    `;

    const loadFileScript = `
    const bd_fs = require('fs');
    const bd_path = require('path');

    contextBridge.exposeInMainWorld('DiscordThemeEditor', {
        loadFile: (fileName) => {
            return bd_fs.readFileSync(fileName, 'utf-8');
        },
        readDir: (p) => {
            return bd_fs.readdirSync(p);
        },
        pathExists: (p) => {
            return bd_fs.existsSync(p);
        },
        watcher: (p, cb) => {
            return bd_fs.watch(p, { encoding: "utf-8" }, cb);
        },
        join: (a, b) => {
            return bd_path.join(a, b);
        },
        basename: (p) => {
            return bd_path.basename(p);
        },
        dirname: (p) => {
            return bd_path.dirname(p);
        },
        isDirectory: (p) => {
            return bd_fs.lstatSync(p).isDirectory()
        }
    });

    process.once('loaded', () => {
        global.require = require;
`;

    if (!preloadContent.includes("contextBridge.exposeInMainWorld('ThemeEditor',")) {
        preloadContent = preloadContent.replace("process.once('loaded', () => {", loadFileScript);
        await fs.promises.writeFile(preloadPath, preloadContent);
    }

    const indexJsPath = path.join(discordPath, 'modules', 'discord_desktop_core-1', 'discord_desktop_core', 'index.js');
    const bypassCsp = `require("electron").session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders }, done) => {
    let csp = responseHeaders["content-security-policy"];
    if (!csp) return done({cancel: false});
    let header = csp[0].replace(/connect-src ([^;]+);/, "connect-src $1 https://*;");
    header = header.replace(/style-src ([^;]+);/, "style-src $1 https://*;");
    header = header.replace(/img-src ([^;]+);/, "img-src $1 https://*;");
    header = header.replace(/font-src ([^;]+);/, "font-src $1 https://*;");
    responseHeaders["content-security-policy"] = header;
    done({ responseHeaders });
});
`;

    try {
        let content = await fs.promises.readFile(indexJsPath, 'utf8');
        if (!content.includes(bypassCsp)) {
            const updatedContent = bypassCsp + '\n' + content;
            await fs.promises.writeFile(indexJsPath, updatedContent, 'utf8');
        }
    } catch (error) {
        return `Error reading/writing index.js: ${error}`;
    }

    await fs.promises.writeFile(customCSSPath, "", 'utf8');
    await fs.promises.writeFile(mainScreenPath, Buffer.concat([
        Buffer.from(mainScreenContent.slice(0, mainScreenContent.indexOf("mainWindow.on('blur'")), 'utf8'),
        Buffer.from(cssReloadScript, 'utf8'),
        Buffer.from(mainScreenContent.slice(mainScreenContent.indexOf("mainWindow.on('blur'")), 'utf8')
    ]));
    
    try {
        await asar.createPackage(extractedPath, coreAsar);
    } catch (error) {
        return `Error creating ASAR package: ${error}`;
    }
    
    await removeExtractedFolder();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    startDiscord();

    return '';
}