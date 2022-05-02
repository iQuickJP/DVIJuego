import PasivePowerUpList from "./pasivos/pasivePowerUpList.js";

export default class Chest extends Phaser.GameObjects.Sprite{

    constructor(scene,player,x,y){
        super(scene,x,y,'chestUnopened');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.body.allowGravity = false;
        this.open = false;
        this.scene.physics.add.collider(this, this.player, () => {
            if(this.open) return;
            this.open = true;
            this.play('openChest')
            this.scene.time.delayedCall(600, () => {this.spawnPoweUp()})
            });
        
    }
    giveItem(){
        if(this.open) return;
        this.open = true;
        this.play('openChest')
        this.scene.time.delayedCall(600, () => {this.spawnPoweUp()})
    }
    

    spawnPoweUp(){
        const a = this.scene.powerUpList.extractPowerUp();
        new a(this.scene, this.player, this.x, this.y-30);
    }

    giveShopItem(){
        this.open = true;
        this.play('openChest')
        const a = this.scene.powerUpList.extractPowerUp();
        return new a(this.scene, this.player, this.x, this.y-30);
    }
}