const themeSwitcherButton = document.getElementById("theme-switcher-button");
let editor = null;

function applyTheme() {
    try {
        var d = document.documentElement,
            c = d.classList;
        c.remove("light-theme", "dark-theme");
        var e = localStorage.getItem("zeit-theme");
        if ("system" === e || (!e)) {
            var t = "(prefers-color-scheme: dark)",
                m = window.matchMedia(t);
            if (m.media !== t || m.matches) {
                d.style.colorScheme = "dark";
                c.add("dark-theme");
                if (editor) monaco.editor.setTheme("vs-dark");
            } else {
                d.style.colorScheme = "light";
                c.add("light-theme");
                if (editor) monaco.editor.setTheme("vs");
            }
        } else if (e) {
            var x = { light: "light-theme", dark: "dark-theme" };
            c.add(x[e] || "");
            if (e === "light") {
                if (editor) monaco.editor.setTheme("vs");
            } else if (e === "dark") {
                if (editor) monaco.editor.setTheme("vs-dark");
            }
        }
        if (e === "light" || e === "dark") d.style.colorScheme = e;
    } catch (e) {
        console.error("Error applying theme:", e);
    }
}

function hoverBtns() {
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => {
        btn.addEventListener('mouseover', () => {
        btn.setAttribute('data-hover', '');
      });
  
      btn.addEventListener('mouseout', () => {
        btn.removeAttribute('data-hover');
      });
    });
}

applyTheme();
hoverBtns();

themeSwitcherButton.addEventListener('click', () => {
    const currentTheme = localStorage.getItem("zeit-theme");
    let newTheme;

    if (currentTheme === 'dark') {
        newTheme = 'light';
    } else if (currentTheme === 'light') {
        newTheme = 'system';
    }
    else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }
    }


    localStorage.setItem("zeit-theme", newTheme);
    applyTheme();
});

function showInfoModal() {
    const modal = document.getElementById("info-modal");
    modal.classList.add("modal-show");
    modal.classList.remove("modal-hidden");
}

function closeModal() {
    const modal = document.getElementById("info-modal");
    modal.classList.remove("modal-show");
}

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        if (link.getAttribute('href') !== "#" && link.getAttribute('href') !== null && link.getAttribute('href') !== "" && !link.getAttribute('href').includes("http")) {
            link.addEventListener('click', function(event) {
                event.preventDefault();

                const targetUrl = this.getAttribute('href');

                document.body.classList.add('fade-out');

                setTimeout(function() {
                    window.location.href = targetUrl;
                }, 150);
            });
        } else {
        }
    });
});