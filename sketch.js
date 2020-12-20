var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacleGroup,cloudGroup;
var cloud, cloudsGroup, cloudImage;
var score;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameover,gameoverImage,restart,restartImage;
var newImage;
var jump,die,checkPoint;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkPoint=loadSound("checkPoint.mp3");
  
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}
function setup() {
  createCanvas(600, 200);

  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)

  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
 gameover=createSprite(300,100,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.5;
  
  restart=createSprite(300,140,10,10);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup=new Group();
  cloudGroup=new Group();
  
  console.log("Hello"+ 5)
  trex.debug=true;
  trex.setCollider("rectangle",0,0,4000,trex.height);
  score=0;
}

function draw() {
  background(180);
  
  text("Score:"+score,500,50);
  
  
  if(gameState===PLAY){
    spawnClouds();
  spawnObstacle();
    
     gameover.visible=false;
    restart.visible=false;
    
   if (ground.x < 0){
    ground.x = ground.width/2;}
  
    score=score+Math.round(frameCount/60)
    if(score>0&&score%200===0){
      checkPoint.play();
    }
    
    ground.velocityX = -(4+3*score/500);
    
     if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -10;
     jump.play();

  }
  trex.velocityY = trex.velocityY + 0.8
    
     
    
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
      die.play();
      //trex.velocityY=-10;
      //jump.play
    }
    
  }
  else if(gameState===END){
    gameover.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    trex.changeAnimation("collided",trex_collided);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.velocityY=0;
   
   
    
  }
  
  
  
  
  
  
  
  
  
  
  
 
  
  
  
 
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 134
    
    
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
    }
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
   var obstacle = createSprite(600,165,10,40);
 obstacle.velocityX=-(6+score/500);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
         case 2:obstacle.addImage(obstacle2);
        break;
         case 3:obstacle.addImage(obstacle3);
        break;
         case 4:obstacle.addImage(obstacle4);
        break;
         case 5:obstacle.addImage(obstacle5);
        break;
         case 6:obstacle.addImage(obstacle6);
        break;
        default:break;
        
        
    }
  obstacle.scale=0.5
    obstacle.lifetime=300;
  
  obstacleGroup.add(obstacle);
  
  }
  
}




