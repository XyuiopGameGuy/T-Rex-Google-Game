  var trex;
 var trexAnimation;
 var ground;
 var chao;

 function preload(){
  trexAnimation= loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground= loadImage("ground2.png");
}

function setup(){
  createCanvas(600,200);
  trex= createSprite(100, 200, 89, 94) ;
  trex.addAnimation("running", trexAnimation);
  trex.scale= 0.7

  chao = createSprite(300, 200, 600, 26);
  chao.addImage(ground);
}

function draw(){
  background("white");
  chao.velocityX= -5
  if(keyDown("space")){
    trex.velocityY=-0.8
    trex.velocityY=0.8
  }
  trex.velocityY = trex.velocityY = +0.8
  if (chao.x < 0){
    chao.x= chao.width/2;
  } 
  trex.collide(chao)
  drawSprites();
}
