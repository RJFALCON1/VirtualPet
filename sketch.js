var dogImage;
var database;
var dog;
var foodStock;
function preload() {
  dogImage = loadImage("Images/dog1.jpeg");
}

function setup() {
  database = firebase.database();

  createCanvas(1500, 700);
  
  dog = createSprite(250, 350, 150, 150);
  dog.addImage("Junior", dogImage);
  dog.scale = 0.1;
  var dogRef = database.ref("foodCount");
  dogRef.on("value", function (data){
    foodStock = data.val()
  })
  textSize(20);
}

function draw() {
  background("black");

  if (keyDown(DOWN_ARROW)) {
    updateFood()
  }
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Leftover Food: " + foodStock, 40, 40);
}

function updateFood() {
  database.ref("/").update({
    foodCount : foodStock - 1
  })
}
