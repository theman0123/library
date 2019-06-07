import "phaser";
import RunButton from "../sprites/RunButton.js";

export default class UIScene extends Phaser.Scene {
  constructor() {
    // 'active: true' means this scene is always running
    super({ key: "UI", active: false });
  }

  init() {
    this.gameScene = this.scene.get("Game");
  }

  create() {
    this.gameScene.events.on("displayUI", () => {
      this.createInputControlBox();
      this.runButton = new RunButton(
        this,
        this.gameScene.cameras.main.width - 50,
        this.gameScene.cameras.main.height - 50,
      );
    });
  }

  createInputControlBox() {
    this.dropZone = this.add.image(
      75,
      this.gameScene.cameras.main.height - 50,
      "drop-zone",
    );
    this.dropZone
      .setScale(2, 1.5)
      .setAlpha(0.5)
      .setInteractive();
    this.input.setDraggable(this.dropZone);
    // setup left/right movement with dropZone
    this.dropZone.on("drag", (p, lx, ly) => {
      p.downX > lx
        ? this.gameScene.player.body.setVelocityX(
            -100 * this.runButton.recentTimesPushed,
          )
        : this.gameScene.player.body.setVelocityX(
            100 * this.runButton.recentTimesPushed,
          );
    });
  }
}
