function Player(game){
    this.game = game;
    this.sprite = null;
}

Player.prototype.create = function () {
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'sprites', 'player');
    this.game.physics.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.body.setSize(15,15);
    this.player.body.bounce.set(0.5);
    
    this.playerSpeed = 120;
    
    //the camera will follow the player in the world
    this.game.camera.follow(this.player);
    
    this.createEmitterDeath();

    this.game.input.addPointer();
}

Player.prototype.update = function() {
    
    this.playerMovement();

}

Player.prototype.playerMovement = function(){
    if(this.game.input.activePointer.isDown){  
        //move on the direction of the input
        this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
        this.game.physics.arcade.velocityFromAngle(this.player.angle, 150, this.player.body.velocity);
        
    }
}

Player.prototype.createEmitterDeath = function() {
    this.emitterDeath = this.game.add.emitter(0, 0, 100);
    this.emitterDeath.makeParticles('sprites', 'deathParticle');
    this.emitterDeath.gravity = 0;
    this.emitterDeath.setAlpha(0.3, 0.8);
    this.emitterDeath.setScale(0.3, 1);
    
    this.emitterExplosion = this.game.add.emitter(0, 0, 100);
    this.emitterExplosion.makeParticles('sprites', 'deathExplosionParticle');
    this.emitterExplosion.gravity = 0;
    this.emitterExplosion.setAlpha(0.3, 0.5);
    this.emitterExplosion.setScale(0.1, 1);
    
}

Player.prototype.playerHit = function(player, bullet) {
    
    this.emitterDeath.x = player.x;
    this.emitterDeath.y = player.y;
    this.emitterDeath.start(true, 1000, null, 40);
    
    this.emitterExplosion.x = player.x;
    this.emitterExplosion.y = player.y;
    this.emitterExplosion.start(true, 1000, null, 40);
    
    this.player.kill();
    gameHelper.setDeathTimer();
}

Player.prototype.getPlayer = function() {
    return this.player;
}

Player.prototype.getBullets = function() {
    return this.bullets;   
}

Player.prototype.getGhost = function() { 
    return false;
}

Player.prototype.getAlive = function() {
    return this.player.alive;
}

Player.prototype.setBulletType = function(value) {
    
    if (this.bulletType < 2) {
        this.bulletType += value; 
    }
}

Player.prototype.destroy = function() {
    this.player.destroy();   
}