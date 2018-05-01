var stars = [];
var starsWithinMouseRadius = [];
var lines = [];
var img;

// Sky Gradient
var c1; var c2;

function setup() {

  var cHeight = innerHeight;
  if (cHeight < 500) {
    cHeight = 500;
  }
  createCanvas(innerWidth, cHeight);
  background(100);

  img = loadImage("libraries/Assets/Pier.jpg");

  // sky color
  c1 = color(0);
  c2 = color(100);

  var numStars = innerWidth/2;
  for (var i = 0; i < numStars; i++) {
    stars[i] = new Star();
  }
}

function draw() {

  image(img,100,180,img.width/15,img.height/15);
  image(img,250,150,img.width/12,img.height/12);
  image(img,450,130,img.width/10,img.height/10);
  image(img,670, 100,img.width/7,img.height/7);

  setGradient(0, 0, width, height, c1, c2);

  stars.forEach(function(s) {
    s.show();
  });

  showLines();
}

function mouseMoved() {
  getStarsWithinMouseRadius();
  lines = [];
  connectToNeighbors();
}

function showLines() {
  stroke(255);
  strokeWeight(0.25);
  lines.forEach(function(l) {
    line(l[0], l[1], l[2], l[3]);
  });
}

function connectToNeighbors() {
  starsWithinMouseRadius.forEach(function(s1) {
    starsWithinMouseRadius.forEach(function(s2) {
      if (abs(s1.x - s2.x) < 50 && abs(s1.y - s2.y) < 50) {
        lines.push([s1.x, s1.y, s2.x, s2.y]);
      }
    });
  })
}

function getStarsWithinMouseRadius() {
  starsWithinMouseRadius = stars.filter(function(s) {
    return (
      s.x > mouseX - 120 && s.x < mouseX + 120
      && s.y > mouseY - 120 && s.y < mouseY + 120
    );
  })
}

function Star() {
  this.x = random(-50, width + 50);
  this.y = random(-50, height + 50);
  this.r = random(1, 3);

  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
    // if (starsWithinMouseRadius.includes(this)) {
    // }
  }
}

// for background gradient
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (var i = y; i <= y+h; i++) {
    var inter = map(i, y, y+h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x+w, i);
  }
}
