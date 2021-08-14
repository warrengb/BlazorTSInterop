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
