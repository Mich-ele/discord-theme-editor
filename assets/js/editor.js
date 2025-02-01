let css_content = "";

document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('css-editor')) {
        try {
            css_content = await window.electronAPI.getCustomCssSource();

            require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });

            require(['vs/editor/editor.main'], function() {
                editor = monaco.editor.create(document.getElementById('css-editor'), {
                    value: css_content,
                    language: 'css',
                    theme: 'vs-dark',
                    automaticLayout: true,
                });

                editor.onDidChangeModelContent(() => {
                    var formattedText = editor.getValue();
                    window.electronAPI.updateCssFile(formattedText);
                });

                applyTheme();
            });
        } catch (error) { }
    }

    applyTheme();
});