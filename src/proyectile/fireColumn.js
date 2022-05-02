export default class FireColumn extends Phaser.GameObjects.Sprite{
    constructor(scene,x, y , targetY, initialX, initialY, aceleration, damage,scale){
        super(scene,x,y);
        this.targetY = targetY;
        this.aceleration = aceleration;
        this.damage = damage;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false; 
        this.body.setVelocity(initialX, initialY);
        this.body.setAcceleration(0, aceleration);
        this.time = 30;
        this.tint = 0xff8080;
        this.scale = scale;
        
        this.body.setSize(35,100);
        this.body.setOffset(25,60);
        this.rotation = Math.PI/2;
        
        this.play('fireBallAnimation');
        this.scene.time.delayedCall(this.time*1000, () => this.die());
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);

        if(this.alcanzado) return;
        if(this.body.velocity.y <= 10) return;
        if(this.y >= this.targetY){
            this.alcanzado = true;
            this.scene.physics.add.overlap(this, this.scene.player, (o1,o2)=>{
                o2.hurt(this.damage);
            })
            this.scale = this.scale*1.7;
            this.rotation = 0;
            this.tint = 0xffffff;
            this.play('fireColumnCreate');
            this.anims.chain('fireColumnIdle');
            this.body.setVelocity(0,0);
            this.body.setAcceleration(0,0);
        }
    }
    die(){
        this.play('fireColumnDie');
        this.scene.time.delayedCall(1100, () => this.destroy());
    }

    

}