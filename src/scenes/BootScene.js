import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
    
    this.levels = {
        title: {
            key: "TitleScene",
            path: "assets/levels/title_scene.json",
        },
        library: {
            key: "WorldScene",
            path: "assets/levels/library.json",
        },
    };
  }

  preload() {
      for (let level_name in this.levels) {
          let level = this.levels[level_name];
          this.load.json(level_name, level.path);
      }
  }

  create(data) {
      let level_data = this.cache.json.get(data.scene);
      this.scene.start("Preloader", {
          level_data: level_data,
          scene: this.levels[data.scene].key,
      });
  }
}
