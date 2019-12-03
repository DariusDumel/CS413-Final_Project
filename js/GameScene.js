class GameScene extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

create() {

    this.background = this.add.tileSprite(300, 400, config.width, config.height, 'bg');
 
    this.physics.world.setBoundsCollision();

    //creating enemies
    this.activeEnemies = this.physics.add.group();
    new Enemy(this, config.width / 2, -50, 1);
    new Enemy(this, 0, -100, 2);
    new Enemy(this, config.width, -500, 3);
    new Enemy(this, config.width / 2, -1000, 1);
    new Enemy(this, config.width / 2 -50, -1000, 1);
    new Enemy(this, config.width / 2 + 20, -1100, 1);
    new Enemy(this, config.width / 2 - 10, -1040, 1);
    new Enemy(this, 500, -1000, 2);
    new Enemy(this, 23, -1000, 2);
    new Enemy(this, 60, -1000, 2);
    new Enemy(this, 123, -1123, 1);
    new Enemy(this, 250, -1021, 1);
    new Enemy(this, 200, -1645, 2);
    new Enemy(this, 100, -1623, 2);
    new Enemy(this, config.width, -1500, 3);

    //setting up groups
    this.projectiles = this.physics.add.group();
    this.enemyProjectiles = this.physics.add.group();
    this.powerUps = this.physics.add.group();

    this.player = new Player(this);

    //adding collision between enemies and player beams
    this.physics.add.overlap(this.activeEnemies, this.projectiles,
        function (enemy, beam) {
            this.projectiles.remove(beam, true, true);
            enemy.getHit();
        }
        , null, this);
    
    //adding collision between player and enemies
    this.physics.add.overlap(this.player, this.activeEnemies,
        function (player, enemy){
            player.getHit();
            if(player.health == 0){
                player.setVisible(false);
            }
        }
        , null, this)

    //adding collision between player and enemy beams
    this.physics.add.overlap(this.player, this.enemyProjectiles,
        function (player, beam) {
            beam.destroy();
            player.getHit();
            if (player.health == 0) {
                player.setVisible(false);
            }
        }
        , null, this)
    
    this.hp = this.add.text(20, config.height-50, "HP " + this.player.health, {
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

    this.hp.setText("HP" + this.player.health)

    if(this.player.health <= 0){
        this.add.text(config.width/2, config.height/2, "Game Over" ,{font: "25px Arial"});
    }

    if(this.activeEnemies.getChildren().length == 0){
        this.add.text(config.width / 2, config.height / 2, "You Win!", { font: "25px Arial" });
    }
}

hitEnemy(enemy, beam){
    beam.destroy();
    enemy.getHit();
    console.log((enemy.health).toString())
    var powerUp = new PowerUp(this.scene, enemy);
}

}