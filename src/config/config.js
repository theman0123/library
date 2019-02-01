export default {
  type: Phaser.AUTO,
  parent: "wib",
  width: 300,
  height: 600,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
};
