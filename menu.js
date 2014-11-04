var level;

SpaceThing.MainMenu = function (game){

};

SpaceThing.MainMenu.prototype = {

    create: function () {
        this.bgTile = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sprites', 'blue');
        
        this.headingText = this.game.add.bitmapText(150, 30, 'font' , 'SELECT A LEVEL', 18);
        
        this.btn1 = this.game.add.button(100, 90, 'btnMenu', this.lvl1, this);
        this.btn2 = this.game.add.button(280, 90, 'btnMenu', this.lvl2, this);
        this.btn3 = this.game.add.button(100, 150, 'btnMenu', this.lvl3, this);
        this.btn4 = this.game.add.button(280, 150, 'btnMenu', this.lvl4, this);
        this.btn5 = this.game.add.button(190, 210, 'btnMenu', this.lvl5, this);
        
        this.game.add.bitmapText(145, 110, 'font' , '1', 18);
        this.game.add.bitmapText(320, 110, 'font' , '2', 18);
        this.game.add.bitmapText(145, 170, 'font' , '3', 18);
        this.game.add.bitmapText(320, 170, 'font' , '4', 18);
        this.game.add.bitmapText(230, 230, 'font' , '5', 18);
        
    },

    update: function (){
        
    },
    
    startGame: function(){
        this.state.start('Game');   
    },
    
    lvl1: function(){
        
        level = 1;
        this.startGame();   
    },
    
    lvl2: function(){
        
        level = 2;
        this.startGame();   
    },
    
     lvl3: function(){
        
        level = 3;
        this.startGame();   
    },
    
    lvl4: function(){
        
        level = 4;
        this.startGame();   
    },
    
    lvl5: function(){
        
        level = 5;
        this.startGame();   
    },
    
};