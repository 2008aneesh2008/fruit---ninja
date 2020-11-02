var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,randoms,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var gameOverSound,knifeSound

function preload(){
  
  swordImage = loadImage("sword.png");
monsterImage=loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3")
  knifeSound =loadSound("knifeSwooshSound.mp3")
}



function setup() {
  createCanvas(1000, 600);
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.5
  
  
  
  sword.setCollider("rectangle",0,0,50,50);

  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("gold");
  
  if(gameState===PLAY){
  
    fruits();
    Enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score+5;
      
    }
    else
    {
     
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        gameOverSound.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
         
      
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  
  text("Score : "+ score,300,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(1000,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=80;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%70===0){
    fruit=createSprite(1000,200,30,20);
    fruit.scale=0.2;
     
     randoms=Math.round(random(1,4));
    if (randoms == 1) {
      fruit.addImage(fruit1);
    } else if (randoms == 2) {
      fruit.addImage(fruit2);
    } else if (randoms == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}