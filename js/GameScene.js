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
    this.activeEnemies = this.physics.add.group();
    this.ship1 = new Enemy(this, config.width / 2, -50, 1);
    this.ship2 = new Enemy(this, 0, -100, 2);
    this.ship3 = new Enemy(this, config.width, -500, 3);
    
    this.projectiles = this.physics.add.group();
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
    
    this.hp = this.add.text(20, config.height-50, this.player.health, {
        font: "25px Arial",
    });
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

    this.hp.setText(this.player.health)
}

hitEnemy(enemy, beam){
    beam.destroy();
    enemy.destroy();
    var powerUp = new powerUp(this, enemy)
}

}