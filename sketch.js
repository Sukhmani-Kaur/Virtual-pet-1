//Create variables here
var dog,happyDog;
var foodS,foodStock;
var database;

function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  dogImg1=loadImage("dogImg1.png")
}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(250,300,100,100);
  dog.addImage(dogImg);
  dog.scale=0.15;

  

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  
}


function draw() {
  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  textSize(20);
  stroke("white");
  text("Food Remaining:" +foodS, 250,450);
  text("Press UP ARROW to feed the dog",100,200);


}

function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}



