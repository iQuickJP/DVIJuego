export default class Minimap extends Phaser.GameObjects.Container {
    constructor(scene, x, y, levels, grid, visionPower) {
        super(scene, x, y)
        this.rectSize = 30;
        this.offset = 10;
        this.horizontalSize = 250;
        this.verticalSize = 250;
        this.createMinimapInterior(levels, grid, visionPower, false);
        this.scene.add.existing(this);
        this.scene.cameras.cameras[0].ignore(this);
        this.minimapCam = this.scene.cameras.add(x, y, this.horizontalSize, this.verticalSize);
        this.x += this.horizontalSize / 2;
        this.y += this.verticalSize / 2;
        this.setDepth(6);
        this.minimapCam.setScroll(x, y);
        this.setVisibility(false);

    }

    restart(levels, grid, visionPower) {
        this.removeAll(true);
        this.createMinimapInterior(levels, grid, visionPower, true);
    }


    createMinimapInterior(levels, grid, visionPower, alreadyCreated) {

        levels.forEach(element => {
            if (!visionPower) {
                if (!element.reached) return;
            }
            this.createRectangle(element.grid.x, element.grid.y, element.doors, element.iden, grid, element.cleared, alreadyCreated);
        });
    }


    createRectangle(x, y, doors, iden, grid, cleared, alreadyCreated) {
        let color = 0x656565;
        if (x == grid.x && y == grid.y) {
            color = 0xffffff;
            if (!alreadyCreated) {
                this.x = this.x - x * (this.rectSize + this.offset);
                this.y = this.y - y * (this.rectSize + this.offset);
            }
            if (iden == 'Chest') {
                color = 0xffff00;
            }
        }
        else if (iden == 'Chest') {
            if (cleared)
                color = 0xb0b000;
        }
        else if (cleared) {
            color = 0x959595;
        }
        if (iden == 'Boss') {
            color = 0xff0000;
        }

        let rectangle = new Phaser.GameObjects.Rectangle(this.scene, x * (this.rectSize + this.offset), y * (this.rectSize + this.offset), this.rectSize, this.rectSize, color);
        this.add(rectangle);

        if (doors.north) {
            rectangle = new Phaser.GameObjects.Rectangle(this.scene, x * (this.rectSize + this.offset), y * (this.rectSize + this.offset) - (this.rectSize / 2) - this.offset / 8, this.offset, this.offset / 2, 0x0);
            this.add(rectangle);
        }

        if (doors.south) {
            rectangle = new Phaser.GameObjects.Rectangle(this.scene, x * (this.rectSize + this.offset), y * (this.rectSize + this.offset) + (this.rectSize / 2) + this.offset / 4, this.offset, this.offset / 2, 0x0);
            this.add(rectangle);
        }
        if (doors.west) {

            rectangle = new Phaser.GameObjects.Rectangle(this.scene, x * (this.rectSize + this.offset) - (this.rectSize / 2) - this.offset / 8, y * (this.rectSize + this.offset), this.offset / 2, this.offset, 0x0);
            this.add(rectangle);
        }
        if (doors.east) {
            rectangle = new Phaser.GameObjects.Rectangle(this.scene, x * (this.rectSize + this.offset) + (this.rectSize / 2) + this.offset / 4, y * (this.rectSize + this.offset), this.offset / 2, this.offset, 0x0);
            this.add(rectangle);
        }
    }

    setVisibility(cond){
        this.minimapCam.visible = cond;
    }
    
}