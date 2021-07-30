
# Blazor Typescript Interop
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Test](./readme/tsinterop.png)

&nbsp;&nbsp;&nbsp;&nbsp;This is an article on Blazor Typescript Interop. 
An elegant way to interface your Blazor C# with the browsers Javascript API and libraries.
Discussion will contain a brief overview on the technologies and variations of how to interop Blazor with Typescript. 
An implementation walkthrough will further explain the concept by code example on GitHub.
Walkthrough starts off with plain old Javascript, then progresses to Typescript and Typescript utilizing NPM library.    

***     

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

---

<ul>
Lets get started.
</ul>  

---

### Create Blazor Project
###### To start off we will just create a new blazor app.


> Create new Blazor WebAssembly App.
> 
 ![Test](./readme/vs0.png)

>  Name it BlazerTSInterop in directory of your choice.
>  
 ![Test](./readme/vs1.png)

>  Use .NET 5.0 client only, No secutiry and no PWA.
>  
 ![Test](./readme/vs2.png)

>  CTRL+F5 build and run in hot reload mode.

 ![Test](./readme/vs3.png)

---

<ul>
Ignore Counter and Fetch Data pages that come with the template.
This demo will only use the home page.
</ul>  

---

### Implement Javascript Interop
###### Before we get to Typescript, let's see how Javascript interops.

<b>1.  Call a browser Javascript API method.</b><br> 
> Replace all of Index.razor contents with following code snippets respectfully. 
```html
@page "/"
@inject IJSRuntime JS

<h1>Hello, Interop!</h1>

<hr />
@Message
<hr />

<h4>
    JS Interop
</h4>
<button class="btn btn-primary" @onclick="@Prompt">Prompt</button>
<hr>
```
```c#
@code {
    string Message { get; set; } = "";

    async void Prompt()
    {
        string answer = await JS.InvokeAsync<string>("prompt", "say what?");
        Message = "Prompt: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }
}
```
> Save in hot reload mode and test.

 ![Test](./readme/vs4.png)
---

<b>2. Call an Javascript method loaded as static web asset.</b><br>
> Create new Javascript file <br>
> Create new src folder for Javascript and Typescript files.<br>
> Create new 'wwwroot/src/script.js' file.
 
![Test](./readme/vs5.png)

> Copy code to 'script.js'.
```javascript
function ScriptPrompt(message){
    return prompt(message);
}
```
> Add 'script.js' as static asset in 'Index.html' after 'webassemly.js'.


```html
<body>
...
    <script src="_framework/blazor.webassembly.js"></script>
    <script src="src/script.js"></script>
...
</body>
```
> Replace all of Index.razor contents with following code snippets respectfully to add ScriptPrompt button and method. 

```html
@page "/"
@inject IJSRuntime JS
<h1>Hello, Interop!</h1>
<hr />@Message<hr />
<h4>JS Interop</h4>
<button class="btn btn-primary" @onclick="@Prompt">Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptPrompt">Script Prompt</button>
<hr>
```
```c#
@code {
    string Message { get; set; } = "";

    async void Prompt()
    {
        string answer = await JS.InvokeAsync<string>("prompt", "say what?");
        Message = "Prompt: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void ScriptPrompt()
    {
        string answer = await JS.InvokeAsync<string>("ScriptPrompt", "ScriptPrompt say what?");
        Message = "Script Prompt: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }
}
```

> Run to test static custom Javascipt method  ScriptPrompt.
> 
![Test](./readme/vs6.png)
