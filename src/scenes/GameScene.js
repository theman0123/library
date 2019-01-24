import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  init() {
    this.newChunk;
    this.chunk = 0;
  }

  create() {
    this.createMap();
  }

  createMap() {
    // create map
    this.level = this.make.tilemap({ key: "forest-run" });
    // dynamically create map
    this.newChunk = this.level.heightInPixels * this.chunk;
    // add tileset image
    this.tiles = this.level.addTilesetImage("tree_and_ground");
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
    this.chunk++;
  }

  createCursor() {}

  update(time, delta) {
    this.cameras.main.scrollY += 1;
    if (this.cameras.main.worldView.y >= this.newChunk) {
      this.createMap();
    }
  }
}
