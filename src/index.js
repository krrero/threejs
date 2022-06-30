import App from './app';
import WebGL from './scripts/webgl/WebGL';

document.addEventListener('DOMContentLoaded', () => {
  if (!WebGL.isWebGLAvailable()) {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
    return;
  }

  const app = new App();
  app.init();
});