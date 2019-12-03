var config = {
    type: Phaser.AUTO,
    parent: "gameport",
    width: 600,
    height: 800,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    },
    scene: [GameScene]
};

var gameSettings = {
    gameSpeed: 2,
    maxPowerUps: 3,
}

var game = new Phaser.Game(config);


