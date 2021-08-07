export class Hello {

    hello(): void {
        alert("hello");
    }
    static goodbye(): void {
        alert("goodbye");
    }
}

export var HelloInstance = new Hello();