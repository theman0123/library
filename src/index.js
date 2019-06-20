import "phaser";
import config from "./config/config";
import WorldScene from "./scenes/WorldScene";
import BootScene from "./scenes/BootScene";
import PreloaderScene from "./scenes/PreloaderScene";
import UIScene from "./scenes/UIScene";
import TitleScene from "./scenes/TitleScene";
import CorneringScene from "./scenes/CorneringScene";
import LibraryScene from "./scenes/LibraryScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("BootScene", BootScene);
    this.scene.add("PreloaderScene", PreloaderScene);
    this.scene.add("WorldScene", WorldScene);
    this.scene.add("Library", LibraryScene);
    this.scene.add("UI", UIScene);
    this.scene.add("TitleScene", TitleScene);
    this.scene.add("Cornering", CorneringScene);
    this.scene.start("BootScene", {scene: 'title'});
  }
}

window.onload = function() {
  window.game = new Game();
  resize();
  window.addEventListener("resize", resize, false);
};

function resize() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = config.width / config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}
