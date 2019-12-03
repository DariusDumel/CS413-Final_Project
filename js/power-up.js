class powerUp extends Phaser.GameObjects.Sprite{
    constructor(scene, enemy){
        var x = enemy.x
        var y = enemy.y

        super(scene, x, y, 'powerUp')

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setColliderWorldBounds(true);
        scene.powerUps.add(this);
        this.body.setVelocity(gameSettings.gameSpeed*50, gameSettings.gameSpeed*50);
        this.body.setBounce(1);
    }
}