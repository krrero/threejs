import {
  Scene,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
} from 'three';

export default class App {
  constructor() {}

  init() {
    this.createScene();
    this.createCamera();
    this.drawLine();
  }

  createScene() {
    this.scene = new Scene();
    this.scene.background = new Color(this.bgColor);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
    );
    this.camera.position.set(0, 0, 100);

    this.scene.add(this.camera);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate.bind(this));
  }

  drawLine() {
    const material = new LineBasicMaterial({ color: 0x0000ff });
    const points = [];

    points.push(new Vector3(-10, 0, 0));
    points.push(new Vector3(0, 10, 0));
    points.push(new Vector3(10, 0, 0));

    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);

    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
  }
}
