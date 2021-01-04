var dog1, dog, happyDog, database;
var foodS, foodStock;

function preload()
{
	dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  
  dog = createSprite(250,250);
  dog.addImage(dog1);
  dog.scale = 0.2;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
 
  drawSprites();

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 

}

function readStock(data) {

  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  } else {
    x = x - 1;
  }


  database.ref('/').update({
    Food: x
  })

}




