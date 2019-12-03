class Player extends Phaser.GameObjects.Sprite{

    constructor(scene){
        
        super(scene, config.width/2, config.height- 20, "player");

        this.health = 100;
        this.speed = gameSettings.gameSpeed*150;
        this.controls = scene.input.keyboard.addKeys('W,A,S,D,S,SPACE');
        this.cursorKeys = scene.input.keyboard.createCursorKeys();


        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
    }

    movePlayerManager() {

        var speed = gameSettings.gameSpeed * 150;

        this.body.setVelocity(0);

        if (this.cursorKeys.left.isDown || this.controls.A.isDown) {
            this.body.setVelocityX(-speed);
        }
        if (this.cursorKeys.right.isDown || this.controls.D.isDown) {
            this.body.setVelocityX(speed);
        }
        if (this.cursorKeys.up.isDown || this.controls.W.isDown) {
            this.body.setVelocityY(-speed);
        }
        if (this.cursorKeys.down.isDown || this.controls.S.isDown) {
            this.body.setVelocityY(speed);
        }
    }

    update(){
        if(this.visible)
        {
            if (Phaser.Input.Keyboard.JustDown(this.controls.SPACE)) {
                this.shootBeam();
            }

            this.movePlayerManager();
        }
    }

    shootBeam() {
        var beam = new Beam(this.scene);
    }

    getHit() {
        this.health -= 10;
    }
}