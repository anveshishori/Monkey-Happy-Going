
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var food, stone;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (600,600);
  
  monkey = createSprite(150,550, 20,20);
  monkey.addAnimation("bandar",monkey_running);
  monkey.addAnimation( "takkar",monkey_collided);
  monkey.scale = 0.1
  
  ground = createSprite(300,570,1200,20);
  ground.velocityX = -3;
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
background("white")
  
  console.log (frameRate());
  
   if(ground.x<0){
    ground.x = ground.width/2;
    
  }
 
  if (gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
 
  
    
  if(keyDown("space")){
  monkey.velocityY = -15;
  }
      
    appearfood();
    appearobstacle();
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  else if (gameState === END){
 
   ground.velocityX = 0;
    monkey.velocityY = 0;
   
   foodGroup.destroyEach()
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);

   foodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);

   monkey.changeAnimation("takkar", monkey_collided);
   

 
  }
  monkey.collide(ground);
  drawSprites();
  
  fill("black");
  textSize (20);
  text ("Survival Time:" + score, 200, 50);
  
}

function appearfood(){
   if (frameCount % 80 ===0){
     food = createSprite(600,100,20,20);
     food.addImage("kela",bananaImage);
     food.y = Math.round(random(120,200))
     food.velocityX = -5;
     food.scale = 0.1;
     
     food.lifetime = 300;
     food.depth = monkey.depth;
     monkey.depth = monkey.depth + 1;
     foodGroup.add(food);
     
   }
  
  
  
  
}

function appearobstacle(){
   if (frameCount % 300 ===0){
     stone = createSprite(800,550,20,20);
     stone.addImage("stone",obstacleImage);
     stone.velocityX = -5;
     stone.scale = 0.2;
     
     stone.lifetime = 400;
     
     obstacleGroup.add(stone);
   }
  
  
  
  
}




