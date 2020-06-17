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

// Randomizer

function randomizer(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// event listener

var figureSection = document.getElementById('product-imgs');
figureSection.addEventListener('click', handleProdClick);

function handleProdClick(event) {
  if (event.target.tagName === 'IMG') {
    if (tClicks === maxClicks) {
      figureSection.removeEventListener('click', handleProdClick);
      showResults();
      renderToTable();
      renderToChart();
    }

    var targetSource = event.target.getAttribute('src');
    for (var i = 0; i < lineUp.length; i++) {
      if (lineUp[i].imageSrc === targetSource) {
        lineUp[i].clicked++;
      }
    }
    tClicks++;
    renderRandImg();
  }
}

// rendering random images

function renderRandImg() {
  var firstProdImg = randomizer(0, lineUp.length);
  var secondProdImg = randomizer(0, lineUp.length);
  var thirdProdImg = randomizer(0, lineUp.length);

  while (firstProdImg === randomNumArray[0] || firstProdImg === randomNumArray[1] || firstProdImg === randomNumArray[2]) {
    firstProdImg = randomizer(0, lineUp.length);
  }

  while (firstProdImg === secondProdImg || secondProdImg === randomNumArray[0] || secondProdImg === randomNumArray[1] || secondProdImg === randomNumArray[2]) {
    secondProdImg = randomizer(0, lineUp.length);
  }

  while (firstProdImg === thirdProdImg || secondProdImg === thirdProdImg || thirdProdImg === randomNumArray[0] || thirdProdImg === randomNumArray[1] || thirdProdImg === randomNumArray[2]) {
    thirdProdImg = randomizer(0, lineUp.length);
  }

  randomNumArray = [firstProdImg, secondProdImg, thirdProdImg];

  console.log('check if repeat: ', randomNumArray);
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
  var resultsData = document.getElementById('clicks');
  var resultsList = document.createElement('ul');
  for (var i = 0; i < lineUp.length; i++) {
    var resultsContent = document.createElement('li');
    resultsContent.textContent = lineUp[i].caption + ' - shown: ' + lineUp[i].shown + ' , clicked: ' + lineUp[i].clicked;
    resultsList.appendChild(resultsContent);
    resultsData.appendChild(resultsList);
  }
}

// Render to Table
function renderToTable() {
  var dataTable = document.getElementById('data');
  // var tHeaderArray = ['Product', 'Clicked', 'Shown'];
  // for (var i = 0; i < tHeaderArray.length; i++) {
  //   var tRow = document.createElement('tr');
  //   var tHeader = document.createElement('th');
  //   tHeader.textContent = tHeaderArray[i];
  //   tRow.appendChild(tHeader);
  // }
  // console.log(tRow);

  for (var i = 0; i < this.lineUp.length; i++) {
    var tRow = document.createElement('tr');
    var tCell = document.createElement('td');
    tCell.textContent = this.lineUp[i].caption;
    tRow.appendChild(tCell);
    tCell = document.createElement('td');
    tCell.textContent = this.lineUp[i].clicked;
    tRow.appendChild(tCell);
    dataTable.appendChild(tRow);
    tCell = document.createElement('td');
    tCell.textContent = this.lineUp[i].shown;
    tRow.appendChild(tCell);
    dataTable.appendChild(tRow);
  }
}

// ========== prompt 3 ==============

//control the number of rounds a user is presented with so that can control the voting session duration
// keep the number of rounds variable to allow the number to be easily changed for debugging and testing


// ================lab 12 ===================

// ============ prompt 1 =============
// update algorithm to not allow duplicates between consecutive clicks.

// need to add an array that will hold the images displayed then test the next values for any of those numbers used previously

// add canvas element chart

function renderToChart() {
  var productNames = [];
  var productClicks = [];
  var productShown = [];

  for (var i = 0; i < lineUp.length; i++) {
    productNames.push(lineUp[i].caption);
    productClicks.push(lineUp[i].clicked);
    productShown.push(lineUp[i].shown);
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
