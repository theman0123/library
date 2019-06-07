import "phaser";
import WIB from "../sprites/WIB";
import Player from "../sprites/Player";

export default class LibraryScene extends Phaser.Scene {
  constructor() {
    super("Library");
  }
  init() {
  }

  create() {
    // create player
    this.player = new Player(this, 'josh-idle-frames')

    this.createMap();

    // control player
    this.cursors = this.input.keyboard.createCursorKeys();
    // this.input.keyboard.on("keydown_" + "C", event => {
    //   this.scene.start("Cornering");
    // });
  }

  createMap() {
    // create map
    this.level = this.make.tilemap({ key: "library-map" });
    // add tileset image
    // 2 parameters: name from tiled, name from preloader/phaser3
    this.tiles = this.level.addTilesetImage(
      "library-0",
      "library-tileset"
    );
    // // create ground layer
    this.groundLayer = this.level.createStaticLayer(
      "redwood",
      this.tiles,
    );
    // // create wall layer
    this.verticalLayer = this.level.createStaticLayer(
      "stonewall",
      this.tiles,
    );
    // rafters
    this.rafterLayer = this.level.createStaticLayer(
      "rafters",
      this.tiles,
    );
    // this.setLayerCollisions();
  }

  createCursor() {}


  setLayerCollisions() {
    // this.groundLayer.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, this.groundLayer);
    // make colliding tiles easy to see/debug
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // this.groundLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });
  }

  update(time, delta) {
    this.player.update(this.cursors);
  }
}
