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
  trex= createSprite(100, 101, 89, 94) ;
  trex.addAnimation("running", trexAnimation);
  trex.scale= 0.7

  chao = createSprite(300, 100, 600, 26);
  chao.addImage(ground);
}

function draw(){
  background("white");
  chao.velocityX= -5
  trex.collide(chao)
  if(keyDown("space")){
    trex.velocityY= -3
  }

  drawSprites();
}
