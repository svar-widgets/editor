<script lang="ts">
    import { getContext } from "svelte";
	import { loadJS } from "./loader.js";
    import { uid } from "@svar-ui/lib-dom";

    declare const codemirror: any;

    type Props = {
        value: string;
        onchange?: ({ value }: { value: string }) => void;
        focus?: boolean;
        theme?: string;
        language?: string;
        readonly?: boolean;
    };
    const { language = "javascript", value, onchange, theme = "", focus = false, readonly = false }: Props = $props();

    const tempID = `cm-${uid()}`;

    const wxSkin = getContext("wx-theme")
    const detectTheme = () => {
        if (wxSkin === "willow-dark" || (!wxSkin && document.body.classList.contains("wx-willow-dark-theme"))) return "dark";
        return "light";
    }
    
    let lastValue = $state("");
    
    let editor = $state<any>(null);
    loadJS("https://cdn.svar.dev/libs/custom/codemirror6/cm.js?v=4").then(() => {
        if (editor) return;
    
        editor = codemirror.create(`#${tempID}`, {
            value: "",
            theme: theme || detectTheme() ,
            language,
            lineNumbers: false,
            readOnly: readonly,
            onChange: (v: any) => {
                lastValue = v;
                onchange?.({ value: editor.getValue() });
            }
        });
    });

    $effect(() => {
        if (editor) {
            editor.setLanguage(language);
        }
    });
    $effect(() => {
        if (editor && value !== lastValue) {
            editor.setValue(value, { resetHistory: true });
            if (focus)
                editor.focus();
            lastValue = value;
        }
    });
</script>

<div class="wx-codemirror" id={tempID}>
</div>

<style>
    .wx-codemirror {
        height: 100%;
        width: var(--wx-field-width);
        max-width: 100%;
    }
    .wx-codemirror > :global(.cm-editor) {
        height: 100%;
    }
    .wx-codemirror > :global(.cm-focused) {
        outline: none;
    }
    :global(.wx-field-control) .wx-codemirror :global(.cm-editor) {
        height: 200px;
    }
</style>
