import "phaser";

export default class RunButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "button-run");
    this.scene = scene;
    this.recentTimesPushed = 0;
    // add to scene
    this.scene.add.existing(this);
    // scale
    this.setScale(2);

    this.setInteractive();
    this.on("pointerdown", () => {
      // set frame
      this.setFrame(1);
      // increase velocity
      this.recentTimesPushed++;
      // running cycle
      this.recentTimesPushed >= 5
        ? this.handleTrip()
        : this.scene.gameScene.player.run(this.recentTimesPushed * 20);
      this.buttonPushedTimer = this.scene.gameScene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.recentTimesPushed--;
        },
        repeat: 0,
        callbackScope: this,
      });
    });
    this.on("pointerup", () => {
      this.setFrame(0);
    });
  }

  handleTrip() {
    this.disableInteractive(false);
    this.setAlpha(0.5);
    this.scene.gameScene.player.trip();
    this.blockUITimer = this.scene.gameScene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.setInteractive();
        this.setAlpha(1)
      },
      repeat: 0,
      callbackScope: this,
    });
  }
}
