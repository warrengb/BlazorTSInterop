import { Hello, HelloInstance } from './hello';
export { Hello, HelloInstance } from './hello'

export class Index {
    hello(): void {
        HelloInstance.hello();
    }
    static goodbye(): void {
        Hello.goodbye();
    }
}

export var IndexInstance = new Index();
