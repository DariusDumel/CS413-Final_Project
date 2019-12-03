class GameScene extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

preload() {
    this.load.image('bg', 'assets/background.png');
    this.load.image('ship1', 'assets/ship1.png');
    this.load.image('ship2', 'assets/ship2.png');
    this.load.image('ship3', 'assets/ship3.png');
    this.load.image('player', 'assets/playership.png');
    this.load.image('powerUp','assets/pu1.png');
    this.load.image('pew', 'assets/pew1.png')
}

create() {

    this.background = this.add.tileSprite(300, 400, config.width, config.height, 'bg');
    
    this.add.text(20, 20, "Playing game", {
        font: "25px Arial",
        fill: "yellow"
    });
    
    this.physics.world.setBoundsCollision();
    this.activeEnemies = this.add.group();
    this.ship1 = new Enemy(this, config.width / 2, -50, 1);
    this.ship2 = new Enemy(this, 0, -100, 2);
    this.ship3 = new Enemy(this, config.width, -500, 3);
    
    this.physics.add.overlap(this.activeEnemies, this.projectiles, hitEnemy, null, this)
    this.projectiles = this.add.group();
    this.powerUps = this.physics.add.group();

    for(var i = 0; i < gameSettings.maxPowerUps; i++){
        var powerUp = this.physics.add.sprite(16,16, "powerUp");
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0,0, config.width, config.height);
        powerUp.setVelocity(gameSettings.gameSpeed*50, gameSettings.gameSpeed*50);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
    }

    this.player = new Player(this);
}



update() {
    this.background.tilePositionY -= .8;
    
    this.activeEnemies.getChildren().forEach(enemy => {
        enemy.update();
    });

    this.player.update();

    for(var i = 0; i < this.projectiles.getChildren().length; i++){
        var beam = this.projectiles.getChildren()[i]
        beam.update();
    }

    this.player()
}

hitEnemy(Enemy, beam){
    beam.destroy();
    Enemy.destroy();
}

}