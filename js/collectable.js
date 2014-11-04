function Collectable(game) {
    this.game = game;
}

Collectable.prototype.create = function(numCollectables) {
    
    this.collectables = this.game.add.group();
    this.numCollectables = numCollectables;

    //enable physics in them
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;
    
    var collectable;

    for (var i = 0; i < this.numCollectables; i++) {
        //add sprite
        collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'sprites', 'ruby_1');
        collectable.animations.add('default', ['ruby_1', 'ruby_2', 'ruby_3', 'ruby_4', 'ruby_5', 'ruby_6', 'ruby_7']);
        collectable.animations.play('default', this.game.rnd.integerInRange(5, 30), true);
    }
    
    //create particle when collected
    this.emitterExplosion = this.game.add.emitter(0, 0, 50);
    this.emitterExplosion.makeParticles('sprites','deathExplosionParticle');
    this.emitterExplosion.gravity = 0;
    this.emitterExplosion.setAlpha(0.3, 0.5);
    this.emitterExplosion.setScale(0.1, 0.5);
    
}

Collectable.prototype.update = function() {
    
}

Collectable.prototype.pickupCollectable = function(x, y){
    this.numCollectables -= 1;
    this.emitterExplosion.x = x;
    this.emitterExplosion.y = y;
    this.emitterExplosion.start(true, 300, null, 10);
}

Collectable.prototype.getNumCollectables = function(){
    return this.numCollectables;   
}

Collectable.prototype.getCollectables = function(){
    return this.collectables;   
}