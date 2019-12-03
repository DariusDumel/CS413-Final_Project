class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.player.x
        var y = scene.player.y - 16;

        super(scene, x, y, "pew");

        scene.add.existing(this);
        scene.projectiles.add(this);
    }

    update(){
        this.y -= gameSettings.gameSpeed*4

        if(this.y < 32){
            this.destroy();
        }
    }
}