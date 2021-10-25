  
 var trex;
 var trexAnimation;
 var ground;
 var chao;
 var chaoinvisivel;

 function preload(){
  trexAnimation= loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground= loadImage("ground2.png");
}

function setup(){
  createCanvas(600,200);
  trex= createSprite(100, 190, 89, 94) ;
  trex.addAnimation("running", trexAnimation);
  trex.scale= 0.7

  chao = createSprite(300, 180, 600, 26);
  chao.addImage(ground); 
  chaoinvisivel= createSprite(300, 190, 600, 10);
  chaoinvisivel.visible=false;
}

function draw(){
  background("white");
  chao.velocityX= -5
  if(keyDown("space") && trex.y > 152){
    trex.velocityY=-13
  }
  trex.velocityY=trex.velocityY +0.8
  if (chao.x < 0){
    chao.x= chao.width/2;
  } 
  trex.collide(chaoinvisivel);
  console.log(trex.y);
  drawSprites();
}

}
