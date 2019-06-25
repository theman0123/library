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

    let loading_message = this.add.text(320, 240, "loading", {
        font: "48px Kells",
        fill: "#ffffff",
      });
  }
    
  preload() {
      // time event for logo
      // this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);
      // this.createPreloader();

      // audio
      // this.load.audio(
      //   "drone",
      //   "assets/23141852_drones_by_thefoundation_preview.mp3",
      // );

      
      // tilemap in JSON format
      // this.load.tilemapTiledJSON("library-map", "assets/maps/library1.json");

    let assets = this.level_data.assets;
    for (let asset_key in assets) {
      let asset = assets[asset_key];
      
      switch (asset.type) {
        case "image":
            this.load.image(asset_key, asset.source);
            break;
        case "spritesheet":
            this.load.spritesheet(asset_key, asset.source, {
                frameWidth: asset.frame_width,
                frameHeight: asset.frame_height,
                frames: asset.frames,
                margin: asset.margin,
                spacing: asset.spacing,
            });
            break;
        case "tilemap":
        case "level_tilemap":
            this.load.tilemapTiledJSON(asset_key, asset.source);
            break;
            case "multiatlas":
              // 1. reference 2. json atlas 3. location of images
              this.load.multiatlas(asset.name, asset.json, asset.source);
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
    this.buildAnims(this.level_data.assets)

    this.scene.start(data.scene, { level_data: this.level_data });
  }

  buildAnims(assets) {
    for (let asset_key in assets) {
      let asset = assets[asset_key]
      console.group(asset_key)
      
      if (!asset.animations) {
        console.warn('no anims for: ', asset)
        // skips to next iteration; doesn't 'break' loop
        console.groupEnd()
        continue;
      }
      
      if (asset.type === 'spritesheet' && asset.animations) {
        console.table('animations: ', asset.animations)
        
        for ( let anim_key in asset.animations ) {
          this.myFrames[asset.name] = {};
          let anim = asset.animations[anim_key]
          
          console.group(`${anim_key}`)
          console.log(anim)

          // generate frame names
          this.myFrames[asset.name][anim_key] = this.anims.generateFrameNames(anim.atlas, {
            start: anim.start, end: anim.end, zeroPad: anim.zeroPad,
            prefix: anim.prefix, suffix: anim.suffix
          });
          // create animation
          this.anims.create({
              key: `${asset.name}${asset.anim}`,
              frames: this.myFrames[asset.name][asset.anim],
              frameRate: anim.frameRate,
              yoyo: anim.yoyo,
              repeat: anim.repeat,
            });
          console.log('myFrames: ', this.myFrames[asset.name][anim_key])
          console.log(this.myFrames[asset.name][anim_key] ? '%c SUCCESS': ' %c FAIL', this.myFrames[asset.name][anim_key] ? 'background: yellow; color: green': 'background: grey; color: red' )
          console.groupEnd();
          console.groupEnd();
          }
        }
      }
    

      console.log('atlases: ', this.atlases)

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



  ready() {
    this.readyCount++;
    // if (this.readyCount === 2) {
    // start game
    // }
    // this.scene.start("Library");
  }
}
