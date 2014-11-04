SpaceThing.Preloader = function (game) {

    
};

SpaceThing.Preloader.prototype = {
    
    preload: function() {
        
        //create loading progress bar etc
        this.preloadBar = this.add.sprite(90, 210, 'loadingBar');
        this.load.setPreloadSprite(this.preloadBar);
        this.loadingText = this.game.add.bitmapText(90, 190, 'font', 'LOADING...', 14);
        
        
        //preload the assets
        this.load.atlas('sprites', 'assets/sprites.png', 'assets/sprites.json');
        this.load.image('btnMenu', 'assets/menuButton.png');
        
        this.load.bitmapFont('font', 'assets/font.png', 'assets/font.json');
    },
    
    create: function() {
    
    },

    update: function() {
        
        this.state.start('MainMenu');
    },
    
    
};