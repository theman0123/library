import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  preload() {
    this.load.image("phaser-logo", "assets/logo.png");
    this.load.image("title", "assets/wib-placeholder.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}
