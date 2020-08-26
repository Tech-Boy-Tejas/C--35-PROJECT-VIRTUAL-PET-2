//Create variables here
var dog,happyDog;
var database;

var foodStock;

var feedDogButton,addFoodButton;
var fedTime,lastFed;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  var foodStocks = database.ref('foodStock')
  foodStocks.on("value",function(data){
    foodStock = data.val();
  });

  dog = createSprite(440,230);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

}


function draw() {  
  background(46, 139, 87);
  fill("red");
  

  //if(foodStock !== undefined){
    //if(keyWentDown(UP_ARROW)){
      //writeStock(foodStock);
      //dog.addImage(happydogImg)
    //}

  feedDogButton = createButton('FEED THE DOG');
  feedDogButton.position(450,50);

  addFoodButton = createButton('ADD FOOD');
  addFoodButton.position(650,50);

  feedDogButton.mousePressed(function(){
    dog.addImage(happydogImg);

    foodStock--;
    database.ref('/').update({
     'foodStock':foodStock,
     'feedTime':hour()
    })

    if(dog.x > 200 && dog.y < 300){
      dog.x -= 50;
      dog.y += 50;
    }

    if(foodStock === 0){
      foodStock = 0;
    }
  })

  addFoodButton.mousePressed(function(){
    foodStock++;
    database.ref('/').update({
      'foodStock':foodStock
    })
  })

  console.log(foodStock);

  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed !== undefined){
    if(lastFed >= 12){
      text("Last Fed: " + lastFed % 12 + "PM",200,50);
    }
    else if(lastFed === 0){
      text("Last Fed: 12 AM",200,50);
    }
    else{
      text("Last Fed: " + lastFed + "AM",200,50);
    }  
  }
    console.log(lastFed)
    drawSprites();
  
  //}
  
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    foodStock:x
  })
}



