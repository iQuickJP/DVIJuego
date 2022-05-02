import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class moleVariante extends EnemyParent{
  
 
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'moleStand');
    this.a = 1000;
    this.v = 50;
   this.sprite.tint = 0x00ff00
   this.body.offset.x = 15;
   this.body.offset.y = 10;
   this.body.setSize(this.body.width * 0.8, this.body.height * 0.8);
  }
  
  moveU(t,dt){
  
    this.sprite.play("mole",true);
    //this.sprite.preUpdate(t,dt);
    this.prediceA(t,dt)
  }
  
  
  resbala(){
    this.a = 700
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    let x = -this.body.velocity.x/600;
    let y = -this.body.velocity.y/600;
    this.body.setAcceleration(dx*this.a/t+x*this.a,dy*this.a/t+y*this.a);    
    this.body.setMaxVelocity(400,400);
    this.body.setBounce(1,1);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
        
      

  }

  prediceA(ti,dt){
    
    let dx = this.player.x+this.player.body.velocity.x*dt/10 - this.x;
    let dy = this.player.y+this.player.body.velocity.y*dt/10 - this.y;

    let t = new Phaser.Math.Vector2(dx,dy).normalize().scale(this.a);
    
    let x = -this.body.velocity.x/600;
    let y = -this.body.velocity.y/600;
    this.body.setAcceleration(t.x+x*this.a,t.y+y*this.a);
    let dirx = this.player.x - this.x;
    this.body.setMaxVelocity(300,300);
    this.body.setBounce(1,1);
    if(dirx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
  }

  prediceV(ti,dt){
    this.a = 200;
    let dx = this.player.x+this.player.body.velocity.x*dt/2 - this.x;
    let dy = this.player.y+this.player.body.velocity.y*dt/2 - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    
    this.body.setVelocity(dx*this.a/t,dy*this.a/t);
    
    this.body.setMaxVelocity(300,300);
    this.body.setBounce(1,1);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
  }

  copia(){
    this.body.setVelocity(this.player.body.velocity.x,this.player.body.velocity.y);
    let dx = this.player.body.velocity.x;
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }

  }

  invierte(){
    let dx = -this.player.body.velocity.x;
    this.body.setVelocity(-this.player.body.velocity.x,-this.player.body.velocity.y);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
  }
}