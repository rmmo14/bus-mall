var lineUp = [];
var tClicks = 0;
var maxClicks = 5;
var randomNumArray = [];


function Produce(imageSource, caption) {
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.caption = caption;
  this.percent = 0;

  lineUp.push(this);
}

new Produce('img/bag.jpg', 'R2D2 Bag');
new Produce('img/banana.jpg', 'Banana Slicer');
new Produce('img/bathroom.jpg', 'Ipad Stand');
new Produce('img/boots.jpg', 'Rainfull Boots');
new Produce('img/breakfast.jpg', 'BeFast');
new Produce('img/bubblegum.jpg', 'Meatball Gum');
new Produce('img/chair.jpg', 'Hyperbola Chair');
new Produce('img/cthulhu.jpg', 'Mighty Cthulu');
new Produce('img/dog-duck.jpg', 'Dog Quack');
new Produce('img/dragon.jpg', 'Dragon Meat');
new Produce('img/pen.jpg', 'Utensil Pens');
new Produce('img/pet-sweep.jpg', 'Paw Brooms');
new Produce('img/scissors.jpg', 'Pizssors');
new Produce('img/shark.jpg', 'Sleepin Shark');
new Produce('img/sweep.png', 'Baby Sweeper');
new Produce('img/tauntaun.jpg', 'Sleeping Star Wars');
new Produce('img/unicorn.jpg', 'Uni Meat');
new Produce('img/usb.gif', 'USB');
new Produce('img/water-can.jpg', 'Water Can');
new Produce('img/wine-glass.jpg', 'Wine');

function randomizer(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var figureSection = document.getElementById('product-imgs');
figureSection.addEventListener('click', handleProdClick);

function handleProdClick(event) {
  // if(userClick.target.tagName === 'IMG'){
  //   tClicks++;
  // }
  if (tClicks === maxClicks) {
    figureSection.removeEventListener('click', handleProdClick);
    showResults();
  }

  var targetSource = event.target.getAttribute('src');
  for (var i = 0; i < lineUp.length; i++) {
    if (lineUp[i].imageSrc === targetSource) {
      lineUp[i].clicked++;
    }
  }
  tClicks++;
  reRenderRandImg();
}


function reRenderRandImg() {
  var firstProdImg = randomizer(0, lineUp.length);
  var secondProdImg = randomizer(0, lineUp.length);
  var thirdProdImg = randomizer(0, lineUp.length);

  while (firstProdImg === secondProdImg || secondProdImg === thirdProdImg || firstProdImg === thirdProdImg) {
    firstProdImg = randomizer(0, lineUp.length);
    secondProdImg = randomizer(0, lineUp.length);
    thirdProdImg = randomizer(0, lineUp.length);
  }
  randomNumArray[0] = firstProdImg;
  randomNumArray[1] = secondProdImg;
  randomNumArray[2] = thirdProdImg;
  console.log(randomNumArray, leftOption, event);
  // debugger;
  var leftImg = document.getElementById('leftimg');
  var leftTxt = document.getElementById('lefttext');
  var leftOption = lineUp[firstProdImg];
  leftImg.src = leftOption.imageSrc;
  leftTxt.textContent = leftOption.caption;
  leftOption.shown++;

  var centImg = document.getElementById('centerimg');
  var centTxt = document.getElementById('centertext');
  centImg.src = lineUp[secondProdImg].imageSrc;
  centTxt.textContent = lineUp[secondProdImg].caption;
  lineUp[secondProdImg].shown++;

  var rightImg = document.getElementById('rightimg');
  var rightTxt = document.getElementById('righttext');
  rightImg.src = lineUp[thirdProdImg].imageSrc;
  rightTxt.textContent = lineUp[thirdProdImg].caption;
  lineUp[thirdProdImg].shown++;

}


// The results
function showResults() {
  for (var i = 0; i < lineUp.length; i++) {
    var resultsData = document.getElementById('clicks');
    var resultsContent = document.createElement('li');
    resultsContent.textContent = lineUp[i].caption + ' - shown: ' + lineUp[i].shown + ' , clicked: ' + lineUp[i].clicked;
    resultsData.appendChild(resultsContent);
  }
}



// ========== prompt 3 ==============

//control the number of rounds a user is presented with so that can control the voting session duration
// keep the number of rounds variable to allow the number to be easily changed for debugging and testing


