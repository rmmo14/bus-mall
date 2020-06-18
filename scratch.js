// var lineUp = [];
var tClicks = 0;
var maxClicks = 5;
var randomNumArray = [];


function Produce(imageSource, caption) {
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.caption = caption;
  // this.percent = 0;
  Produce.lineUp.push(this);
  // lineUp.push(this);
}
Produce.lineUp = [];


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

// local storage
var stringyLineUpData = localStorage.getItem('store-c-s');
var lineUpData = JSON.parse(stringyLineUpData);
console.log(lineUpData);
if (lineUpData) {
  Produce.lineUp = lineUpData;
}
renderRandImg();

// Randomizer

function randomizer(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// event listener

var figureSection = document.getElementById('product-imgs');
figureSection.addEventListener('click', handleProdClick);


// rendering random images
function renderRandImg() {
  var firstProdImg;
  var secondProdImg;
  var thirdProdImg;

  do {
    secondProdImg = randomizer(0, Produce.lineUp.length);
    do {
      firstProdImg = randomizer(0, Produce.lineUp.length);
    } while (firstProdImg === secondProdImg); // if first and second are the same then it goes back to line 62
    do {
      thirdProdImg = randomizer(0, Produce.lineUp.length);
    } while (firstProdImg === thirdProdImg || secondProdImg === thirdProdImg);
  } while (randomNumArray.includes(firstProdImg) || randomNumArray.includes(secondProdImg) || randomNumArray.includes(thirdProdImg));
  randomNumArray = [firstProdImg, secondProdImg, thirdProdImg];
  //console.log('check if repeat: ', randomNumArray);

  // debugger;

  var leftImg = document.getElementById('leftimg');
  var leftTxt = document.getElementById('lefttext');
  var centImg = document.getElementById('centerimg');
  var centTxt = document.getElementById('centertext');
  var rightImg = document.getElementById('rightimg');
  var rightTxt = document.getElementById('righttext');

  var leftOption = Produce.lineUp[firstProdImg];
  leftImg.src = leftOption.imageSrc;
  leftTxt.textContent = leftOption.caption;
  leftOption.shown++;

  var midOption = Produce.lineUp[secondProdImg];
  centImg.src = midOption.imageSrc;
  centTxt.textContent = midOption.caption;
  midOption.shown++;

  var rightOption = Produce.lineUp[thirdProdImg];
  rightImg.src = rightOption.imageSrc;
  rightTxt.textContent = rightOption.caption;
  rightOption.shown++;

}

// The results
function showResults() {
  var resultsData = document.getElementById('clicks');
  var resultsList = document.createElement('ul');
  for (var i = 0; i < Produce.lineUp.length; i++) {
    var resultsContent = document.createElement('li');
    resultsContent.textContent = Produce.lineUp[i].caption + ' - shown: ' + Produce.lineUp[i].shown + ' , clicked: ' + Produce.lineUp[i].clicked;
    resultsList.appendChild(resultsContent);
    resultsData.appendChild(resultsList);
  }
}

// Render to Table
function renderToTable() {
  var dataTable = document.getElementById('data');
  var tHeader = document.createElement('thead');
  var pCell = document.createElement('th');
  var cCell = document.createElement('th');
  var sCell = document.createElement('th');

  pCell.textContent = 'Product';
  cCell.textContent = 'Shown';
  sCell.textContent = 'Clicks';
  tHeader.appendChild(pCell);
  tHeader.appendChild(cCell);
  tHeader.appendChild(sCell);

  dataTable.appendChild(tHeader);

  for (var i = 0; i < this.Produce.lineUp.length; i++) {
    var tRow = document.createElement('tr');
    var tCell = document.createElement('td');
    tCell.textContent = this.Produce.lineUp[i].caption;
    tRow.appendChild(tCell);
    tCell = document.createElement('td');
    tCell.textContent = this.Produce.lineUp[i].shown;
    tRow.appendChild(tCell);
    dataTable.appendChild(tRow);
    tCell = document.createElement('td');
    tCell.textContent = this.Produce.lineUp[i].clicked;
    tRow.appendChild(tCell);
    dataTable.appendChild(tRow);
  }
}

// ========== prompt 3 ==============

//control the number of rounds a user is presented with so that can control the voting session duration
// keep the number of rounds variable to allow the number to be easily changed for debugging and testing


// ================lab 12 ===================


function renderToChart() {
  var productNames = [];
  var productClicks = [];
  var productShown = [];

  for (var i = 0; i < Produce.lineUp.length; i++) {
    productNames.push(Produce.lineUp[i].caption);
    productClicks.push(Produce.lineUp[i].clicked);
    productShown.push(Produce.lineUp[i].shown);
  }

  var ctx = document.getElementById('data-display').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of clicks',
        backgroundColor: 'rgba(25, 99, 132, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: productClicks
      },
      {
        type: 'bar',
        label: 'times shown',
        data: productShown,
        backgroundColor: 'rgba(25, 99, 201, 0.9)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function handleProdClick(event) {
  if (event.target.tagName === 'IMG') {
    if (tClicks === maxClicks) {
      figureSection.removeEventListener('click', handleProdClick);
      showResults();
      renderToTable();
      renderToChart();
      console.log(Produce.lineUp);
    }

    var targetSource = event.target.getAttribute('src');
    for (var i = 0; i < Produce.lineUp.length; i++) {
      if (Produce.lineUp[i].imageSrc === targetSource) {
        Produce.lineUp[i].clicked++;
      }
    }


    tClicks++;
    renderRandImg();
  }
  var stringyLineUp = JSON.stringify(Produce.lineUp);
  localStorage.setItem('store-c-s', stringyLineUp);
}

// ============= lab 13 ========
// local storage
// need to store all data

// function reRenderProd() {
//   for (var i = 0; i < lineUpData.length; i++){
//     var iCaption = lineUpData[i].caption;
//     var iSrc = lineUpData[i].imageSrc;
//     var nProd = new Produce ( iSrc, iCaption);
//     nProd.clicked = lineUpData[i].clicked;
//     nProd.shown = lineUpData[i].shown;
//   }
// }
