import "phaser";

export default class WIB extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      scene.game.config.width / 2,
      scene.game.config.height - 100,
      "wib",
    );
    this.scene = scene;
    this.isAlive = true;
    // enable physics
    this.scene.physics.world.enable(this);

    // add to scene
    this.scene.add.existing(this);
    // modify size
    this.setScale(1.5);
    // place on top layer
    this.setDepth(1);
    // losing your body...
    // fix to camera
    // this.setScrollFactor(0);
    // align to view
    this.setOrigin(0);
    // key-action-perspective
    this.play("wib-run-top");
  }

  run(boost) {
    this.runTimer = this.scene.time.addEvent({
      delay: 200, // ms
      callback: () => {
        this.runTimer.repeatCount > 0
          ? this.body.setVelocityY(-this.runTimer.repeatCount * boost)
          : this.body.setVelocity(0);
      },
      callbackScope: this,
      repeat: 5,
    });
  }

  trip() {
    this.body.setVelocity(0);
    // this.isTripping = true;
    // this.tripTimer = this.scene.time.addEvent({
    //   delay: 3000,
    //   callback: () => (this.isTripping = false),
    //   repeat: 0,
    // });
  }

  update(cursors) {
    // this.body.setVelocity(0);
    // check if up or down key is pressed
    if (cursors.up.isDown) {
      this.direction = "up";
      this.body.setVelocityY(-150);
    } else if (cursors.down.isDown) {
      this.direction = "down";
      this.body.setVelocityY(150);
    }
    // check if left or right key is pressed
    if (cursors.left.isDown) {
      this.direction = "left";
      this.body.setVelocityX(-150);
    } else if (cursors.right.isDown) {
      this.direction = "right";
      this.body.setVelocityX(150);
    }
  }
}
