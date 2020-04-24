import { Canvas } from "./canvas.js";

window.onload = init;

function init() {
    let canvas = new Canvas();
    canvas.animationLoop();
}
