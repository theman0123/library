import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  preload() {
    this.load.image("phaser-logo", "assets/logo.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}
