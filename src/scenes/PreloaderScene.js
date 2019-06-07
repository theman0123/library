import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.readyCount = 1;
    this.frames = {
      josh: {}
    }
  }

  preload() {
    // time event for logo
    // TODO - update delayedCall to 3000
    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);
    this.createPreloader();
    this.loadAssets();
  }

  create() {
    // create anims
    // wib
    this.anims.create({
      key: "wib-run-top",
      frames: this.anims.generateFrameNames("wib", {
        frames: [0, 1, 2],
      }),
      frameRate: 3,
      yoyo: false,
      repeat: -1,
    });

    this.anims.create({
      key: "josh-walk-south",
      frames: this.anims.generateFrameNames("josh-walk-s", {
        frames: [1, 2, 3, 4],
      }),
      frameRate: 5,
      yoyo: false,
      repeat: 1,
    });
    this.anims.create({
      key: "josh-idle",
      frames: this.anims.generateFrameNames("josh-idle-frames"),
      frameRate: 5,
      yoyo: false,
      repeat: 1,
    });
    this.anims.create({
      key: "josh-walk-west",
      frames: this.anims.generateFrameNames("josh-walk-w"),
      frameRate: 5,
      yoyo: false,
      repeat: 1,
    });
    this.anims.create({
      key: "josh-walk-north",
      frames: this.anims.generateFrameNames("josh-walk-n"),
      frameRate: 5,
      yoyo: false,
      repeat: 1,
    });
  }

  createPreloader() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    // add logo image
    this.logo = this.add.image(
      this.width / 2,
      this.height / 2 - 100,
      "phaser-logo",
    );

    // build loading bar and container
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();

    // display progess bar
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(
      this.width / 2 - 160,
      this.height / 2 - 30,
      320,
      50,
    );

    // loading text
    this.loadingText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);

    // percent text
    this.percentText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    this.percentText.setOrigin(0.5, 0.5);
    // loading assets
    this.loadingAssetsText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    this.loadingAssetsText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", value => {
      this.percentText.setText(parseInt(value * 100) + "%");
      this.progressBar.clear();
      this.progressBar.fillStyle(0xfffff, 1);
      this.progressBar.fillRect(
        this.width / 2 - 150,
        this.height / 2 - 20,
        300 * value,
        30,
      );
    });

    // update file progress text
    this.load.on("fileprogress", file => {
      this.loadingAssetsText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on("complete", () => {
      this.progressBox.destroy();
      this.progressBar.destroy();
      this.loadingAssetsText.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.ready();
    });
  }

  loadAssets() {
    // audio
    this.load.audio(
      "drone",
      "assets/23141852_drones_by_thefoundation_preview.mp3",
    );

    // load assets for game
    this.load.image("wib-tile", "assets/WIB-tile.png");
    this.load.image("glowBark-tile", "assets/Quelavez-tile.png");
    this.load.image("weepingMary-tile", "assets/WeepingMary-tile.png");
    this.load.image("moltener-tile", "assets/Moltener-tile.png");
    this.load.image("drop-zone", "assets/input-touch-drop-zone.png");

    // tilemap in JSON format
    this.load.tilemapTiledJSON("forest-run", "assets/quelavez.json");
    this.load.tilemapTiledJSON("library-map", "assets/maps/library1.json");

    // atlas spritesheet
    this.load.multiatlas('library-atlas', 'assets/library.json', 'assets');
    // haven't tried might work
    // this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');

    // spritesheets
    this.load.spritesheet(
      "library-tileset",
      "assets/library-0.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      "tree(64x64)_and_ground",
      "assets/tree(64x64)_and_ground.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet("wib", "assets/wib.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("josh-walk-s", "assets/characters/Josh_S_walk_stand.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("josh-idle-frames", "assets/characters/Josh_S_idle.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("josh-walk-n", "assets/characters/Josh_N_walk_stand.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("josh-walk-w", "assets/characters/Josh_W_walk_stand.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    // using atlas for anims ??
    // this.spritesheet = this.textures.get('library-atlas.png')
    // this.spritesheet2 = this.textures.get('library-atlas/characters/Josh_S_walk_stand.png')
    // this.frames.josh.walk = this.anims.generateFrameNames(this.spritesheet);
    // this.anims.create({ key: 'walk-south', frames: this.frames.josh.walk, frameRate: 4, repeat: -1 });
console.log(this.anims, this.frames.josh, this.spritesheet, this.spritesheet2)
    this.load.spritesheet("button-run", "assets/button-run.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  ready() {
    this.readyCount++;
    // if (this.readyCount === 2) {
    // change to Title
    this.scene.start("Game");
    // }
  }
}
