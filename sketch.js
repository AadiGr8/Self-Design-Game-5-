var plain, plainImg;
var city, cityImg;
var birdImg, bird1Img, bird2Img;
var gameState = SERVE;
var SERVE = 0;
var PLAY = 1;
var END = 2;
var edges;
var plainG;
var birdG, starG, star2G, diamondG;
var starImg, star2Img;
var score = 0;
var start, startImg;
var diamondImg;
var gameOver, gameOverImg;
var sky, skyImg;
var getReady, getReadyImg;
var ufoImg, ufo2Img;
var ufoG, ufo2G;
var missileImg, missileG;
var space, spaceImg;
var next, nextImg;

function preload(){
  
  plainImg = loadImage("plane1.png");
  cityImg = loadImage("city.png");
  birdImg = loadImage("bird2.png");
  bird1Img = loadImage("bird.png");
  bird2Img = loadImage("bird4.png");  
  starImg = loadImage("star.png");
  star2Img = loadImage("star2.png");
  startImg = loadImage("start_icon.png");
  diamondImg = loadImage("diamond.png");
  gameOverImg = loadImage("gameOver.png");
  getReadyImg = loadImage("getReady.png");
  ufoImg = loadImage("ufo.png");
  ufo2Img = loadImage("ufo2.png");
  missileImg = loadImage("bullet.png");
  spaceImg = loadImage("space.png");
  nextImg = loadImage("Next.png");
  
  
}

function setup(){
  createCanvas(800,800);  
  
  birdG = new Group();
  starG = new Group();
  star2G = new Group();
  plainG = new Group();
  diamondG = new Group();
  ufoG = new Group();
  ufo2G = new Group();
  missileG = new Group();

  city = createSprite(400,400,0,0);
  city.addImage(cityImg);
  city.velocityX = 0;
  city.scale = 2;
  
  plain = createSprite(20,350,0,0);
  plain.addImage(plainImg);
  plain.scale = 0.35;
  plainG.add(plain);
  
  start = createSprite(400,400,10,10);
  start.addImage(startImg);
  start.scale = 1.2;

  gameOver = createSprite(400,300,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.7;

  getReady = createSprite(400,325,10,10);
  getReady.addImage(getReadyImg);
  getReady.visible = true;
  getReady.scale = 0.7;
  
  space = createSprite(380,777,10,10);
  space.addImage(spaceImg);
  space.scale = 0.25;
  
  next = createSprite(750,760,10,10);
  next.addImage(nextImg);
  next.scale = 0.2;
  next.visible = false;
}

function draw(){
  background(0);
  edges = createEdgeSprites();
  
  plain.visible = false;
  getReady.visible = false;
  start.visible = true;
  city.visible = false;
  plain.visible = false;

if(mousePressedOver(start)){
  gameState = SERVE;
  plain.y = 50;
  score = 0;
}

  if(gameState === SERVE){

    textSize(30);
    fill("blue");
    stroke("blue");
    text("The ufo's are attacking us we need to destroy them.",50,250);
    text("But the birds should not be harmed.",150,285);

    textSize(25);
    stroke("orange");
    fill("orange");
    text("Shoot the ufo's out",300,425);
    text("Collect the stars and diamond",250,455);
    text("Escape from the birds",285,485);

    fill("lime");
    stroke("lime");
    text("NEXT",725,785);

    textSize(30);
    fill("cyan");
    stroke("cyan");
    text("Instructions :",325,375);

    if(mousePressedOver(next)){
      gameState = PLAY;
    }

    start.y = 1000;
    gameOver.visible = false;

}
  
  
  if(gameState === PLAY){
  
    gameOver.visible = false;
    city.visible = true;
    plain.visible = true;
    getReady.visible = false;
    start.y = 1000;

    plain.y = mouseY;
  
  if(keyDown("space")){
    missile();
  }
 
  if(plain.isTouching(birdG)){
    gameState = END;
  }

  if(plain.isTouching(ufoG)){
    gameState = END;
  }

  if(missileG.isTouching(ufoG)){
    ufoG.destroyEach();
    score = score + 1;
  }
  
  if(missileG.isTouching(ufo2G)){
    ufo2G.destroyEach();
    score = score + 1;
  }
  
  if(plain.isTouching(ufo2G)){
    gameState = END;
  }

  if(plain.isTouching(starG)){
    score = score + 1;
    starG.destroyEach();
  }
    
  
  if(plain.isTouching(star2G)){
    score = score + 2;
    star2G.destroyEach();
  }
      
  if(plain.isTouching(diamondG)){
    score = score + 3;
    diamondG.destroyEach();
  }

  
  plain.collide(edges);
  
  bird();
  star();
  diamond();
  ufo();

  }

  
  if(gameState === END){
    gameOver.visible = true;
    ufo2G.destroyEach();
    ufoG.destroyEach();
    birdG.destroyEach();
    starG.destroyEach();
    star2G.destroyEach();
    diamondG.destroyEach();
    start.y = 400;
    missileG.destroyEach();

    if(mousePressedOver(start)){
      gameState = PLAY;
      plain.y = 50;
      score = 0;
    }

  }  

  drawSprites();

  stroke("red");
  fill("red");
  textSize(25);
  text("SCORE : "+score,340,750);
  
  stroke("yellow");
  fill("yellow");
  textSize(25);
  text("Press              to shoot",267,785);

  }

function bird(){
  if(frameCount%100===0){
  var bird = createSprite(850,0,10,10);
  bird.lifetime = -1;
  bird.velocityX = -4;
  bird.y = Math.round(random(10,750));
  
  var rand = Math.round(random(1,3))
    switch(rand){
      case 1: bird.addImage(birdImg);
      bird.scale = 0.25;
      break;
      
      case 2: bird.addImage(bird1Img);
      bird.scale = 0.25;
      break;  
        
      case 3: bird.addImage(bird2Img);    
      bird.scale = 0.25;
      break;
        
      default:break;
    }
    
    birdG.add(bird);
  
  }
}

function star(){
  if(frameCount%250===0){
  var star = createSprite(850,0,10,10)
  star.lifetime = -1;
  star.velocityX = -4;
  star.y = Math.round(random(10,750));
  
  var rand = Math.round(random(1,2))
  switch (rand){
      
    case 1: star.addImage(starImg);
    star.scale = 0.5;
    starG.add(star);
    break;
    
    case 2: star.addImage(star2Img);
    star.scale = 0.3;
    star2G.add(star);
    break;
  
    default:break;
  
  }  
    
  }
}

function diamond(){
  if(frameCount % 300 === 0){
  var diamond = createSprite(850,0,0,0);
    diamond.addImage(diamondImg);
    diamond.scale = 0.15;
    diamond.y = Math.round(random(10,750));
    diamond.lifetime = -1;
    diamond.velocityX = -4;
    diamondG.add(diamond);
  }
}

function ufo(){
  if(frameCount%250===0){
  var ufo = createSprite(850,0,10,10)
  ufo.lifetime = -1;
  ufo.velocityX = -4;
  ufo.y = Math.round(random(10,750));
  
  var rand = Math.round(random(1,2))
  switch (rand){
      
    case 1: ufo.addImage(ufoImg);
    ufo.scale = 0.4;
    ufoG.add(ufo);
    break;
    
    case 2: ufo.addImage(ufo2Img);
    ufo.scale = 0.4;
    ufo2G.add(ufo);
    break;
  
    default:break;
  
  }  
    
  }
}

function missile(){
  var missile = createSprite(80,0,0,0);
    missile.addImage(missileImg);
    missile.scale = 0.1;
    missile.y = plain.y/2;
    missile.lifetime = 300;
    missile.velocityX = 3;
    missile.y = mouseY;
    missileG.add(missile);
    missile.visible = true;
  }
