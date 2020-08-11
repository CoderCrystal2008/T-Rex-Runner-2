var trex, trex_collided, trex_running;
var ground, invisibleGround, groundImage;
var cloudImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var count = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obstacleGroup, cloudGroup;

var gameOver,gameOverImg;
var restart,restartImg;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadAnimation("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 160, 10, 10);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 10);
  ground.addAnimation("groundImage", groundImage);

  invisibleGround = createSprite(200, 190, 400, 5);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  //place gameOver and restart icon on the screen
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addAnimation("gameOver",gameOverImg);
  gameOver.scale = 0.5;
  restart.addAnimation("restart",restartImg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(255);

  if(gameState===PLAY){
    ground.velocityX = -6;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 164) {
      trex.velocityY = -10;
    }
    
    //adds gravity
    trex.velocityY = trex.velocityY + 0.8;

    //calls spawnClouds
    spawnClouds();

    //calls spawnObstacles
    spawnObstacles();

    count = count+Math.round(getFrameRate()/20);
    
    if(trex.isTouching(obstacleGroup)){
      gameState = END;
    }
    
    
  }else if (gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  

 

  
  
  //set text
  textSize(18);
  textFont("Georgia");
  
  //scoring
   
  text("Score: "+ count, 390,50);
  
  


  trex.collide(invisibleGround);
  console.log(trex.y);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addAnimation("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adds clouds to cloud group
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2 : 
        obstacle.addImage(obstacle2);
        break;
      case 3 : 
        obstacle.addImage(obstacle3);
        break;
      case 4: 
        obstacle.addImage(obstacle4);
        break;
      case 5 : 
        obstacle.addImage(obstacle5);
        break;
      case 6 : 
        obstacle.addImage(obstacle6);
        break;
      default:
        break;


    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}