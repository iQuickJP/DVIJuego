import Basic_projectile from "./basic_projectile.js";

export default class wizardProjectile extends Basic_projectile{
    constructor(scene,x,y,vx,vy,time,damage, type, velocity){
        super(scene,x,y,'',vx,vy,time,damage);
        this.cont = 4000;
        // this.setOrigin(0.5,0.5);
        this.doEffect = (dt) => {};
        this.velocity = velocity;
        if(type == 0){
            this.play('boltFire');
            this.tint = 0xff0000;
            this.flipX = true;
            this.body.setSize(20,20);
            this.body.setOffset(25,15);
        }
        else if(type == 1){
            this.cont = -2000;
            this.play('magicBallAnimation');
            this.doEffect = this.doHoming;
            this.setSize(100, 100)
           
            //this.setOrigin(1)
            this.body.setOffset(20, -20)
            
             this.body.setSize(35,35);
             this.body.setOffset(35,35);
            
            
        }
        else if(type == 2){
            this.cont = -2500;
            this.play('magicBallAnimation');
            this.doEffect = this.doHomingOnce;
             this.body.setSize(35,35);
             this.body.setOffset(35,35);
            // this.setOrigin(0)    
        }
        
    }


    preUpdate(t,dt){
        this.doEffect(dt);
        super.preUpdate(t,dt);
    }

    doHoming(dt){
        if(this.cont < 0){
            this.cont+= dt;
            if(this.cont >= 0){
               this.cont = 2000;
            }
            return;
        }
        if (this.cont >= 2500) {
            this.playerVector = new Phaser.Math.Vector2(this.scene.player.x - this.x, this.scene.player.y - this.y).normalize().scale(this.velocity);
            this.cont = 0;
        }
        else if (this.cont < 2000){
            this.cont+=dt;
            this.body.setVelocity(this.playerVector.x,this.playerVector.y);
        }
        else{
            this.body.setVelocity(0,0);
            this.cont+= dt
        }
    }
    

    doHomingOnce(dt){
        if(this.cont < 0){
            this.cont+= dt;
            if(this.cont >= 0){
               this.cont = 2000;
            }
            return;
        }
        if (this.cont >= 2500) {
            this.playerVector = new Phaser.Math.Vector2(this.scene.player.x - this.x, this.scene.player.y - this.y).normalize().scale(this.velocity);
            this.cont = 0;
        }
        else if (this.cont < 2000){
            this.cont+=dt;
            this.body.setVelocity(this.playerVector.x*2,this.playerVector.y*2);
            this.doEffect = ()=>{};
        }
        else{
            this.body.setVelocity(0,0);
            this.cont+= dt
        }
    }

}