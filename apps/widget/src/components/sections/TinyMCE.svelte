<script lang="ts">
    import { getContext } from "svelte";
	import { loadJS } from "./loader.js";
    import { uid } from "@svar-ui/lib-dom";

    declare const tinymce: any;

    type Props = {
        licenseKey?: string;
        value: string;
        onchange?: ({ value }: { value: string }) => void;
        toolbar?: string;
        focus?: boolean;
        skin?: string;
    };
    const { licenseKey = "gpl", value, onchange, focus = false, toolbar = 'undo redo | bold italic', skin = "" }: Props = $props();

    const tempID = `tinymce-${uid()}`;

    const wxSkin = getContext("wx-theme")
    const detectSkin = () => {
        if (wxSkin === "willow-dark" || (!wxSkin && document.body.classList.contains("wx-willow-dark-theme"))) return "oxide-dark";
        return "oxide";
    }
    
    let lastValue = $state("");

    let editor = $state<any>(null);
    loadJS("https://cdnjs.cloudflare.com/ajax/libs/tinymce/8.5.1/tinymce.min.js").then(() => {
        if (editor) return;
    
        tinymce.init({
            selector: `#${tempID}`,
            toolbar: toolbar,
            menubar: false,
            skin: skin || detectSkin(),
            content_css: (skin || detectSkin()) === "oxide-dark" ? "dark" : undefined,
            license_key: licenseKey,
            statusbar: false,
            init_instance_callback: (v: any) => {
                editor = v;
                editor.on('change', () => {
                    onchange?.({ value: editor.getContent() });
                    lastValue = editor.getContent();
                });
            }
        });
    });

    $effect(() => {
        if (editor && value !== lastValue) {
            editor.setContent(value);
            editor.undoManager.clear();
            if (focus)
                editor.focus();
            lastValue = value;
        }
    });

    // Cleanup
    $effect(() => {
        return () => {
            if (editor && (skin || detectSkin()) === "oxide-dark") {
                tinymce.DOM.styleSheetLoader.unload(`${tinymce.baseURL}/skins/ui/oxide-dark/skin.min.css`);
            }
            // NB: not calling editor.destroy() on purpose - TinyMCE's teardown
            // triggers handlers (e.g. blur) against an already-removed instance
            // and throws. The DOM node is gone with the component, so the JS
            // instance is left to the garbage collector.
            editor = null;
        }
    });
</script>

<div class="wx-tinymce">
    <textarea id={tempID}></textarea>
</div>

<style>
    .wx-tinymce {
        height: 100%;
        width: var(--wx-field-width);
        max-width: 100%;
    }
    .wx-tinymce > textarea {
        height: 100%;
        width: 100%;
    }
</style>
