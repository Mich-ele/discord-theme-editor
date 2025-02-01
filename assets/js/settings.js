const fonts = [
    {"name": "Chakra Petch", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');`, "family": `font-family: "Chakra Petch", serif;`},
    {"name": "Roboto", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');`, "family": `font-family: "Roboto", serif;`},
    {"name": "Orbitron", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');`, "family": `font-family: "Orbitron", serif;`},
    {"name": "Quantico", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap');`, "family": `font-family: "Quantico", serif;`},
    {"name": "Open Sans", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');`, "family": `font-family: "Open Sans", serif;`},
    {"name": "Montserrat", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');`, "family": `font-family: "Montserrat", serif;`},
    {"name": "Nunito Sans", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`, "family": `font-family: "Nunito Sans", serif;`},
    {"name": "Rubik", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');`, "family": `font-family: "Rubik", serif;`},
    {"name": "Inconsolata", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');`, "family": `font-family: "Inconsolata", serif;`},
    {"name": "Titillium Web", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');`, "family": `font-family: "Titillium Web", serif;`},
    {"name": "Noto Serif", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');`, "family": `font-family: "Noto Serif", serif;`},
    {"name": "Dosis", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');`, "family": `font-family: "Dosis", serif;`},
    {"name": "IBM Plex Mono", "import_src": `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');`, "family": `font-family: "IBM Plex Mono", serif;`},
    {"name": "UnifrakturMaguntia", "import_src": `@import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap');`, "family": `font-family: "UnifrakturMaguntia", serif;`},
    {"name": "Jacquard 24", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Jacquard+24&display=swap');`, "family": `font-family: "Jacquard 24", serif;`},
    {"name": "Texturina", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Texturina:ital,opsz,wght@0,12..72,100..900;1,12..72,100..900&display=swap');`, "family": `font-family: "Texturina", serif;`},
    {"name": "Almendra Display", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Almendra+Display&display=swap');`, "family": `font-family: "Almendra Display", serif;`},
    {"name": "New Rocker", "import_src": `@import url('https://fonts.googleapis.com/css2?family=New+Rocker&display=swap');`, "family": `font-family: "New Rocker", serif;`},
    {"name": "Joti One", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Joti+One&display=swap');`, "family": `font-family: "Joti One", serif;`},
    {"name": "Henny Penny", "import_src": `@import url('https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap');`, "family": `font-family: "Henny Penny", serif;`},
    //{"name": "", "import_src": ``, "family": `font-family: `},
]

document.addEventListener("DOMContentLoaded", () => {
    addFonts();

    const combobox = document.querySelector(".combobox_screenReaderSelect__i3X_F");
    const input = combobox.querySelector("input");
    const dropdown = combobox.querySelector("ul");
    const options = dropdown.querySelectorAll("li");
    const toggleButton = combobox.querySelector("button[aria-label='Open menu']");
    const clearButton = combobox.querySelector("button[aria-label='Clear selected value']");
    
    function toggleDropdown(show) {
        dropdown.style.display = show ? "block" : "none";
        combobox.setAttribute("aria-expanded", show);
    }

    function selectOption(option) {
        input.value = option.textContent.trim();
        input.setAttribute("data-selected", option.id);
        toggleDropdown(false);
        clearButton.style.display = "inline-block";
        toggleButton.style.display = "none";
    }

    toggleButton.addEventListener("click", () => {
        toggleDropdown(dropdown.style.display === "none");
    });

    input.addEventListener("focus", () => toggleDropdown(true));
    input.addEventListener("blur", () => setTimeout(() => toggleDropdown(false), 200));

    options.forEach(option => {
        option.addEventListener("click", () => selectOption(option));
    });

    clearButton.addEventListener("click", () => {
        input.value = "";
        input.removeAttribute("data-selected");
        clearButton.style.display = "none";
        toggleButton.style.display = "inline-flex";
    });
});

/* Add & Update Fonts */
function updateFont(fontName) {
    const idx = parseInt(fontName);
    
    if (isNaN(idx) || idx < 0 || idx >= fonts.length) {
        console.error('Invalid font index');
        return;
    }

    const importCode = fonts[idx].import_src;
    const fontFamily = fonts[idx].family;

    const updateCode = `${importCode}
body {
    ${fontFamily}
    font-style: normal;
}`;

    window.electronAPI.updateFont(updateCode);
}

function addFonts() {
    const fontComboBox = document.getElementById("combobox-fonts");
    fontComboBox.innerHTML = "";

    fonts.forEach((font, index) => {
        const styleElement = document.createElement("style");
        styleElement.textContent = font.import_src;
        document.head.appendChild(styleElement);

        const fontItem = document.createElement("li");
        fontItem.setAttribute("aria-selected", "false");
        fontItem.classList.add("combobox_option__XUQ3q");
        fontItem.setAttribute("data-highlighted", "false");
        fontItem.setAttribute("role", "option");
        fontItem.setAttribute("data-order", index);
        fontItem.style.height = "36px";
        fontItem.style.cursor = "pointer";
        fontItem.id = `font-option-${index}`;

        const span = document.createElement("span");
        span.classList.add("combobox_truncate__4H1aj");
        span.style.cssText = font.family;
        span.title = font.name;
        span.textContent = font.name;

        fontItem.appendChild(span);
        fontComboBox.appendChild(fontItem);
    });
}

/* Change Fonts */
const inputElement = document.getElementById('combobox-input-:r5s:');

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'data-selected') {
            const selectedValue = inputElement.getAttribute('data-selected').replace("font-option-", "");
            updateFont(selectedValue);
        }
    });
});

observer.observe(inputElement, { attributes: true });


/* Change Header Icon */
document.getElementById('changeBtn').addEventListener('click', () => {
    document.getElementById('headerIconInput').click();
});

document.getElementById('headerIconInput').addEventListener('change', async (event) => {
    if (!event.target.files.length) return;
    
    const file = event.target.files[0];
    const fileName = file.name; 
    document.getElementById("selectedHeaderLogoName").innerText = fileName;
    const arrayBuffer = await file.arrayBuffer();
    window.electronAPI.updateHeaderIcon(new Uint8Array(arrayBuffer));
});

document.getElementById('removeHeaderBtn').addEventListener('click', async (event) => {
    window.electronAPI.updateHeaderIcon(new Uint8Array([]));
});