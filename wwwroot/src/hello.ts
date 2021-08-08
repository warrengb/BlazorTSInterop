declare function ScriptAlert(message:string);

export class Hello {

    hello(): void {
        ScriptAlert("hello");
    }
    static goodbye(): void {
        ScriptAlert("goodbye");
    }
}

export var HelloInstance = new Hello();