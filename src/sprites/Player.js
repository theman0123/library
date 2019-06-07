import "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, texture) {
    super(
      scene,
      scene.game.config.width / 2,
      scene.game.config.height - 100,
      texture,
    );
    this.scene = scene;
    this.isAlive = true;
    // enable physics
    this.scene.physics.world.enable(this);

    // add to scene
    this.scene.add.existing(this);
    // modify size
    this.setScale(2);
    // place on top layer
    this.setDepth(1);
    // fix to camera
    // align to view
    this.setOrigin(0);
    // key-action-perspective
    this.play("josh-idle");
  }

  update(cursors) {
    // check if up or down key is pressed
    if (cursors.up.isDown) {
      console.log('up')
      this.direction = "up";
      this.body.setVelocity(0, -150);
      this.play('josh-walk-north', true)
    } else if (cursors.down.isDown) {
      console.log('down')
      this.direction = "down";
      this.body.setVelocity(0, 150);
      this.play('josh-walk-south', true)
    }
    // check if left or right key is pressed
    else if (cursors.left.isDown) {
      this.direction = "left";
      this.body.setVelocity(-150, 0);
      this.play('josh-walk-west', true).setFlipX(false)
    } else if (cursors.right.isDown) {
      this.direction = "right";
      this.body.setVelocity(150, 0);
      this.play('josh-walk-west', true).setFlipX(true)
    }
    else {
      this.body.setVelocity(0)
      this.play('josh-idle', true)
    }
  }
}
