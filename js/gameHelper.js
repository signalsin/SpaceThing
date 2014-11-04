var player;
var collectable;
var worldHelper;


function GameHelper(game){
    this.game = game;
    
    player = new Player(game);
    collectable = new Collectable(game);
    worldHelper = new WorldHelper(game);
}


GameHelper.prototype.create = function () {
    //enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //set the world bounds
    this.game.world.setBounds(0, 0, worldHelper.getWorldX(level), worldHelper.getWorldY(level));
    
    this.gameStarted = false;
    this.levelComplete = false;
    
    //enemies.create();
    worldHelper.createBackground(level);
    collectable.create(worldHelper.getNumCollectables(level));
    
    this.createAsteroids();
    
    player.create();
    
    this.createScoreText();
    
    if (this.game.device.desktop){
        this.startText = this.game.add.bitmapText(170, 130, 'font' , 'CLICK TO START', 14);
    }
    else {
        this.startText = this.game.add.bitmapText(170, 130, 'font' , 'TOUCH TO START', 14);
    }
    this.startText.fixedToCamera = true;
}

GameHelper.prototype.update = function (){
    
    if (this.levelComplete) {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('MainMenu');
        }
    }
    else {
        //check if the game hasn't been started
        if (!this.gameStarted) {
            //if the game hasn't started, only check for first touch
            if (this.game.input.activePointer.isDown) {
                this.startText.destroy();
                this.gameStarted = true;
            }
        }
        else if (collectable.getNumCollectables() == 0 || this.levelComplete){
            this.levelComplete = true;
            if (this.game.device.desktop){
                this.endText = this.game.add.bitmapText(170, 130, 'font' , 'LEVEL COMPLETE\nCLICK TO GO BACK TO MENU', 14);
            }
            else {
                this.endText = this.game.add.bitmapText(170, 130, 'font' , 'LEVEL COMPLETE\nTOUCH TO GO BACK TO MENU', 14);
            }
            this.endText.fixedToCamera = true;
            this.endText.align = 'center';
            this.asteroids.destroy();
            player.destroy();


        }
        else {
            //if the death timer has expired, launch the game over menu
            if (this.deathTimer && (this.deathTimer < this.game.time.now)) {
                this.deathTimer = null;
                this.gameOver();
            }
            else { //otherwise update the game
                player.update();

            }

            this.checkCollisions(); 
        }   
    }
}

GameHelper.prototype.checkCollisions = function(){
    
    //asteroids with themselves
    this.game.physics.arcade.collide(this.asteroids);
    
    //player and collectable
    this.game.physics.arcade.overlap(player.getPlayer(), collectable.getCollectables(), this.pickupCollectable, null, this);
    
    //player and asteroid
    this.game.physics.arcade.overlap(player.getPlayer(), this.asteroids, player.playerHit, null, player);
    
}

GameHelper.prototype.createAsteroids = function() {
     this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numAsteroids = worldHelper.getNumAsteroids(level);
    var asteriod;

    for (var i = 0; i < numAsteroids; i++) {
        //add sprite
        //alternate between the two asteroid sprites
        if (i % 2 == 0){
            asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'sprites', 'asteroid_1');
        }
        else{
            asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'sprites', 'asteroid_2');
        }
        
        asteroid.scale.setTo(this.game.rnd.integerInRange(0, 10)/10);

        //physics properties
        asteroid.body.velocity.x = this.game.rnd.integerInRange(-30, 30);
        asteroid.body.velocity.y = this.game.rnd.integerInRange(-30, 30);
        asteroid.body.setSize(asteroid.body.width * 0.9, asteroid.body.height * 0.9);
        asteroid.body.immovable = true;
        asteroid.anchor.setTo(0.5, 0.5);
        asteroid.body.angularVelocity = this.game.rnd.integerInRange(-50, 50);
    }
    this.asteroids.setAll('anchor.x', 0.5);
    this.asteroids.setAll('anchor.y', 0.5);
    this.asteroids.setAll('body.collideWorldBounds', true);
	this.asteroids.setAll('body.bounce.x', 1);
	this.asteroids.setAll('body.bounce.y', 1);
	this.asteroids.setAll('body.minBounceVelocity', 0);
    this.asteroids.setAll('autocull', true);
}

GameHelper.prototype.createScoreText = function (){
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(5, 5, 'font' , worldHelper.getNumCollectables(level).toString(), 14);
    this.scoreText.fixedToCamera = true;
}

GameHelper.prototype.addToScore = function (reward){
    this.score += reward;
    this.scoreText.text = this.score;
}

GameHelper.prototype.spawnPowerup = function (x, y, dropRate){
    if (this.game.rnd.frac() < dropRate) {
        powerup.create(x, y);
    }
}

GameHelper.prototype.gameOver = function () {
    this.game.state.start('MainMenu');
}

GameHelper.prototype.pickupCollectable = function(player, item) {
    item.destroy();
    collectable.pickupCollectable(item.x, item.y);
    this.scoreText.text = collectable.getNumCollectables().toString();
}

GameHelper.prototype.restart = function() {
    //restart this state
    this.game.state.restart();   
}

GameHelper.prototype.getPlayer = function(){
    return player.getPlayer();
}

GameHelper.prototype.setDeathTimer = function(){
    this.deathTimer = this.game.time.now + 5000;   
}

GameHelper.prototype.setBulletType = function(value){
    player.setBulletType(value);
}