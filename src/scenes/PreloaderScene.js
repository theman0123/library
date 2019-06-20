import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init(data) {
    this.level_data = data.level_data;
    this.atlases = {};
    this.myFrames = {};

    this.readyCount = 1;
    
    this.frames = {
      josh: {}
    }

    let loading_message = this.add.text(320, 240, "loading", {
        font: "48px Kells",
        fill: "#ffffff",
      });
    }
    
    preload() {
      // wtf get this working priority #1
      // debugger
      this.load.multiatlas("library-0", "assets/graphics/scenes/library/library.json", "assets/graphics/scenes/library");                    
      // time event for logo
      // TODO - update delayedCall to 3000
      // this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);
      // this.createPreloader();
    // this.loadAssets();

    let assets = this.level_data.assets;
    for (let asset_key in assets) {
          let asset = assets[asset_key];
          switch (asset.type) {
              case "image":
                  this.load.image(asset_key, asset.source);
                  break;
              case "spritesheet":
                  // 3rd argument could be an object 'assetFrameSize'
                  this.load.spritesheet(asset_key, asset.source, {
                      frameWidth: asset.frame_width,
                      frameHeight: asset.frame_height,
                      frames: asset.frames,
                      margin: asset.margin,
                      spacing: asset.spacing,
                  });
                  this.myFrames[asset.name] = {};
                  // this.buildAnims(asset)
                  break;
              case "tilemap":
              case "level_tilemap":
                  this.load.tilemapTiledJSON(asset_key, asset.source);
                  break;
                  case "multiatlas":
                    // 1. reference 2. json atlas 3. location of images
                    console.log('multiatlas loaded')
                    // this.load.multiatlas(asset.name, asset.json, asset.source);
                    this.atlases[asset.name] = asset.source;
                  break;
              default:
                  console.warn(
                      "switch in Loading fired default case: ",
                      asset_key,
                      asset.source,
                  );
                  return;
          }
      }
  }

  create(data) {
    // WORKING HERE
    // try and get this working
// debugger
    this.myFrames['test'] = this.anims.generateFrameNames('library-0', {
      start: 0, end: 28, zeroPad: 2,
      prefix: 'characters/josh/idle/JoshSidle_', suffix: '.png'
    });
    console.log('test: ', this.myFrames['test'])
    this.scene.start(data.scene, { level_data: this.level_data });
  }

  buildAnims(asset) {
    if (!asset.animations) {
      console.warn('no anims for: ', asset)
      return ;
    }

    // TODO: 
    //  2. 

    for ( let anim_key in asset.animations ) {
      console.log('animations: ', anim_key, asset, this.atlases)
      // 'idle', {josh}
      let anim = asset.animations[anim_key]
      // console.log('test', this.myFrames, this.myFrames[asset.name] )
       // create anims
      //  example: prefix: 'characters/josh/idle/JoshSidle_', suffix: '.png'
      this.myFrames[asset.name][anim_key] = this.anims.generateFrameNames('library', {
        start: 0, end: 28, zeroPad: 2,
        prefix: "characters/josh/idle/JoshSidle_", suffix: ".png"
      });
  console.log('myFrames: ', this.myFrames[asset.name][anim_key], anim.prefix, this.atlases)
  //   this.anims.create({
  //     key: `${asset.name}${asset.anim}`,
  //     frames: this.myFrames[asset.name][asset.anim],
  //     frameRate: anim.frameRate,
  //     yoyo: anim.yoyo,
  //     repeat: anim.repeat,
  //   });
    }

  }

  createPreloader() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    // add logo image
    // this.logo = this.add.image(
    //   this.width / 2,
    //   this.height / 2 - 100,
    //   "phaser-logo",
    // );

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
    // this.load.audio(
    //   "drone",
    //   "assets/23141852_drones_by_thefoundation_preview.mp3",
    // );

    // load assets for game
    
    // tilemap in JSON format
    // this.load.tilemapTiledJSON("library-map", "assets/maps/library1.json");

    // haven't tried might work
    // this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');

    // spritesheets
    // this.load.spritesheet(
    //   "library-tileset",
    //   "assets/graphics/library-0.png",
    //   {
    //     frameWidth: 32,
    //     frameHeight: 32,
    //   },
    // );
  }

  ready() {
    this.readyCount++;
    // if (this.readyCount === 2) {
    // start game
    // }
    // this.scene.start("Library");
  }
}
