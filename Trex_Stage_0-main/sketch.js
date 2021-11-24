 //criando variaveis
 var trexsurprised;
 var trex; 
 var trexAnime;
 var ground;
 var chao;
 var chaoinvisivel;
 var nuvem;
 var PLAYGAME = 1;
 var ENDGAME = 0;
 var gamestate = PLAYGAME;
 var cloudgroup;
 var obstaclegroup;

 // carregando animacoes
 function preload(){
  trexAnime= loadAnimation("trex1.png", "trex3.png", "trex4.png");

  trexsurprised= loadAnimation("trex_collided.png");

  ground= loadImage("ground2.png");

  nuvem= loadImage("cloud.png");

  obstaculo1= loadImage("obstacle1.png");

  obstaculo2= loadImage("obstacle2.png");

  obstaculo3= loadImage("obstacle3.png");

  obstaculo4= loadImage("obstacle4.png");

  obstaculo5= loadImage("obstacle5.png");

  obstaculo6= loadImage("obstacle6.png");
}
// criando os sprites 
function setup(){
  createCanvas(600,200);

  trex= createSprite(100, 190, 89, 94) ;

  trex.addAnimation("running", trexAnime);

  trex.addAnimation("shocked", trexsurprised);
  
  trex.scale= 0.7

  trex.setCollider("circle", 0, 0, 40);
  trex.debug= true;

  chao = createSprite(300, 180, 600, 26);

  chao.addImage(ground);

  chaoinvisivel= createSprite(300, 190, 600, 10);

  chaoinvisivel.visible=false;

  var rand =  Math.round(random(1,100))
  console.log(rand)

  cloudgroup= new Group();
  obstaclegroup= new Group();
}

function draw(){
  background("white");

  //console.log(frameCount);

  if (gamestate == PLAYGAME){
    spawnClouds();
    createObstacles();
  
    if (chao.x < 0){
      chao.x= chao.width/2;
    } 

    chao.velocityX= -10

    if(keyDown("space") && trex.y > 152){
      trex.velocityY=-13
    }
    trex.velocityY=trex.velocityY +0.8
    console.log(trex.y);
    
    if (trex.isTouching (obstaclegroup)){
      gamestate = ENDGAME;
   }
  }
    else if (gamestate == ENDGAME) {
      trex.changeAnimation("shocked", trexsurprised);
      chao.velocityX= 0;
      trex.velocityY= 0;
      obstaclegroup.setLifetimeEach(-1);
      obstaclegroup.setVelocityXEach(0);
      cloudgroup.setLifetimeEach(-1);
      cloudgroup.setVelocityXEach(0);
    }
    // trex collidindo com o chaoinvisivel 
    trex.collide(chaoinvisivel);
    drawSprites();
}

function spawnClouds(){
  if (frameCount %60 == 0){
   cloud=createSprite(600,100,40,10);
   cloudgroup.add(cloud);
   cloud.addImage(nuvem);
   cloud.y= Math.round(random(10, 60));
   cloud.scale= 0.7;
   cloud.velocityX=-3;
   cloud.lifetime= 300;
   cloud.depth = trex.depth;
   trex.depth = trex.depth + 1
}
 }

function createObstacles(){
  if (frameCount %80 == 0) {
   obstaculo= createSprite(600, 160, 50, 50);
   obstaculo.velocityX= -10;
   var randObstacle= Math.round(random(1, 6));
   obstaculo.scale = 0.8;
   obstaculo.lifetime= 300;
   obstaclegroup.add(obstaculo);

   switch(randObstacle){
   case 1: obstaculo.addImage(obstaculo1);
   break;
   case 2: obstaculo.addImage(obstaculo2);
   break;
   case 3: obstaculo.addImage(obstaculo3);
   break;
   case 4: obstaculo.addImage(obstaculo4);
   break;
   case 5: obstaculo.addImage(obstaculo5);
   break;
   case 6: obstaculo.addImage(obstaculo6);
   default: break;
  }
}
}
