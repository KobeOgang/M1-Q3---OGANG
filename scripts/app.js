var config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 890,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var catcher, cat, cursors, textScore, score, winText;

function preload ()
{
    this.load.image('cat', '../assets/images/cat.png');
    this.load.image('ground', '../assets/images/ground.png');
    this.load.image('catcher', '../assets/images/catcher.png');
    this.load.image('sky', '../assets/images/sky.jpg');
}

function create ()
{
    //Background
    var sky = this.add.image(0, 0, 'sky');
    sky.setOrigin(0, 0);
    sky.setScale(config.width / sky.width, config.height / sky.height);

    //Ground
    var platforms = this.physics.add.staticGroup();
    platforms.create(950, 550, 'ground');
    //this.add.image(950, 550, 'ground');

    //Catcher
    catcher = this.physics.add.sprite(550,500, "catcher");
    catcher.setBounce(0);
    catcher.setCollideWorldBounds(true);

    //Cat
    cat = this.physics.add.sprite(1500,620, "cat");
    cat.setScale(0.5);

    //Controls
    cursors = this.input.keyboard.createCursorKeys();

    //Score
    score = 0;
    var style = {font: "50px Arial", fill: "#15d60b"};
    textScore = this.add.text(50, 50, "Score: " + score.toString(), style);

    //Win
    var style2 = { fontFamily: 'Arial', fontSize: 64, color: '#F58145' };
    winText = this.add.text(config.width / 2, 300, 'You Found the Gold! Well Done!', style2);
    winText.setOrigin(0.5);
    winText.setVisible(false);
}

function update ()
{
    //Movement
    if(cursors.left.isDown){
        catcher.x -= 5;
        catcher.flipX = true;
    }
    if(cursors.right.isDown){
        catcher.x += 5;
        catcher.flipX = false;
    }

    //Event
    this.physics.add.overlap(catcher, cat, winGame);
}

function winGame(){
    score += 999999;
    textScore.setText("Score: " + score);
    cat.disableBody(true, true);
    winText.setVisible(true);
}