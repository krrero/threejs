import {
  Scene,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  MeshPhongMaterial,
  DirectionalLight,
  BoxGeometry,
} from 'three';

export default class App {
  constructor() {
    this.time = 1;
    this.cubes = [];
  }

  init() {
    this.createScene();
    this.createCamera();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    this.cubes = [
      this.makeCube(geometry, 0x44aa88, 0),
      this.makeCube(geometry, 0x8844aa, -2),
      this.makeCube(geometry, 0xaa8844, 2),
    ];

    this.addLight();

    this.animate();
  }

  createScene() {
    this.scene = new Scene();
    this.scene.background = new Color(this.bgColor);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 5;

    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    // this.camera.position.set(0, 0, 100);
    this.camera.position.z = 3;

    this.scene.add(this.camera);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    this.time += 0.01;

    this.cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = this.time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    requestAnimationFrame(this.animate.bind(this));
  }

  makeCube(geometry, color, x) {
    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);
    this.scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  addLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }
}
