// import "phaser";
// import WIB from "../sprites/WIB";
// import Player from "../prefabs/world/Player";

// export default class LibraryScene extends Phaser.Scene {
//   constructor() {
//     super("Library");
//   }
//   init() {
//     this.debug = true;
//   }

//   create() {
//     // create player
//     this.player = new Player(this, 'library-atlas', 'characters/josh/idle/JoshSidle_00.png')

//     this.createMap();
//     this.cameras.main.startFollow(this.player)
//     // control player
//     this.cursors = this.input.keyboard.createCursorKeys();

//     // collisions and bounds
//     this.verticalLayer.setCollisionByProperty({ collide: true });
//     this.physics.add.collider(this.player, this.verticalLayer);

//     this.player.setCollideWorldBounds(true);

//     // bounds
//      // set the boundaries of our game world
//      this.physics.world.bounds.width = this.groundLayer.width;
//      this.physics.world.bounds.height = this.groundLayer.height;

//     if (this.debug === true) this.debugger()
//     // Phaser.lights.enable()
//     this.lights.enable().setAmbientColor(0xffffff);
//     // (x, y, radius, rgb, intensity)
//     var light  = this.lights.addLight(500, 350, 300);
//     // test lights with pointer
//     this.input.on('pointermove', function (pointer) {
//       light.x = pointer.x;
//       light.y = pointer.y;
//     });
//   }

//   createMap() {
//     // create map
//     this.level = this.make.tilemap({ key: "library-map" });
//     // add tileset image
//     // 2 parameters: name from tiled, name from preloader/phaser3
//     this.tiles = this.level.addTilesetImage(
//       "library-0",
//       "library-tileset"
//     );
//     // // create ground layer
//     this.groundLayer = this.level.createStaticLayer(
//       "redwood",
//       this.tiles,
//     )
//     console.log('groundlayer', this.groundLayer)
//     // this.groundLayer.setTint(0x000000);
//     // // create wall layer
//     this.verticalLayer = this.level.createStaticLayer(
//       "stonewall",
//       this.tiles,
//     );
//     // rafters
//     this.rafterLayer = this.level.createStaticLayer(
//       "rafters",
//       this.tiles,
//     ).setDepth(3);
//     // lights
//     this.lightLayer = this.level.createStaticLayer(
//       "lights",
//       this.tiles,
//     ).setDepth(3);
//     // objects layer
//     // this.objectsLayer = this.level.createStaticLayer(
//     //   "lights-obj",
//     //   this.tiles,
//     // );
//     // this.setLayerCollisions();
//   }

//   debugger() {
//     const debugGraphics = this.add.graphics().setAlpha(0.75);
//     this.verticalLayer.renderDebug(debugGraphics, {
//     tileColor: null, // Color of non-colliding tiles
//     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
//     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
// });
//   }

//   createCursor() {}


//   setLayerCollisions() {
//     // this.groundLayer.setCollisionByProperty({ collides: true });
//     // this.physics.add.collider(this.player, this.groundLayer);
//     // make colliding tiles easy to see/debug
//     // const debugGraphics = this.add.graphics().setAlpha(0.75);
//     // this.groundLayer.renderDebug(debugGraphics, {
//     //   tileColor: null, // Color of non-colliding tiles
//     //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
//     //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
//     // });
//   }

//   update(time, delta) {
//     this.player.update(this.cursors);
//   }
// }
