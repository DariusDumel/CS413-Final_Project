class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type){
        switch (type) {
            case 1:
                super(scene ,x, y, 'ship1')
                this.health = 10;
                this.speedMod = 0;
                break;
                
            case 2:
                super(scene ,x, y, 'ship2')
                this.health = 20;
                this.speedMod = .75;
                break;

            case 3:
                super(scene ,x, y, 'ship3')
                this.health = 50;
                this.speedMod = 2;
                break;
                
            case 4:
                super(scene, x, y, 'ship1')    
            
            default:
                super(scene, x, y, 'player')
                this.health = 10;
                break;
            }
        this.type = type;
        this.startX = x;
        this.startY = y;
        scene.add.existing(this);
        scene.activeEnemies.add(this)
    }

    update(){

    this.moveEnemy()
    }

    moveEnemy() {

        //speed of moving down
        this.y += gameSettings.gameSpeed + this.speedMod;
        if (this.y > config.height) {
            this.resetEnemyPos(this)
        }

        //pattern of moving down
        if(this.type == 1){
            this.x += Math.cos(this.y/50)*(4*gameSettings.gameSpeed);
        }
        if(this.type == 2){
            this.x += (Math.E * (Math.sin(this.y/70))**2)*(gameSettings.gameSpeed/2);
        }
        if(this.type == 3){
            this.x -= (Math.E * (Math.cos(this.y /70))**2)*(gameSettings.gameSpeed/2);
        }
        if(this.type == 4){
            this.x -= Math.cos(this.y / 50) * 4(gameSettings.gameSpeed);
        }
    }

    resetEnemyPos() {
        this.y = 0;
        this.x = this.startX;
    }

    destroyEnemy() {
        //add explosion animation
        this.destroy();
    }
}