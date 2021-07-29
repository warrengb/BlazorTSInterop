
# Blazor Typescript Interop
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Test](./readme/tsinterop.png)

&nbsp;&nbsp;&nbsp;&nbsp;This is an article on Blazor Typescript Interop. 
An elegant way to interface your Blazor C# with the browsers Javascript API.
Discussion will contain a brief overview on the technologies and variations of how to interop Blazor with Typescript. 
An implementation walkthrough will further explain the concept by code example on GitHub.
Coding starts off with plain old Javascript and progresses to Typescript and Typescript utilizing NPM. 
NPM has a wealth of Javascript libraries Blazor can consume.        

![Test](./readme/blazor.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Blazor** is a formative addition to the .NET stack for building .NET Core SPA MVVM websites in 
web-assembly (Wasm) coded in C#. Blazor is an attractive alternative to Angular, React, Vue and other Javascript SPA website architectures for the .NET developer.
Blazor MAUI, a continuation of Xamarin with Blazor webview is another great addition to the .NET stack that comlpletes a .NET developer ecosystem for device and browser applications.

![Test](./readme/tscircle.png)
**Typescript** is a superset of JavaScript for application-scale development featuring strong types and geared for object oriented programming.
Typescript transpiles to Javascript, so references to Javascipt going forward is either plain old Javascript or the result of transpiled Typescript to Javascript consumable by the browser.
Using Typescript benefits code design such as structural design patterns like facades, adapters and bridges. 

 ![Test](./readme/interop.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Interop** is an interface between a higher level coding language to a lower level language, typically the native language of the platform.
Data elements and procedures can be interchanged between the two languages. Blazor out of the box uses interop to communicate with the browser.
The browser executes Wasm code oneway requiring Javascript interop to communicate back to the browser function. Hence Blazor C# needs Javascipt interop.
Existing Blazor .NET libraries such as the C# WebSocket class are Javascript interop wrappers.


