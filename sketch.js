var score= 0;

var PLAY = 1;
var END = 0;
var gameState = "start";

var dog,bone,stone;
var over, overS;
var dogImg,boneImg,stoneImg;
var ground, invisibleGround;
var bonesGroup,stonesGroup;

function preload(){
  dogImg = loadImage("dog.png");
  boneImg = loadImage("bone.png");
  stoneImg = loadImage("stone.png");
  over = loadImage("over.jpg");
  
  // Sound
  DieS = loadSound("die.wav");
  EatS = loadSound("Eatbanana.wav");
}

function setup() {
  createCanvas(windowWidth-10,windowHeight-10);
  
  ground = createSprite(windowWidth/2,windowHeight-20,windowWidth,20);
  ground.shapeColor="brown";
  ground.visible = false;
  
  dog = createSprite(windowWidth-80,windowHeight-50,20,50);
  dog.addImage(dogImg);
  dog.scale =0.55;
  dog.visible = false;

  
  invisibleGround =  createSprite(windowWidth/2,windowHeight-10,windowWidth,20);
  invisibleGround.visible = false;
  
  overS = createSprite(windowWidth/2,windowHeight/2);
  overS.addImage(over);
  overS.scale = 0.6;
  overS.visible = false;
  
  bonesGroup = new Group();
  stonesGroup = new Group();
}

function draw() {
  if(gameState ===PLAY){
  background(255);
  } else if(gameState === "start"){
  background(0);
  }
  
  if(gameState === PLAY){
  dog.visible = true;
  ground.visible = true;
    spawnBones();
    spawnStones();
  }
  
  if(keyWentDown("space") && gameState === "start"){
  gameState = PLAY; 
  
  }
  if(gameState === END){
  overS.visible = true;
  }
   if(touches.length>0||keyWentDown("space") && dog.y > 430) {
      dog.velocityY = -20;
     touches = [];
    }
    dog.velocityY = dog.velocityY + 0.8;
  
    ground.velocityX =6;
  
    if (ground.x > 390){
      ground.x = ground.width/2;
    }
  
    if(gameState === END){
      dog.visible = false;
      ground.visible = false;
      background(0);
    }
  console.log(dog.y);
  
  dog.collide(invisibleGround);
    
  if(stonesGroup.isTouching(dog)){
  stonesGroup.destroyEach();
    gameState = END;
    DieS.play();
  }
    if(bonesGroup.isTouching(dog)){
    bonesGroup.destroyEach();
      EatS.play();
      score++;
    textSize(25);
    text("Bone eaten :) ", 350,40);
    //score = score + Math.round(getFrameRate()/60);
    }
  
    drawSprites();
  
  if(gameState === PLAY){
  textSize(30);
  textFont("Comic Sans MS");
  fill(0);
  text("Score : "+score,windowWidth/2-300,windowHeight/2-200)
  }   if(gameState === "start"){
  textSize(30);
  textFont("Comic Sans MS");
  fill(255);
    text("Instructions -",windowWidth/2-250,windowHeight/2-200);
    text("1. Press space to make the dog jump.",windowWidth/2-240,windowHeight/2-130);
    text("2. Collect as much bones as possible.",windowWidth/2-240,windowHeight/2-70);
    text("3. Avoid touching the stones.",windowWidth/2-240,windowHeight/2-10);
    fill("yellow");
    text("Press space to continue",windowWidth/2-200,windowHeight-200)
  }
}

function spawnBones() {
  //write code here to spawn the bones
  if (frameCount % 200 === 0) {
    bone = createSprite(windowWidth/2-300,windowHeight-45,40,10);
    bone.addImage(boneImg);
    bone.scale =0.1 ;
    bone.velocityX = 5;
    
    //assign lifetime to the variable
    bone.lifetime = 170;
    
    bonesGroup.add(bone);
  }
}

function spawnStones(){
  //code to spawn the bones
  if (frameCount % 250=== 0) {
    stone = createSprite(windowWidth/2-300,windowHeight-45,40,10);
    stone.addImage(stoneImg);
    stone.scale =0.02;
    stone.velocityX = random(5,8);
    
    //assign lifetime to the variable
    stone.lifetime = 180;
    stonesGroup.add(stone);
  }
}
