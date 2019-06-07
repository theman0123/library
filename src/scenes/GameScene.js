import "phaser";
import WIB from "../sprites/WIB";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  init() {
    this.newChunk;
    this.chunk = 0;
    this.endLocation = 5000;
    this.beginFade = false;
  }

  create() {
    // wib - player
    this.player = new WIB(this);

    this.createMap();

    // control player
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown_" + "C", event => {
      this.scene.start("Cornering");
    });
    this.input.keyboard.on("keydown_" + "L", event => {
      this.scene.start("Library");
    });
    this.events.emit("displayUI");

    this.setupSunsetMask();
  }

  createMap() {
    // create map
    this.level = this.make.tilemap({ key: "forest-run" });
    // dynamically create map
    this.newChunk = this.level.heightInPixels * this.chunk;
    // add tileset image
    this.tiles = this.level.addTilesetImage(
      "tree(64x64)_and_ground",
      "tree(64x64)_and_ground",
    );
    // create ground layer
    this.groundLayer = this.level.createStaticLayer(
      "horizontal",
      this.tiles,
      0,
      this.newChunk,
    );
    // create vertical layer
    this.verticalLayer = this.level.createStaticLayer(
      "vertical",
      this.tiles,
      0,
      this.newChunk,
    );
    this.chunk--;
    this.setLayerCollisions();
  }

  createCursor() {}

  createSunsetGraphics() {
    this.sunsetMask1Dimensions = new Phaser.Geom.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
    );
    this.sunsetMask1Display = this.add.graphics().setScrollFactor(0);

    this.sunsetMask1Display
      .fillGradientStyle(0xea4141)
      .setDepth(2)
      .setAlpha(0);
    this.sunsetMask1Display.fillRectShape(this.sunsetMask1Dimensions);

    this.sunsetMask2Dimensions = new Phaser.Geom.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
    );
    this.sunsetMask2Display = this.add.graphics().setScrollFactor(0);

    this.sunsetMask2Display
      .fillGradientStyle(0x090092, 0x090092, 0xa9a9ac, 0x090092)
      .setDepth(3)
      .setAlpha(0);
    this.sunsetMask2Display.fillRectShape(this.sunsetMask2Dimensions);
  }

  createSunsetTweens() {
    // tween for pinkish sunset
    this.lightSunsetTween = this.tweens.add({
      targets: this.sunsetMask1Display,
      alpha: {
        getStart: () => 0,
        getEnd: () => 0.65,
      },
      ease: "Sine.easeOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 5000,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: () => {
        this.deepSunSetTween.resume();
      },
    });
    // tween for deep blue/dark sunset
    this.deepSunSetTween = this.tweens.add({
      targets: this.sunsetMask2Display,
      alpha: {
        getStart: () => 0,
        getEnd: () => 0.45,
      },
      ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 5000,
      repeat: 0, // -1: infinity
      yoyo: false,
      paused: true,
    });
  }

  setLayerCollisions() {
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.groundLayer);
    // make colliding tiles easy to see/debug
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // this.groundLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });
  }

  setupSunsetMask() {
    // establish graphics
    this.createSunsetGraphics();
    // call sunset tweens to action
    this.createSunsetTweens();
  }

  update(time, delta) {
    this.cameras.main.scrollY -= 1;
    if (this.cameras.main.worldView.y <= this.newChunk) {
      this.createMap();
    }
    // if (
    //   Math.abs(this.endLocation - this.player.y) <= 5000 &&
    //   this.beginFade === false
    // ) {
    //   let duration = ((this.endLocation - this.player.y) * 10) / 2;
    // }
    if (this.player.isAlive) {
      this.player.update(this.cursors);
    }
  }
}
