function WorldHelper(game){
    this.game = game;
}

WorldHelper.prototype.getWorldX = function(value) {

    switch(value) {
        case 5:
            return 1680;
        case 4:
            return 1240;
        case 3:
            return 1000;
        case 2:
            return 800;
        default:
            return 640;
    }
}

WorldHelper.prototype.getWorldY = function(value) {
        
    switch(value) {
        case 5:
            return 1680;
        case 4:
            return 1240;
        case 3:
            return 1000;
        case 2:
            return 800;
        default:
            return 640;
    } 
}


WorldHelper.prototype.getNumAsteroids = function(value) {
    switch(value) {
        case 5:
            return 100;
        case 4:
            return 50;
        case 3:
            return 30;
        case 2:
            return 20;
        default:
            return 10;
    }
}

WorldHelper.prototype.getNumCollectables = function(value) {
    switch(value) {
        case 5:
            return 100;
        case 4:
            return 50;
        case 3:
            return 30;
        case 2:
            return 20;
        default:
            return 10;
    }
}

WorldHelper.prototype.createBackground = function(value) {
    
    switch(value) {
        case 5:
            this.bgTileName = 'black';
            break;
        case 4:
            this.bgTileName = 'purple';
            break;
        case 3:
            this.bgTileName = 'darkPurple';
            break;
        case 2:
            this.bgTileName = 'blue';
            break;
        default:
            this.bgTileName = 'black';
    }
    
    this.bgTile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sprites', this.bgTileName);
}
