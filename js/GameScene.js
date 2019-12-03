class GameScene extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

preload() {
    this.load.image('bg', 'assets/background.png');
    this.load.image('ship1', 'assets/ship1.png');
    this.load.image('ship2', 'assets/ship2.png');
    this.load.image('ship3', 'assets/ship3.png');
    this.load.image('powerUp','assets/pu1.png');
    this.load.spritesheet('player1', "assets/player_a.png",{
        frameWidth: 44,
        frameHeight: 74,
    })
    this.load.spritesheet('pew', "assets/pew1_a.png",{
        frameWidth: 10,
        frameHeight: 30,
    });
    this.load.spritesheet('enemy_pew', "assets/enemy_pew.png", {
        frameWidth: 11,
        frameHeight: 30,
    })
}

create() {

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
    
    this.background = this.add.tileSprite(300, 400, config.width, config.height, 'bg');
    
    this.add.text(20, 20, "Playing game", {
        font: "25px Arial",
        fill: "yellow"
    });
    
    this.physics.world.setBoundsCollision();
    this.activeEnemies = this.physics.add.group();
    new Enemy(this, config.width / 2, -50, 1);
    new Enemy(this, 0, -100, 2);
    new Enemy(this, config.width, -500, 3);

    new Enemy(this, config.width / 2, -1000, 1);
    new Enemy(this, config.width / 2 -234, -1000, 1);
    new Enemy(this, config.width / 2 + 234, -1000, 1);
    new Enemy(this, config.width / 2 - 500, -1000, 1);
    new Enemy(this, 500, -1000, 2);
    new Enemy(this, 23, -1000, 2);
    new Enemy(this, 60, -1000, 2);
    new Enemy(this, 123, -1000, 2);
    new Enemy(this, 250, -1000, 2);
    new Enemy(this, 200, -1000, 2);
    new Enemy(this, 100, -1000, 2);
    new Enemy(this, config.width, -1500, 3);

    this.projectiles = this.physics.add.group();
    this.enemyProjectiles = this.physics.add.group();
    this.powerUps = this.physics.add.group();

    this.player = new Player(this);

    this.physics.add.overlap(this.activeEnemies, this.projectiles,
        function (enemy, beam) {
            this.projectiles.remove(beam, true, true);
            this.activeEnemies.remove(enemy, true, true);
        }
        , null, this);

    this.physics.add.overlap(this.player, this.activeEnemies,
        function (player, enemy){
            player.getHit();
            if(player.health == 0){
                player.setVisible(false);
            }
        }
        , null, this)

    this.physics.add.overlap(this.player, this.enemyProjectiles,
        function (player, beam) {
            beam.destroy();
            player.getHit();
            if (player.health == 0) {
                player.setVisible(false);
            }
        }
        , null, this)
    
    this.hp = this.add.text(20, config.height-50, this.player.health, {
        font: "25px Arial"});
}



update() {
    this.background.tilePositionY -= .8;
    
    this.activeEnemies.getChildren().forEach(enemy => {
        enemy.update();
    });

    this.player.update();

    this.projectiles.getChildren().forEach(beam => {
        beam.update();
    })

    this.enemyProjectiles.getChildren().forEach(beam => {
        beam.update();
    })

    this.hp.setText(this.player.health)
}

hitEnemy(enemy, beam){
    beam.destroy();
    enemy.getHit();
    console.log((enemy.health).toString())
    var powerUp = new PowerUp(this.scene, enemy);
}

}