document.addEventListener('DOMContentLoaded', async () => {
    const themes = await window.electronAPI.getInstalledThemes();
    themes.forEach(theme => {
        document.getElementById("container-fluid").innerHTML += `<div class="book_perspective__3OWAu" style="--book-width: 350; --hover-rotate: 0; padding-left: 1.5em; padding-top: 1.5em; --hover-translate-x: 0;">
        <div class="book_rotate-wrapper___GDX_ book_stripe__HjWCM book_color__PrK1W" style="--book-color: var(--tw-shadow); --aspect-ratio: 60/56;">
            <div class="stack_stack__iZkUS stack book_book__dm8K_" data-version="v1" style="--stack-flex: initial; --stack-direction: column; --stack-align: stretch; --stack-justify: flex-start; --stack-padding: 0px; --stack-gap: 0px;">
                <div
                    class="stack_stack__iZkUS stack book_stripe__HjWCM"
                    data-version="v1"
                    aria-hidden="true"
                    style="--stack-flex: initial; --stack-direction: row; --stack-align: stretch; --stack-justify: flex-start; --stack-padding: 0px; --stack-gap: 8px; max-height: 200px;"
                >
                    <div class="book_illustration__VZiZd"><img src="themes/${theme.name}/${theme.img}" style="height: 100%; width: 100%;" /></div>
                </div>
                <div class="stack_stack__iZkUS stack book_body__kq24l" data-version="v1" style="--stack-flex: initial; --stack-direction: row; --stack-align: stretch; --stack-justify: flex-start; --stack-padding: 0px; --stack-gap: 0px;">
                    <div
                        class="stack_stack__iZkUS stack book_content__3675U"
                        data-version="v1"
                        style="--stack-flex: initial; --stack-direction: column; --stack-align: stretch; --stack-justify: space-between; --stack-padding: 0px; --stack-gap: 0px;"
                    >
                        <span
                            class="text_wrapper__i87JK book_title__H_uQ3"
                            data-version="v1"
                            style="--text-color: var(--ds-gray-1000); --text-size: 0.675rem; --text-line-height: 1.25rem; --text-letter-spacing: initial; --text-weight: 600; font-size: medium; margin:auto;"
                        >
                        ${theme.name.replaceAll("_", " ")}
                        </span>
    
                        <img alt="" loading="eager" width="0" height="0" decoding="async" data-nimg="1" src="/vc-ap-geist-docs/_next/static/media/logo-vercel-dark.844bc059.svg" style="color: transparent; display: none; visibility: hidden;" />
                        <button type="submit" onclick="loadTheme('${theme.name}')" class="sidebar-item active" data-geist-button="" data-prefix="false" data-suffix="false" data-version="v1" style="--geist-icon-size: 16px;max-width: 350px;width: 100%;margin: auto;border-radius: 10px;">
                            <span class="button_content__1aE1_" style="font-family: 'Chakra Petch', serif; font-weight: 500;">Load Theme</span>
                        </button>
                    </div>
                </div>
            </div>
            <div aria-hidden="true" class="book_pages__6N3lq"></div>
            <div aria-hidden="true" class="book_back__Du6NO"></div>
        </div>
    </div>       
    `;
        
    });

    hoverBtns();
});

async function loadTheme(theme_name) {
    await window.electronAPI.loadTheme(theme_name);
}