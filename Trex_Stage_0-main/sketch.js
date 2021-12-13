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
 var checkpoint;
 var die;
 var jump;
 var score = 0;
 var gameover;
 var restart;
 var gameoverimg;
 var restartimg;

 // carregando animacoes
 function preload(){
  checkpoint = loadSound("checkpoint.mp3");

  gameoverimg = loadImage("gameOver.png");

  restartimg = loadImage("restart.png")

  die = loadSound("die.mp3");

  jump = loadSound("jump.mp3");

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
  createCanvas(windowWidth,windowHeight);

  restart = createSprite(width/2, height-550, 75, 64);

  restart.visible=false;

  restart.scale=0.5;

  restart.addImage(restartimg);

  gameover = createSprite(width/2, height-300, 381, 21);

  gameover.addImage(gameoverimg);

  gameover.visible=false;

  gameover.scale=0.5

  trex= createSprite(100, 190, 89, 94) ;

  trex.addAnimation("running", trexAnime);

  trex.addAnimation("shocked", trexsurprised);
  
  trex.scale= 0.7

  trex.setCollider("circle", 0, 0, 40);
  trex.debug= true;

  chao = createSprite(width/2, height-480, 600, 26);

  chao.addImage(ground);

  chao.scale=1.5;

  chaoinvisivel= createSprite(300, 190, 600, 10);

  chaoinvisivel.visible=false;

  var rand =  Math.round(random(1,100))
  console.log(rand)

  cloudgroup= new Group();
  obstaclegroup= new Group();
}

function draw(){
  background("white");

  fill("black");
  text("score: " + score, width-710, height-610);

  //console.log(frameCount);

  if (gamestate == PLAYGAME){
    spawnClouds();
    createObstacles();
    score= score + Math.round(frameRate()/60);
    chao.velocityX= -(10 + 2*(score/200))

    if (score > 0 && score % 200 == 0){
      checkpoint.play();
    }
  
    if (chao.x < 0){
      chao.x= chao.width/2;
    } 

    if(touches.lenght > 0 || keyDown("space") && trex.y > 152){
      jump.play();
      trex.velocityY=-13;
      touches=[];
    }
    trex.velocityY=trex.velocityY +0.8
    console.log(trex.y);
    
    if (trex.isTouching (obstaclegroup)){
      die.play();
      gamestate = ENDGAME;
   }
  }
    else if (gamestate == ENDGAME) {
      gameover.visible=true;
      restart.visible=true;
      trex.changeAnimation("shocked", trexsurprised);
      chao.velocityX= 0;
      trex.velocityY= 0;
      obstaclegroup.setLifetimeEach(-1);
      obstaclegroup.setVelocityXEach(0);
      cloudgroup.setLifetimeEach(-1);
      cloudgroup.setVelocityXEach(0);
      if (mousePressedOver(restart)){
        reset();
    }
    }
    // trex collidindo com o chaoinvisivel 
    trex.collide(chaoinvisivel);
    drawSprites();
}

function spawnClouds(){
  if (frameCount %60 == 0){
   cloud=createSprite(width, 100, 40, 10);
   cloudgroup.add(cloud);
   cloud.addImage(nuvem);
   cloud.y= Math.round(random(10, 60));
   cloud.scale= 0.7;
   cloud.velocityX=-3;
   cloud.lifetime= 600;
   cloud.depth = trex.depth;
   trex.depth = trex.depth + 1
}
 }

function createObstacles(){
  if (frameCount %80 == 0) {
   obstaculo= createSprite(width, 160, 50, 50);
   obstaculo.velocityX= -(10 + 2*(score/200))
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
function reset(){
  gamestate = PLAYGAME;
  trex.changeAnimation("running", trexAnime);
  score=0;
  trex.x=100;
  trex.y=190;
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  gameover.visible=false;
  restart.visible=false;
}
