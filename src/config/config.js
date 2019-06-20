export default {
  type: Phaser.AUTO,
  parent: "Library",
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
