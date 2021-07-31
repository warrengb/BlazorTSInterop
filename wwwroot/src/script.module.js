export function ScriptPrompt(message){
    return prompt(message);
}
export function ModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ModulAlert(message) {
    alert(message);
}

