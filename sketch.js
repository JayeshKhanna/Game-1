var mario,mario1,road,road1,cloud1,e1,e2,b,b1,bricksG,PLAY=0,END=1,gameState=PLAY,obGroup,cloudG,iline
function preload()
{
mario=loadAnimation("sprite_mario2.png","sprite_mario1.png",
  "sprite_mario0.png")
  road=loadImage("road1.png")
  cloud1=loadImage("sprite_clouds0.png")
 e1=loadAnimation("e1.png","e2.png")
  e2=loadAnimation("e5.png","e7.png","e8.png")
  b=loadImage("sprite_brick0.png")
}
function setup(){
  createCanvas(600,200);
  mario1=createSprite(50,160,10,10)
  mario1.addAnimation("m",mario)
  mario1.scale=0.1
  road1=createSprite(300,190,50,50)
  road1.addImage("r",road)
  road1.scale=1.3
  bricksG=createGroup()
  obGroup=createGroup()
  cloudG=createGroup()
  iline=createSprite(500,100,600,10)
  iline.visible=false
}

function draw()
{
  background("black")
  if(gameState===PLAY)
  {
  if(keyDown("space"))
  {   
   mario1.velocityY=-10
  } 
  mario1.velocityY=mario1.velocityY+0.5
   road1.velocityX=-7 
  if(road1.x<0)
  {
  road1.x=road1.width/2
  }
  if(keyDown("right"))
  {
  mario1.velocityX=5
  }
  if(keyWentUp("right"))
  {
  mario1.velocityX=0
  }
  if(keyDown("left"))
  {
   mario1.velocityX=-5 
  }
   if(keyWentUp("left")) 
   {
   mario1.velocityX=0  
   } 
   if(mario1.isTouching(obGroup)) 
   {
    gameState=END
     mario1.velocityY=-2
   }
  spawnClouds()
mario1.collide(road1)
  spawnEnemy()
   bricks()
  }
 else if(gameState===END)
  {
  mario1.velocityX=0 
  //mario1.velocityY=-12
  mario1.bounceOff(iline)
  mario1.velocityY=mario1.velocityY+6
  road1.velocityX=0 
  obGroup.setVelocityXEach(0) 
  cloudG.setVelocityXEach(0) 
  bricksG.setVelocityXEach(0)
  }
  mario1.collide(bricksG)
 drawSprites()
}
function spawnClouds()
{
  if(frameCount%60===0)
  {
var cloud=createSprite(600,50,10,10)
cloud.addImage("c",cloud1)
cloud.velocityX=-8
cloud.scale=0.1
  cloud.y=random(20,100)
mario1.depth=cloud.depth+1
 cloudG.add(cloud)
  }
}
function spawnEnemy()
{
if(frameCount%40===0) 
{
var ene=createSprite(600,160,50,50)
ene.velocityX=-7
var r1=Math.round(random(1,2))
switch(r1)
{
  case 1:ene.addAnimation("h",e1)
  ene.scale=0.8
  break;
  case 2:ene.addAnimation("k",e2)
  ene.scale=1.3
  break;
  default: break;
}
  obGroup.add(ene)
}
}
function bricks()
{
if(frameCount%90===0)
{
b1=createSprite(600,100,50,50)
b1.addImage("bk",b)
b1.velocityX=-7
b1.scale=0.01
var r2=Math.round(random(10,100))
b1.y=r2
bricksG.add(b1)
}
}








