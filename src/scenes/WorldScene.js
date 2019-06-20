import "phaser";
import Player from "../prefabs/world/Player";

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");

    this.prefab_classes = {
      player: Player.prototype.constructor,
    };

  }
  init() {

  }

  create() {
    // this.createMap();

    // control player
  }

  createMap() {
    // create map
    // this.level = this.make.tilemap({ key: "forest-run" });
    // // dynamically create map
    // this.newChunk = this.level.heightInPixels * this.chunk;
    // // add tileset image
    // this.tiles = this.level.addTilesetImage(
    //   "tree(64x64)_and_ground",
    //   "tree(64x64)_and_ground",
    // );
    // // create ground layer
    // this.groundLayer = this.level.createStaticLayer(
    //   "horizontal",
    //   this.tiles,
    //   0,
    //   this.newChunk,
    // );
    // // create vertical layer
    // this.verticalLayer = this.level.createStaticLayer(
    //   "vertical",
    //   this.tiles,
    //   0,
    //   this.newChunk,
    // );
    // this.chunk--;
    // this.setLayerCollisions();
  }

  createCursor() {}

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

  update(time, delta) {
    // this.cameras.main.scrollY -= 1;
    // if (this.cameras.main.worldView.y <= this.newChunk) {
    //   this.createMap();
    // }
    // if (this.player.isAlive) {
    //   this.player.update(this.cursors);
    // }
  }
}
