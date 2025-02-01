document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('container-fluid')) {

        document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%;">
        <div class="w-full p-6" style="margin: auto;">
            <div class="spinner_wrapper__zbFtL" data-geist-spinner="" data-version="v1" style="--spinner-size: 28px; margin: auto;">
                <div class="spinner_spinner__fqUfx">
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                    <div class="spinner_bar__VysK5"></div>
                </div>
            </div>
        </div>
        </div>
        `;

        is_patched = await window.electronAPI.isAlreadyPatched();
        
        if (is_patched === true) {
            document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
            <div class="" style="margin: auto;">
                <div class="note_note__W1ddN note_action__r519Q v3-colors" data-geist-note="" data-version="v1" style="display: block; padding-left: 4em; padding-right: 4em; padding-top: 1em; padding-bottom: 1em; border: 0px !important;">
                    <div class="note_content__kXdj4" style="gap: 12px; margin-top: 2em; margin-left: auto; margin-right: 0; font-size: medium;">
                        <span style="display: flex; height: 16px;">
                            <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </span>
                        <span>Discord is already patched</span>
                    </div>
                    <div style="margin-top: 3em; margin-bottom: 1em;">
                        <button
                            type="submit"
                            class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-success geist-new-success-fill button_invert__YNhnn"
                            data-geist-button=""
                            data-prefix="false"
                            data-suffix="false"
                            data-version="v1"
                            style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                            onclick="patchDiscord()"
                        >
                            <span class="button_content__1aE1_">Patch Anyway</span>
                        </button>
                    </div>
                    <div style="margin-top: 1em; margin-bottom: 2em;">
                        <button
                            type="submit"
                            class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-warning geist-new-warning-fill button_invert__YNhnn"
                            data-geist-button=""
                            data-prefix="false"
                            data-suffix="false"
                            data-version="v1"
                            style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                            onclick="resetAsar()"
                        >
                            <span class="button_content__1aE1_">Deactivate Patch</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        } else {
            document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
                <div class="" style="margin: auto;">
                    <div class="note_note__W1ddN note_action__r519Q v3-colors" data-geist-note="" data-version="v1" style="display: block; padding-left: 4em; padding-right: 4em; padding-top: 1em; padding-bottom: 1em; border: 0px !important;">
                        <div class="note_content__kXdj4" style="gap: 12px; margin-top: 2em; margin-left: auto; margin-right: 0; font-size: medium;">
                            <span style="display: flex; height: 16px;">
                                <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span>Discord is NOT patched</span>
                        </div>
                        <div class="note_content__kXdj4" style="gap: 12px;margin-top: 0.5em;margin-left: auto;margin-right: 0;font-size: medium;">
                            <span>In order to use this tool click the button below.</span>
                        </div>
                        <div style="margin-top: 3em; margin-bottom: 1em;">
                            <button
                                type="submit"
                                class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-success geist-new-success-fill button_invert__YNhnn"
                                data-geist-button=""
                                data-prefix="false"
                                data-suffix="false"
                                data-version="v1"
                                style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                                onclick="patchDiscord()"
                            >
                                <span class="button_content__1aE1_">Patch</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        hoverBtns();
    }
});


async function patchDiscord() {
    document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
        <div class="" style="margin: auto;">
        <span class="loading-dots_loading___JiwF" data-geist-loading-dots="" data-version="v1" style="--loading-dots-size: 4px;"><div class="loading-dots_spacer__ZqLUW"><p class="text_wrapper__i87JK" data-version="v1" style="--text-color: var(--ds-gray-900); --text-size: 0.875rem; --text-line-height: 1.25rem; --text-letter-spacing: initial; --text-weight: 400;">Patching Discord</p></div><span></span><span></span><span></span></span>
        </div>
    </div>`;

    error = await window.electronAPI.patchDiscord();

    if (error === "") {
        document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
        <div class="" style="margin: auto;">
        <div class="note_note__W1ddN geist-success geist-success-fill v3-colors" data-geist-note="" data-version="v1"><div class="note_content__kXdj4" style="gap: 12px;"><span style="display: flex; height: 16px;"><svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="width: 16px; height: 16px; color: var(--ds-green-900);"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z" fill="currentColor"></path></svg></span><span>Discord patched succesfully. Now you can apply a custom theme.</span></div></div>
        <div style="margin-top: 1em; margin-bottom: 2em;">
            <button
                type="submit"
                class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-warning geist-new-warning-fill button_invert__YNhnn"
                data-geist-button=""
                data-prefix="false"
                data-suffix="false"
                data-version="v1"
                style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                onclick="resetAsar()"
            >
                <span class="button_content__1aE1_">Deactivate Patch</span>
            </button>
        </div>
        </div>
    </div>`;
    } else {
        document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
        <div class="" style="margin: auto;">
        <div class="note_note__W1ddN geist-error geist-error-fill v3-colors" data-geist-note="" data-version="v1" style="margin-right: 10%; margin-left: 10%;"><div class="note_content__kXdj4" style="gap: 12px;"><span style="display: flex; height: 16px;"><svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="width: 16px; height: 16px; color: var(--ds-red-900);"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.30761 1.5L1.5 5.30761L1.5 10.6924L5.30761 14.5H10.6924L14.5 10.6924V5.30761L10.6924 1.5H5.30761ZM5.10051 0C4.83529 0 4.58094 0.105357 4.3934 0.292893L0.292893 4.3934C0.105357 4.58094 0 4.83529 0 5.10051V10.8995C0 11.1647 0.105357 11.4191 0.292894 11.6066L4.3934 15.7071C4.58094 15.8946 4.83529 16 5.10051 16H10.8995C11.1647 16 11.4191 15.8946 11.6066 15.7071L15.7071 11.6066C15.8946 11.4191 16 11.1647 16 10.8995V5.10051C16 4.83529 15.8946 4.58093 15.7071 4.3934L11.6066 0.292893C11.4191 0.105357 11.1647 0 10.8995 0H5.10051ZM8.75 3.75V4.5V8L8.75 8.75H7.25V8V4.5V3.75H8.75ZM8 12C8.55229 12 9 11.5523 9 11C9 10.4477 8.55229 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z" fill="currentColor"></path></svg></span><span>${error}</span></div></div>
        
        <div style="margin-top: 3em; margin-bottom: 1em;">
            <button
                type="submit"
                class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-success geist-new-success-fill button_invert__YNhnn"
                data-geist-button=""
                data-prefix="false"
                data-suffix="false"
                data-version="v1"
                style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                onclick="patchDiscord()"
            >
                <span class="button_content__1aE1_">Patch</span>
            </button>
        </div>
        </div>
    </div>`;
    }
    hoverBtns();
}

async function resetAsar() {
    document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
        <div class="" style="margin: auto;">
        <span class="loading-dots_loading___JiwF" data-geist-loading-dots="" data-version="v1" style="--loading-dots-size: 4px;"><div class="loading-dots_spacer__ZqLUW"><p class="text_wrapper__i87JK" data-version="v1" style="--text-color: var(--ds-gray-900); --text-size: 0.875rem; --text-line-height: 1.25rem; --text-letter-spacing: initial; --text-weight: 400;">Removing patch</p></div><span></span><span></span><span></span></span>
        </div>
    </div>`;
    
    error = await window.electronAPI.resetAsar();
    if (error === "") {
        document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
        <div class="" style="margin: auto;">
        <div class="note_note__W1ddN geist-success geist-success-fill v3-colors" data-geist-note="" data-version="v1"><div class="note_content__kXdj4" style="gap: 12px;"><span style="display: flex; height: 16px;"><svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="width: 16px; height: 16px; color: var(--ds-green-900);"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z" fill="currentColor"></path></svg></span><span>Patch removed succesfully</span></div></div>
        <div style="margin-top: 3em; margin-bottom: 1em;">
            <button
                type="submit"
                class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-success geist-new-success-fill button_invert__YNhnn"
                data-geist-button=""
                data-prefix="false"
                data-suffix="false"
                data-version="v1"
                style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                onclick="patchDiscord()"
            >
                <span class="button_content__1aE1_">Patch</span>
            </button>
        </div>
        </div>
    </div>`;
    } else {
        document.getElementById('container-fluid').innerHTML = `<div class="flex w-full overflow-x-auto md:overflow-visible" style="width: 100%; height: 100%; margin: auto;">
        <div class="" style="margin: auto;">
        <div class="note_note__W1ddN geist-error geist-error-fill v3-colors" data-geist-note="" data-version="v1" style="margin-right: 10%; margin-left: 10%;"><div class="note_content__kXdj4" style="gap: 12px;"><span style="display: flex; height: 16px;"><svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="width: 16px; height: 16px; color: var(--ds-red-900);"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.30761 1.5L1.5 5.30761L1.5 10.6924L5.30761 14.5H10.6924L14.5 10.6924V5.30761L10.6924 1.5H5.30761ZM5.10051 0C4.83529 0 4.58094 0.105357 4.3934 0.292893L0.292893 4.3934C0.105357 4.58094 0 4.83529 0 5.10051V10.8995C0 11.1647 0.105357 11.4191 0.292894 11.6066L4.3934 15.7071C4.58094 15.8946 4.83529 16 5.10051 16H10.8995C11.1647 16 11.4191 15.8946 11.6066 15.7071L15.7071 11.6066C15.8946 11.4191 16 11.1647 16 10.8995V5.10051C16 4.83529 15.8946 4.58093 15.7071 4.3934L11.6066 0.292893C11.4191 0.105357 11.1647 0 10.8995 0H5.10051ZM8.75 3.75V4.5V8L8.75 8.75H7.25V8V4.5V3.75H8.75ZM8 12C8.55229 12 9 11.5523 9 11C9 10.4477 8.55229 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z" fill="currentColor"></path></svg></span><span>Error removing patch: ${error}</span></div></div>
        <div style="margin-top: 1em; margin-bottom: 2em;">
            <button
                type="submit"
                class="button_base__BjwbK reset_reset__KRyvc button_button__81573 reset_reset__KRyvc geist-new-themed geist-new-warning geist-new-warning-fill button_invert__YNhnn"
                data-geist-button=""
                data-prefix="false"
                data-suffix="false"
                data-version="v1"
                style="--geist-icon-size: 16px; max-width: 250px; width: 250px; margin: auto;"
                onclick="resetAsar()"
            >
                <span class="button_content__1aE1_">Deactivate Patch</span>
            </button>
        </div>
        </div>
    </div>`;
    }
    hoverBtns();
}