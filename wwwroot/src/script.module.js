export function ScriptPrompt(message){
    return prompt(message);
}
export function ScriptModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ScriptModuleAlert(message) {
    alert(message);
}