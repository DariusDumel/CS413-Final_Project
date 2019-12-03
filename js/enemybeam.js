class EnemyBeam extends Phaser.GameObjects.Sprite {
    constructor(scene, enemy) {
        var x = enemy.x
        var y = enemy.y;

        super(scene, x ,y, "enemy_pew")
        this.play("enemy_pew_a")
        scene.add.existing(this);
        scene.enemyProjectiles.add(this);
    }

    update() {
        this.y += gameSettings.gameSpeed * 3

        if (this.y > config.height + 20) {
            this.destroy();
        }
    }
}