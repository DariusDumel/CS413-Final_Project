class LoadScene extends Phaser.Scene {
    constructor() {
        super("loadGame")
    }

    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.image('ship1', 'assets/ship1.png');
        this.load.image('ship2', 'assets/ship2.png');
        this.load.image('ship3', 'assets/ship3.png');
        this.load.image('powerUp', 'assets/pu1.png');
        this.load.spritesheet('player1', "assets/player_a.png", {
            frameWidth: 44,
            frameHeight: 74,
        })
        this.load.spritesheet('pew', "assets/pew1_a.png", {
            frameWidth: 10,
            frameHeight: 30,
        });
        this.load.spritesheet('enemy_pew', "assets/enemy_pew.png", {
            frameWidth: 11,
            frameHeight: 30,
        })
    }

    create() {

        this.scene.start("playGame");

        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player1"),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "pew_anim",
            frame: this.anims.generateFrameNumbers("pew"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "enemy_pew_a",
            frames: this.anims.generateFrameNumbers("enemy_pew"),
            frameRate: 12,
            repeat: -1
        });

    }
}