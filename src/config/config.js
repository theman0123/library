export default {
  type: Phaser.AUTO,
  parent: "es6-template",
  width: 300,
  height: 600,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};
