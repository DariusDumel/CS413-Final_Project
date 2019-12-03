class PowerUp extends Phaser.GameObjects.Sprite{
    constructor(scene, enemy){
        var x = enemy.x
        var y = enemy.y

        super(scene, x, y, 'powerUp')
        
        scene.powerUps.add(this);
        scene.add.existing(this);
    }
}