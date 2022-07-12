import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial,
  Mesh,
} from 'three';

export default class App {
  constructor() {
    this.DATA = null;
    this.heights = [];
    this.mesh = null;
    this.geometry = null;
    this.renderer = null;

    this.frecuencySamples = 512; // Y resolution
    this.timeSamples = 1200; // x resolution
    this.nVertices = (this.frecuencySamples + 1) * (this.timeSamples + 1);
    this.xSegments = this.timeSamples;
    this.ySegments = this.frecuencySamples;
    this.xSize = 35;
    this.ySize = 20;
    this.xHalfSize = this.xSize / 2;
    this.yHalfsize = this.ySize / 2;
    this.xSegmentSize = this.xSize / this.xSegments; // Size of one square
    this.ySegmentSize = this.ySize / this.ySegments;
  }

  init() {
    this.DATA = new Uint8Array(this.frecuencySamples);

    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createGeometry();
    this.createMaterial();

    this.animate();
  }

  createRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  createMaterial() {
    let material = new MeshBasicMaterial({ color: '#433F81' });
    this.mesh = new Mesh(this.geometry, material);
    this.scene.add(this.mesh);
  }

  createScene() {
    this.scene = new Scene();
    // this.scene.background = new Color(this.bgColor);
  }

  createCamera() {
    const fov = 27;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 1000;

    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 64;

    this.scene.add(this.camera);
  }

  createGeometry() {
    let indices = [];
    let vertices = [];

    this.geometry = new BufferGeometry();

    for (let i = 0; i <= this.xSegments; i++) {
      let x = (i * this.xSegmentSize) - this.xHalfSize;
      for (let j = 0; j <= this.ySegments; j++) {
        let y = j * this.ySegmentSize - this.yHalfsize;

        vertices.push(x, y, 0);
        this.heights.push(0); // for now our mesh is flat, so heights are zero
      }
    }

    this.geometry.setAttribute(
      'position',
      new Float32BufferAttribute(vertices, 3),
    );

    for (let i = 0; i < this.xSegments; i++) {
      for (let j = 0; j < this.ySegments; j++) {
        let a = i * (this.ySegments + 1) + (j + 1);
        let b = i * (this.ySegments + 1) + j;
        let c = (i + 1) * (this.ySegments + 1) + j;
        let d = (i + 1) * (this.ySegments + 1) + (j + 1);
        // generate two faces (triangles) per iteration
        indices.push(a, b, d); // face one
        indices.push(b, c, d); // face two
      }
    }

    this.geometry.setIndex(indices);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    // requestAnimationFrame(this.animate.bind(this));
  }
}
