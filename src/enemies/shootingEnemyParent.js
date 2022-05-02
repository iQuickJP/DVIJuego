import Basic_projectile from '../proyectile/basic_projectile.js';
import EnemyParent from './enemyParent.js';

export default class ShootingEnemyParent extends EnemyParent{
  
  constructor(scene, player, x, y, texture) {
    super(scene,player,x,y, texture);
    this.cont = 0;
    
   
    this.shootTime = 5;
    this.Pv = 1000; //Projectile speed
    this.createGropus();
    this.projectileDamage = 1
  }


  fire(){
    const disparo = this.creador();
    this.addtoGroups(disparo);
    }
  
  creador(){
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    return new Basic_projectile(this.scene,this.centerX() , this.centerY(),'flecha',dx*this.Pv/t,dy*this.Pv/t, 10, this.projectileDamage);
  }


  addtoGroups(disparo){
    this.wallCollGroup.add(disparo);
    this.scene.projectiles.add(disparo);
  }

  attack(t,dt){
      if (this.cont === 0){
        this.fire();
      }
      this.cont+=dt;
      if(this.cont >= this.shootTime*1000){
            this.cont = 0;
      }
   }
  
  
  createGropus(){
    this.wallCollGroup = this.scene.add.group();
    this.scene.physics.add.collider(this.wallCollGroup, this.scene.wallLayer, (o1,o2) => {
      o1.destroy();
    });
     this.scene.physics.add.collider(this.wallCollGroup, this.scene.voidLayer, (o1,o2) => {
      o1.destroy();
    });

    this.playerOverlapGroup = this.scene.add.group();
    this.scene.physics.add.overlap(this.playerOverlapGroup, this.player, (o1,o2) => {
      o2.hurt(this.damage);
      });
  }
}