
# Blazor Typescript Interop
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/tsinterop.png)

&nbsp;&nbsp;&nbsp;&nbsp;This is an article on Blazor Typescript Interop. 
An elegant way to interface your Blazor C# WebAssembly (Wasm) with the browsers JavaScript API and libraries.
Wasm can only communicate with the browser JavaScript API. N ot able to reach outside the browser’s security sandbox.
Calling JavaScript from C# and vice-versa requires some thought. Leveraging TypeScript will guide better interop interface design.
Discussion will contain a brief overview on the technology and variations of how to interop Blazor with Typescript. 
An implementation walkthrough will further explain by code example available on GitHub.
Walkthrough starts off with plain old JavaScript, then progresses to Typescript and Typescript utilizing NPM library.
For more information on Blazor Interop see 
[Microsoft's Blazor JavaScript interoperability](https://docs.microsoft.com/en-us/aspnet/core/blazor/JavaScript-interoperability/?view=aspnetcore-5.0).
    

***     

![ScreenShot](readme/blazor.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Blazor** is a formative addition to the .NET stack for building .NET Core SPA MVVM websites in 
Wasm coded in C#. Blazor is an attractive alternative to Angular, React, Vue and other JavaScript SPA website architectures for the .NET developer.
Blazor MAUI, a continuation of Xamarin with Blazor webview is another great addition to the .NET stack that comlpletes a .NET developer ecosystem for device and browser applications.

![ScreenShot](readme/tscircle.png)
**Typescript** is a superset of JavaScript for application-scale development featuring strong types and geared for object oriented programming.
Typescript transpiles to JavaScript, so references to Javascipt going forward is either plain old JavaScript or the result of transpiled Typescript to JavaScript consumable by the browser.
Using Typescript benefits code design such as structural design patterns like facades, adapters and bridges. 

![ScreenShot](readme/interop.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Interop** is an interface between a higher level coding language to a lower level language, typically the native language of the platform.
Data elements and procedures can be interchanged between the two languages. Blazor out of the box uses interop to communicate with the browser.
The browser executes Wasm code oneway requiring JavaScript interop to communicate back to the browser function. Hence Blazor C# needs Javascipt interop.
Existing Blazor .NET libraries for the broser, such as the C# WebSocket class, are JavaScript interop wrappers.

---

<ul>
Lets get started.
</ul>  

---

### Part 1. Create Blazor Project
###### To start off we will just create a new blazor app.


> Create new Blazor WebAssembly App.
> 
![ScreenShot](readme/vs0.png)

>  Name it BlazerTSInterop in directory of your choice.
>  
![ScreenShot](readme/vs1.png)

>  Use .NET 5.0 client only, No secutiry and no PWA.
>  
![ScreenShot](readme/vs2.png)

>  CTRL+F5 build and run in hot reload mode.

![ScreenShot](readme/vs3.png)

---

<ul>
Ignore Counter and Fetch Data pages that come with the template.
This demo will only use the home page.
</ul>  

---

### Part 2. Implement JavaScript Interop
###### Before we get to Typescript, let's see how JavaScript interops.

<b>1.  Call a browser JavaScript API method.</b><br> 
> Replace all of Index.razor contents with following code snippets respectfully. 
```html
@page "/"
@inject IJSRuntime JS
<h1>Hello, Interop!</h1>
<hr />@Message<hr />
<h4>JS Interop</h4>
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
> Save in hot reload mode and ScreenShot.

![ScreenShot](readme/vs4.png)
---

<b>2. Call JavaScript method loaded as static web asset.</b><br>
> Create new JavaScript file <br>
> Create new src folder for JavaScript and Typescript files.<br>
> Create new 'wwwroot/src/script.js' file.
 
![ScreenShot](readme/vs5.png)

> Copy code to 'script.js'.
```JavaScript
function ScriptPrompt(message){
    return prompt(message);
}
```

> Static assets serve one global entry point defined by the method in file.
> Other methods and data within file are private.
> ScriptPrompt method will be callable from other JavaScript modules including isolated modules.

> Add 'script.js' as static asset in 'Index.html' after 'webassemly.js'.

```html
<body>
...
    <script src="_framework/blazor.webassembly.js"></script>
    <script src="src/script.js"></script>
...
</body>
```
> Replace all of 'Index.razor' contents with following code snippets respectfully to add ScriptPrompt button and method. 

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
> Prompt demonstrates calling a browser API method.<br>
> ScriptPrompt demonstrates calling a static JavaScript method.

> Run to ScreenShot static custom JavaScript method  ScriptPrompt.
> 
![ScreenShot](readme/vs6.png)

<b>3. Call isolated JavaScript module method.</b>

> Create new 'wwwroot/src/script.module.js' JavaScript file.

![ScreenShot](readme/vs7.png)

> Copy code to 'script.module.js'.
> ModulePrompt demonstrates calling the statically loaded JavaScript method ScriptPrompt.
> ModulAlert demonstrates additional module method that calls browser's alert.
```JavaScript
export function ModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ModulAlert(message) {
    alert(message);
}
```

> Replace all of 'Index.razor' contents with following code snippets respectfully to add Module buttons and methods. 
```html
@page "/"
@inject IJSRuntime JS
@implements IAsyncDisposable
<h1>Hello, Interop!</h1>
<h4>JS Interop</h4>
<hr />@Message
<hr />
<button class="btn btn-primary" @onclick="@Prompt">Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptPrompt">Script Prompt</button>
<button class="btn btn-primary" @onclick="@ModulelPrompt">Module Prompt</button>
<button class="btn btn-primary" @onclick="@ModulelAlert">Module Alert</button>
<hr>
```

```c#
@code {
    private IJSObjectReference module;
    string Message { get; set; } = "";

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null)
        {
            await module.DisposeAsync();
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import", "./src/script.module.js");
        }
    }

    async void ModulelAlert()
    {
        await module.InvokeVoidAsync("ModulAlert", "Modulel Alert");
    }

    async void ModulelPrompt()
    {
        string answer = await module.InvokeAsync<string>("ModulePrompt", "Module Prompt say what?");
        Message = "Module Prompt: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

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

>Isolated models support the IAsyncDisposable with the DisposeAsync to cleanup module resources when no longer needed.<br>
>Module is loaded after first render by the OnAfterRenderAsync method.<br>
>ModulePrompt demonstrates calling the static method ScriptPrompt.<br>
>ModuleAlert demonstrates calling another exported method from the same module.<br>

>Build and run.

![ScreenShot](readme/image1.png)
![ScreenShot](readme/image2.png)