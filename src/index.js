import App from './app';
import WebGL from './scripts/WebGL';

let firstClick = true;

document.addEventListener('DOMContentLoaded', () => {
  if (!WebGL.isWebGLAvailable()) {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
    return;
  }
});

document.addEventListener('click', function () {
  if (firstClick) {
    firstClick = false;

    const app = new App();
    app.init();
  }
});
