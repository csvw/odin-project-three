import { Canvas } from "./canvas.js";
import { welcomeSequence } from "./welcomeSequence.js";

window.onload = init;

function init() {
    let canvas = new Canvas();
    canvas.animationLoop();
    welcomeSequence();
}
