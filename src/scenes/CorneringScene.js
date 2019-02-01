import "phaser";

export default class Cornering extends Phaser.Scene {
  constructor() {
    super("Cornering");
  }
  init() {
    this.RWasPushed = false;
  }

  create() {
    this.goFullScreen();
    this.createTilesAndGroup();
    this.createInputHandler();
    this.createBackgroundGradient();
  }

  centerAndHandleTile() {
    // remove old tile
    this.tiles[this.i - 1 >= 0 ? this.i - 1 : 3].setVisible(false);
    // make image final size
    this.tiles[this.i].setScale(4);
    // center image based on final size
    this.centerObject(this.tiles[this.i]);
    // return image to normal size
    this.tiles[this.i].setScale(0.5);
    // make current tile visible
    this.tiles[this.i].setVisible(true);
    if (this.i >= 3) {
      this.i = 0;
    } else this.i++;
  }

  centerObject(gameObject, offset = 0) {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    gameObject.x = this.width / 2;
    gameObject.y = this.height / 2;
  }

  createBackgroundGradient() {
    this.innerBoundary = new Phaser.Geom.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
    );
    this.innerBorderOutline = this.add.graphics();
    this.innerBorderOutline
      .fillGradientStyle(0x0c0c0f, 0x0c0c0f, 0x5a5a5c, 0x5a5a5c)
      .setDepth(-1);
    this.innerBorderOutline.fillRectShape(this.innerBoundary);
  }

  createCursor() {}

  createInputHandler() {
    // switch back to game on 'g'
    this.input.keyboard.on("keydown_" + "G", event => {
      this.scene.start("Game");
    });
    // reveal and cycle through 4 corners on 'r'
    this.input.keyboard.on("keydown_" + "R", this.handleCornering, this);
    // click to stop/play the drone - must push 'r' first (else this.drone doesn't exist)
    this.input.on("pointerdown", () => {
      !this.drone
        ? null
        : this.drone.isPlaying
        ? this.drone.stop()
        : this.drone.play();
    });
  }

  createTilesAndGroup() {
    this.wibTile = this.add.image(0, 0, "wib-tile").setVisible(false);
    this.glowBarkTile = this.add.image(0, 0, "glowBark-tile").setVisible(false);
    this.weepingMaryTile = this.add
      .image(0, 0, "weepingMary-tile")
      .setVisible(false);
    this.moltenerTile = this.add.image(0, 0, "moltener-tile").setVisible(false);
    // create tile group
    this.fourCorners = this.add.group([
      this.weepingMaryTile,
      this.moltenerTile,
      this.wibTile,
      this.glowBarkTile,
    ]);
  }

  goFullScreen() {
    game.resize(window.innerWidth, window.innerHeight);
    this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight);
  }

  handleCornering(event) {
    if (this.RWasPushed) return;
    this.RWasPushed = true;
    // add drone with settings
    this.drone = this.sound.add("drone", { loop: true });
    // play drone/music
    this.drone.play();
    // create tiles array
    this.tiles = this.fourCorners.getChildren();
    // i keeps track of this.tiles[this.i]
    this.i = 0;
    // add tween for scaling tiles
    this.scaleTween = this.tweens.add({
      targets: this.tiles,
      scaleX: 4,
      scaleY: 4,
      ease: "Power2", // 'Sine.easeInOut', 'Bounce'
      duration: 5000,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
    });
    // change image periodically
    this.tileTimer = this.time.addEvent({
      delay: 5500, // ms
      callback: function() {
        this.centerAndHandleTile();
        this.scaleTween.restart();
      },
      callbackScope: this,
      repeat: -1,
    });
  }

  update(time, delta) {}
}
