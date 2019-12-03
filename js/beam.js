class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.player.x
        var y = scene.player.y - 16;

        super(scene, x, y, "pew");

        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.body.setVelocityY(-500);

        scene.projectiles.add(this);
    }

    update(){
        
        if(this.y < 32){
            this.destroy();
        }
    }
}