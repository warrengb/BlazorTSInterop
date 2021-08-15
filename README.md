
# Blazor Typescript Interop
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/tsinterop.png)

&nbsp;&nbsp;&nbsp;&nbsp;This is an article on Blazor Typescript Interop. 
An elegant way to interface your Blazor C# WebAssembly (Wasm) with the browsers JavaScript API and libraries.
Wasm can only communicate with the browser JavaScript API and can't reach outside the browser’s security sandbox.
Calling JavaScript from C# and vice-versa requires some thought. Leveraging TypeScript will guide better interop interface design.
Discussion will contain a brief overview on the technology and variations of how to interop Blazor with TypeScript. 
An implementation walkthrough will further explain by code example available on GitHub.
Walkthrough starts off with plain old JavaScript, then progresses to TypeScript and TypeScript utilizing NPM library.
For more information on Blazor Interop see 
[Microsoft's Blazor JavaScript interoperability](https://docs.microsoft.com/en-us/aspnet/core/blazor/JavaScript-interoperability/?view=aspnetcore-5.0).
  
***     
#### Table of Contents
1. [Create Blazor Project](#1)<br>
2. [Implement JavaScript Interop](#2)<br>
    1. [Call JavaScript Browser API](#2.1)<br>
    2. [Call Embedded JavaScript](#2.2)
    3. [Call Isolated JavaScript](#2.3)
3. [Debugging JavaScript](#3)<br>
4. [Implement TypeScript Interop](#4)<br>
    1. [Call Isolated TypeScript](#4.1)<br>
    2. [Setup Webpack Build Pipeline](#4.2)<br>
    3. [Call Webpack TypeScript](#4.3)<br>
    4. [Call NPM TypeScript](#4.4)

***     

![ScreenShot](readme/blazor.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Blazor** is a formative addition to the .NET stack for building .NET Core SPA MVVM websites in 
Wasm coded in C#. Blazor is an attractive alternative to Angular, React, Vue and other JavaScript SPA website architectures for the .NET developer.
Blazor MAUI, a continuation of Xamarin with Blazor webview is another great addition to the .NET stack that completes a .NET developer ecosystem for device and browser applications.

![ScreenShot](readme/tscircle.png)
**TypeScript** is a superset of JavaScript for application-scale development featuring strong types and geared for object-oriented programming.
TypeScript transpiles to JavaScript, so references to JavaScript going forward is either plain old JavaScript or the result of transpiled TypeScript to JavaScript consumable by the browser.
Using Typescript will benefit Blazer interop code designs. Especially in the are of structural design patterns like facades, adapters and bridges.

![ScreenShot](readme/interop.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Interop** is an interface between a higher level coding language to a lower level language, typically the native language of the platform.
Data elements and procedures can be interchanged between the two languages. Blazor out of the box uses interop to communicate with the browser.
The browser executes Wasm code one-way requiring JavaScript interop to communicate back to the browser function. Hence Blazor C# needs JavaScript interop.
Existing Blazor .NET libraries for the browser, such as the C# WebSocket class, are JavaScript interop wrappers.

---

<ul>
Lets get started.
</ul>  

---

## Part 1 Create Blazor Project<a name="1"></a>
###### To start off we will just create a new Blazor app.


> Create new Blazor WebAssembly App.
> 
![ScreenShot](readme/image0.png)

>  Name it BlazerTSInterop in directory of your choice.
>  
![ScreenShot](readme/image1.png)

>  Use .NET 5.0 client only, No security and no PWA.
>  
![ScreenShot](readme/image2.png)

>  CTRL+F5 build and run in hot reload mode.

![ScreenShot](readme/image3.png)

---

<ul>
<b>Summary</b><br>
A project ready to demonstrate JavaScript interop walkthrough has been created.<br>
Ignore Counter and Fetch Data pages that come with the template.
This demo will only use the home page.<br>
</ul>  

---

## Part 2. Implement JavaScript Interop<a name="2"></a>
###### Before we get to Typescript, let's see how JavaScript interops.

#### 1. Call JavaScript Browser API</b><a name="2.1"></a>
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
> Save to run in hot reload mode and test.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image4.png)

---

#### 2. Call Embedded JavaScript</b><a name="2.2"></a>
> Create new JavaScript file <br>
> Create new 'src' folder for JavaScript and Typescript files.<br>
> Create new 'wwwroot/src/script.js' file.
 
&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image5.png)

> Copy code to 'script.js'.
```JavaScript
function ScriptPrompt(message){
    return prompt(message);
}

function ScriptAlert(message) {
    alert(message);
}
```

> ScriptPrompt and ScriptAlert will be statically loaded and global.<br>
> Accessible to other JavaScript modules including isolated modules.<br>
>> Notice the script methods call the browser API prompt and alert respectfully.


> Add 'script.js' as static asset in 'Index.html' after 'webassemly.js'.

```html
<body>
...
    <script src="_framework/blazor.webassembly.js"></script>
    <script src="src/script.js"></script>
...
</body>
```
> Replace all of 'Index.razor' contents with following code snippets respectfully to add ScriptPrompt and ScriptAlert buttons with action method. 

```html
@page "/"
@inject IJSRuntime JS
@implements IAsyncDisposable
<h1>Hello, Interop!</h1><br />
<h4 style="background-color:aliceblue; padding:20px">JavaScript Interop</h4>
@Message<hr />
<button class="btn btn-primary" @onclick="@Prompt">Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptPrompt">Script Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptAlert">Script Alert</button><hr>
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

    async void ScriptAlert()
    {
        await JS.InvokeVoidAsync("ScriptAlert", "Script Alert");
    }
}
```
> Prompt demonstrates calling a browser API method.<br>
> ScriptPrompt and  ScriptAlert demonstrate static JavaScript methods.

>Run and test.
 
&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image6.png)

#### 3. Call Isolated JavaScript</b><a name="2.3"></a>
> Create new 'wwwroot/src/script.module.js' JavaScript file.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image7.png)

> Copy code to 'script.module.js'.

```JavaScript
export function ModulePrompt(message) {
    return ScriptPrompt(message);
}

export function ModulAlert(message) {
    ScriptAlert(message);
}
```
> Module methods demonstrates calling global script methods.<br>
> > Note the 'export' method prefix.<br>
> > This is ES module syntax to mark code as importable.<br>
> > 'export' is not used by global embedded script.js. 

> Replace all of 'Index.razor' contents with following code snippets respectfully to add Module buttons and methods. 
```html
@page "/"
@inject IJSRuntime JS
@implements IAsyncDisposable
<h1>Hello, Interop!</h1>
<br />
<h4 style="background-color:aliceblue; padding:20px">JavaScript Interop</h4>
@Message
<hr />
<button class="btn btn-primary" @onclick="@Prompt">Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptPrompt">Script Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptAlert">Script Alert</button>
<hr>
<button class="btn btn-primary" @onclick="@ModulelPrompt">Module Prompt</button>
<button class="btn btn-primary" @onclick="@ModulelAlert">Module Alert</button>
<hr>
```
```c#
@code {
    private IJSObjectReference module;
    string Message { get; set; } = "";

    string Version { get { return "?v=" + DateTime.Now.Ticks.ToString(); } }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null) { await module.DisposeAsync(); }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import", "./src/script.module.js" + Version);
        }
    }

    async void ModulelAlert()
    {
        await module.InvokeVoidAsync("ModulAlert", "Modulel Alert");
    }

    async void ModulelPrompt()
    {
        string answer = await module.InvokeAsync<string>("ModulePrompt", "Module Prompt say what?");
        Message = "Module Prompt said: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void Prompt()
    {
        string answer = await JS.InvokeAsync<string>("prompt", "say what?");
        Message = "Prompt said: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void ScriptPrompt()
    {
        string answer = await JS.InvokeAsync<string>("ScriptPrompt", "ScriptPrompt say what?");
        Message = "Script Prompt said: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void ScriptAlert()
    {
        await JS.InvokeVoidAsync("ScriptAlert", "Script Alert");
    }
}
```

>Isolated models support the IAsyncDisposable with the DisposeAsync to cleanup module resources when no longer needed.<br>
>Module is loaded after first render by the OnAfterRenderAsync method.<br>
>ModulePrompt demonstrates calling the static method ScriptPrompt.<br>
>ModuleAlert demonstrates calling another exported method from the same module.<br>

>Notice module appends an unique parameter Version tag when loaded:
>
```c#
...
string Version { get { return "?v=" + DateTime.Now.Ticks.ToString(); } }
...
module = await JS.InvokeAsync<IJSObjectReference>
                    ("import", "./src/script.module.js" + Version);
...
```
>
script.module.js avoids cached by unique param tag. 

![ScreenShot](readme/image10.png)<br>
> This is a hack to bypass the browser cache which may stick during development.<br>
> To regain cache performance <b>Version</b> value can be replaced by an application release version number.
> Which will then force a cache refresh once at first client run of new release.   

>Build and run.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image8.png)

---

<ul>
<b>Summary</b><br>
Part 2 covers calling Isolated and Embedded JavaScript.<br>
A precursor to calling TypeScript interop from Blazor.
</ul>  

---

## Part 3. Debugging JavaScript<a name="3"></a>
###### Now is a good time to review debugging JavaScript from Visual Studio

>Visual Studio may hesitate to attach to the Chrome debugger.<br>
>This issue not exclusive to Blazor.<br>
>More noticeable  as the JavaScript code and symbols grow.<br>
>Here are some situations and workarounds that may help.<br>

Set breakpoint in script.js as shown.<br>
![ScreenShot](readme/debug3.png)<br>

Run application in debug mode F5.<br>
The debugger is not attached if the breakpoint red circle is hollow.<br>
![ScreenShot](readme/debug1.png)<br>

You can see the cached file in Script Document folders.<br>
Click on file to see if cached contents are from a prior version.<br>
![ScreenShot](readme/debug2.png)<br>

Try removing the breakpoint and re-apply.<br>
The debugger may re-attach.<br>
![ScreenShot](readme/debug3.png)<br>

While app is running, press CTR+Shift+I in browser to view developer tools.<br>
Select src/script.js in Sources panel and set breakpoint at shown.<br>
This will trigger Visual Studio debugger re-attachment to Chrome.<br>
If this does not work, debugging in Chrome will suffice.<br>
![ScreenShot](readme/debug4.png)<br>

---

<ul>
<b>Summary</b><br> 
Part 3 reviews debugging and debugger attachment workarounds.<br>
It is recommended to do a debug code walkthrough to see the interop in action.
</ul>  

---

## Part 4. Implement TypeScript Interop<a name="4"></a>
###### Let's proceed to TypeScript interop.
#### 1. Call Isolated TypeScript</b><a name="4.1"></a>

> Create new 'wwwroot/src/hello.ts' TypeScript file.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image9.png)

> Copy code to 'hello.ts'.<br>
> Note class methods access ScriptAlert from embedded 'script.js'

```TypeScript
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
```

> Include Microsoft.TypeScript.MSBuild from Nuget Package Manager.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image11.png)

> Set Version:ECMAScript, TSX:None, Module:ES2015 in Project/Properties/Typescript Build

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image12.png)

> Replace all of 'Index.razor' contents with following code snippets respectfully to add Module buttons and methods. 
```html
@page "/"
@inject IJSRuntime JS
@implements IAsyncDisposable
<h1>Hello, Interop!</h1>
<h4 style="background-color:aliceblue; padding:20px">JavaScript Interop</h4>
@Message<hr>
<button class="btn btn-primary" @onclick="@Prompt">Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptPrompt">Script Prompt</button>
<button class="btn btn-primary" @onclick="@ScriptAlert">Script Alert</button><hr>
<button class="btn btn-primary" @onclick="@ModulelPrompt">Module Prompt</button>
<button class="btn btn-primary" @onclick="@ModulelAlert">Module Alert</button><br /><br />
<h4 style="background-color:aliceblue; padding:20px">TypeScript Interop</h4><hr>
<button class="btn btn-primary" @onclick="@HelloAlert">Hello Alert</button>
```
```c#
@code {
    private IJSObjectReference module;
    private IJSObjectReference hello;
    string Message { get; set; } = "";

    string Version { get { return "?v=" + DateTime.Now.Ticks.ToString(); } }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (module is not null) { await module.DisposeAsync(); }
        if (hello is not null) { await module.DisposeAsync(); }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            module = await JS.InvokeAsync<IJSObjectReference>("import", "./src/script.module.js" + Version);
            hello = await JS.InvokeAsync<IJSObjectReference>("import", "./src/hello.js" + Version);
        }
    }

    async void ModulelAlert()
    {
        await module.InvokeVoidAsync("ModulAlert", "Modulel Alert");
    }

    async void ModulelPrompt()
    {
        string answer = await module.InvokeAsync<string>("ModulePrompt", "Module Prompt say what?");
        Message = "Module Prompt said: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void Prompt()
    {
        string answer = await JS.InvokeAsync<string>("prompt", "say what?");
        Message = "Prompt said: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void ScriptPrompt()
    {
        string answer = await JS.InvokeAsync<string>("ScriptPrompt", "ScriptPrompt say what?");
        Message = "Script Prompt said: " + (String.IsNullOrEmpty(answer) ? "nothing" : answer);
        StateHasChanged();
    }

    async void ScriptAlert()
    {
        await JS.InvokeVoidAsync("ScriptAlert", "Script Alert");
    }

    async void HelloAlert()
    {
        await hello.InvokeVoidAsync("HelloInstance.hello");
        await hello.InvokeVoidAsync("Hello.goodbye");
    }
}
```
> Another module 'hello' has been added to load the JavaScript file 'hello.js' generated by 'hello.ts'. 
> HelloAlert method demontrates calling a TypeScript class method 'goodbye' and object instance method 'hello'.
> These methods are using ScriptAlert function from embedded script 'script.js'   

> Build, Run and test Hello Alert.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image13.png)

---

<ul>
<b>Summary</b><br>
This section has demonstrated TypeScript interop using the built in Visual Studio TypeScript toolsets
</ul>

---

#### 2. Setup Webpack Build Pipeline</b><a name="4.2"></a><br>

> Install recommended version of Node https://nodejs.org/en/ <br>
> Right click on the 'wwwroot' folder and select popup menu item 'Open in Terminal'.<br>
> > 'Open in Terminal' is available in VS 2019 version 16.6 and above.<br>
> >  Alternitavly you can use any command line tool from the 'wwwroot' folder.
> > 
> This opens a PowerShell terminal window in editor.<br>

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image15.png)

> Execute command below to create package.json 
```
npm init -y
```
&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image16.png)

> Execute command below to install webpack and typescript tools 
> 
```
npm i ts-loader typescript webpack webpack-cli
```

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image17.png)

> Add scripts entry "build": "webpack" in 'package.json'<br>
> Or replace 'package.json' with json contents below.
```json
{
  "name": "wwwroot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "three": "^0.130.1",
    "ts-loader": "^9.2.3",
    "typescript": "^4.3.5",
    "webpack": "^5.45.1",
    "webpack-cli": "^4.7.2"
  }
}
```
> Create tsconfig.json in 'wwwroot' folder with contents below.

```json
{
  "display": "Node 14",

  "compilerOptions": {
    "allowJs": true,
    "noImplicitAny": false,
    "noEmitOnError": true,
    "removeComments": false,
    "sourceMap": true,
    "lib": [ "es2020", "DOM" ],
    "target": "es6",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node"
  },
  "include": [ "src/**/*.ts" ],
  "exclude": [
    "node_modules",
    "wwwroot"
  ]
}
```
---

<ul>
This disables the project TypeScript build properties which are no longer applicable.<br>
Visual Studio will now use tsconfig.json for TypeScript configuration.   
</ul>  

---

> Create webpack.config.json in 'wwwroot' folder with contents below.

```JavaScript
const path = require("path");

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src')],
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: {
        index: ['./src/index']  
    },
    output: {
        path: path.resolve(__dirname, '../wwwroot/public'),
        filename: '[name]-bundle.js',
        library: "[name]"
    }
};
```
> This script tells webpack to use ts-loader to transpile .ts files to .js.<br>
> For each entry [name] create a JavaScript library [name].<br>
> File [name]-bundle is genreated in the 'wwwroot/public' folder.<br>
> This script has one entry named 'index'.<br>
> Transpiles input file './src/index.ts' to output file './src/index.js'.<br>
> A second pass bundles './src/index.js' with dependency code and 
> outputs to file '../wwwroot/public/index-bundle.js'

> Add below section contents within ... to BlazorTSInterp.csproj file to invoke webpack prebuild.

```xml
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
...
  <Target Name="PreBuild" BeforeTargets="PreBuildEvent">
    <Exec Command="npm install" WorkingDirectory="wwwroot" />
    <Exec Command="npm run build" WorkingDirectory="wwwroot" />
  </Target>
...
</Project>
```
> Microsoft.TypeScript.MSBuild process is no longer needed as it is bypassed the webpack typescript pre-build.

> No harm done leaving it in for this demo.<br>
> Or you can select and delete to remove.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image21.png)

---

<ul>
<b>Summary</b><br>
This section has covered preparing a Blazor project with Webpack toolset for creating TypeScript bundles.
</ul>

---

#### 3. Call Webpack TypeScript</b><a name="4.3"></a><br>

> Create new 'wwwroot/src/index.ts' TypeScript file.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image14.png)

> Copy code to 'index.ts'.<br>
> Index class is a Hello class wrapper.<br>
> Index module also exports Hello class and HelloInstance object.

```TypeScript
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

export var IndexInstance = new Index()
```

> Build CTRL+Shift+B creates 'index.js' and 'index_bundle.js' in the 'public' directory.
> 
&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image18.png)

---

<ul>
Search to find 'ScriptAlert' in the new 'index-bundle.js'.<br>
To verify bundle of 'index.js' includes 'hello.js' dependency code.<br>
Bundles include dependent code.<br>
However; a bundle will have only one module entry.<br>
Interop can only access exported items from the module.
</ul>  

---

> Add 'index-bundle.js' as static asset in 'Index.html' after 'script.js'.

```html
<body>
...
    <script src="_framework/blazor.webassembly.js"></script>
    <script src="src/script.js"></script>
    <script src="public/index-bundle.js"></script>
...
</body>
```
> In 'Index.razor' html section add this line as last button. 

```html
<button class="btn btn-primary" @onclick="@BundleIndexHello">Bundle Index Hello</button>
```
> In 'Index.razor' code section add this as last method. 
```c#
async void BundleIndexHello()
{
    await JS.InvokeVoidAsync("index.IndexInstance.hello");
    await JS.InvokeVoidAsync("index.Index.goodbye");
}
```
> Build and run.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image19.png)

> Bundle Index Hello button demonstrates calling Index class methods exported from 'index' library 

> In 'Index.razor' html section add this line as last button. 

```html
<button class="btn btn-primary" @onclick="@ReExportHello">ReExport Hello</button>
```
> In 'Index.razor' code section add this as last method. 
```c#
async void ReExportHello()
{
    await JS.InvokeVoidAsync("index.HelloInstance.hello");
    await JS.InvokeVoidAsync("index.Hello.goodbye");
}
```
> Build and run.

&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image20.png)

> ReExport Hello button demonstrates calling Hello class methods exported from 'index' library 

---

<ul>
<b>Summary</b><br>
This section has covered calling TypeScript from Webpack bundles.<br>
A bundle can expose dependency code by export from the bundle entry module.<br>
Bundles are embedded resources accessible by Blazor interop via the bundle library prefix.
</ul>  

---

## 4. Call NPM TypeScript</b><a name="4.4"></a><br>

> In 'wwwroot' console execute command below to add threejs to package.json 
```
npm i three
```

> Create new 'wwwroot/src/cube.ts' file.<br>
> Copy code to 'cube.js'.
```JavaScript
import * as THREE from 'three';

export class Cube {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    cube: any;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, 2, .1, 5);
        this.camera.position.z = 2;
        let canvas = document.querySelector('#cube') as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        this.scene = new THREE.Scene();
        this.scene.background = null;
        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(-1, 2, 4);
        this.scene.add(light);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const loadManager = new THREE.LoadingManager();
        const loader = new THREE.TextureLoader(loadManager);
        const texBlazor = loader.load('images/blazor.png');
        const texInterop = loader.load('images/interop.png');
        const texCircle = loader.load('images/tscircle.png');

        const matBlazor = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texBlazor, transparent: false, opacity: 1 });
        const matInterop = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texInterop, transparent: false, opacity: 1 });
        const matCircle = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texCircle, transparent: false, opacity: 1 });
        const materials = [matBlazor, matInterop, matCircle, matBlazor, matInterop, matCircle];

        loadManager.onLoad = () => {
            this.cube = new THREE.Mesh(geometry, materials);
            this.scene.add(this.cube);
            this.animate();
        };
    }

    animate(time = 0) {
        time = performance.now() * 0.0005;
        this.cube.rotation.x = time;
        this.cube.rotation.y = time;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

    static Create(): void {
        new Cube();
    }
}
```

> Create 'images' sub folder in 'wwwroot'. 
>  
&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image22.png)

> Add these images.
> 
![ScreenShot](readme/tsinterop.png)
![ScreenShot](readme/blazor.png) 
![ScreenShot](readme/interop.png) 
![ScreenShot](readme/tscircle.png)

> Add cube entry to webpack.config.js like snippet below.

```json
    entry: {
        index: ['./src/index'],
        cube: ['./src/cube']
    },
```

> Add 'cube-bundle.js' as static asset in 'Index.html'.

```html
<script src="public/cube-bundle.js"></script>
```

> Add cube canvas at end of 'Index.razor' html section.

```html
<canvas id="cube"/>
```

> Replace OnAfterRenderAsync in 'Index.razor' with below method with cube interop call.

```c#
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    if (firstRender)
    {
        module = await JS.InvokeAsync<IJSObjectReference>("import", "./src/script.module.js" + Version);
        hello = await JS.InvokeAsync<IJSObjectReference>("import", "./src/hello.js" + Version);
        await JS.InvokeVoidAsync("cube.Cube.Create");
    }
}
```

> Build and run. 
>  
&nbsp;&nbsp;&nbsp;&nbsp;![ScreenShot](readme/image23.png)

---

<ul>
<b>Summary</b><br>
This section has covered Blazor calling a TypeScript class that uses NPM three.js library.
</ul>

---

(c) copyright 2021 Warren Browne