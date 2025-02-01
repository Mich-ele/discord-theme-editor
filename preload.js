const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getInstalledThemes: () => ipcRenderer.invoke('get-installed-themes'),
    getCustomCssSource: () => ipcRenderer.invoke('get-custom-css-source'),
    isAlreadyPatched: () => ipcRenderer.invoke('is-already-patched'),
    patchDiscord: () => ipcRenderer.invoke('patch-discord'),
    resetAsar:() => ipcRenderer.invoke('reset-asar'),
    updateCssFile: (text) => ipcRenderer.send('update-css-text', text),
    updateFont: (font_src) => ipcRenderer.send('update-font', font_src),
    loadTheme: (theme_name) => ipcRenderer.send('load-theme', theme_name),
    updateHeaderIcon: (data) => ipcRenderer.send("update-header-icon", data),
});

window.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            ipcRenderer.send('closeApp');
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            ipcRenderer.send('minimizeApp');
        });
    }

    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
            ipcRenderer.send('maximizeApp');
        });
    }
});