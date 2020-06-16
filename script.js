// ============= prompt 1 ==========
var lineUp = [];
var tClicks = 0;
var maxClicks = 0;

// create a constructor function that creates an object associated with each product and has: name of product and file path of image
function Produce(imageSource, caption) {
  this.clicked = 0;
  this.shown = 0;
  this.imageSource = imageSource;
  this.caption = caption;

  lineUp.push(this);
}

new Produce('img/bag.jpg', 'R2D2 Bag');
new Produce('img/banana.jpg', 'Banana Slicer');
new Produce('img/bathroom.jpg', 'Ipad Stand');
// new Produce('img/boots.jpg', 'Rainfull Boots');
// new Produce('img/breakfast.jpg', 'BeFast');
// new Produce('img/bubblegum.jpg', 'Meatball Gum');
// new Produce('img/chair.jpg', 'Hyperbola Chair');
// new Produce('img/cthulu.jpg', 'Mighty Cthulu');
// new Produce('img/dog-duck.jpg', 'Dog Quack');
// new Produce('img/dragon.jpg', 'Dragon Meat');
// new Produce('img/pen.jpg', 'Utensil Pens');
// new Produce('img/pet-sweep.jpg', 'Paw Brooms');
// new Produce('img/scissors.jpg', 'Pizssors');
// new Produce('img/shark.jpg', 'Sleepin Shark');
// new Produce('img/sweep.jpg', 'Baby Sweeper');
// new Produce('img/tauntaun.jpg', 'Sleeping Star Wars');
// new Produce('img/unicorn.jpg', 'Uni Meat');
// new Produce('img/usb.gif', 'USB');
// new Produce('img/water-can.jpg', 'Water Can');
// new Produce('img/wine-glass.jpg', 'Wine');

// when user clicks product it generates three new products to pick from
// create an algorithm that will randomly generate 3 unique product images from the images directory and display them side-by-side
// attach an event listener to the section where the images are displayed

function randomizer(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


var figureElement = document.getElementById('product-imgs');
figureElement.addEventListener('click', handleProdClick);

function handleProdClick(event) {
  if (event.target.tagName === 'IMG') {
    tClicks++;
    // this will remove event listener when reach max clicks allowed
    if (tClicks === maxClicks) {
      figureElement.removeEventListener('click', handleProdClick);
    }

    var imgElement = event.targetAttribute('src');
    for (var i = 0; i < lineUp.length; i++) {
      if (lineUp[i].imageSource === imgElement) {
        // this  increases the objects this.clicked attribute
        lineUp[i].clicked++;
      }
    }
    renderProdImg();
  }
}

function renderProdImg(){
  var firstProdImg = randomizer(0,lineUp.length);
  var secondProdImg = randomizer(0,lineUp.length);
  var thirdProdImg = randomizer(0,lineUp.length);

  // use a loop to ensure 1st neq 2nd neq 3rd number to use for position of images
  while (firstProdImg === secondProdImg || secondProdImg === thirdProdImg || firstProdImg === thirdProdImg){
    firstProdImg = randomizer(0, lineUp.length);
    secondProdImg = randomizer(0, lineUp.length);
  }
}



// ================ prompt 2 =============

//track the selections made by viewers to determine which products to keep
// in the constructor function define a property to hold the number of times a product has been clicked
// after every selection by the viewer, update the newly added property to reflect if it was clicked


// ========== prompt 3 ==============

//control the number of rounds a user is presented with so that can control the voting session duration
// by default: provide 25 rounds of voting before ending the session
// keep the number of rounds variable to allow the number to be easily changed for debugging and testing



// ============= prompt 4 ==============

// user should be able to view a report of results after all rounds of voting have concluded
// create a property attached to the constructor function that keeps track of all the products that are being considered
// after voiting rounds, remove the event listeners on the product
// display the list of all the products followed by the votes received and number of times seen for each
