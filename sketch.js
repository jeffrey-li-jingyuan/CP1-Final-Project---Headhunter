var heads = [];
var collector = [];
var spriteX = 200;
var spriteY = 370;
var spriteV = 2;
var neckLength = 30;
var foot = 0;
var lift = 2;
var shake = 0;
var ground = 375;
var neckMove = 0;
var yell;


function preload(){
  soundFormats('mp3');
  let yell = loadSound('manyelling.mp3');
}

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i <= 3; i++) {
    var head = {
      x: random(20, width - 20),
      y: random(height - 60),
    };
  heads.push(head);
  }
}
  function draw() {
    background(220);
    fill(0);
    rect(0, ground + shake, width, height); //ground
    //our stickman!
    strokeWeight(4);
    fill(255)
    line(spriteX, spriteY + shake - 30, spriteX - foot, spriteY + lift + shake); //leg1
    line(spriteX, spriteY + shake - 30, spriteX + foot, spriteY - lift + shake); //leg2
    line(spriteX, spriteY - 30 + shake, spriteX - lift, spriteY - neckLength + shake); //neck
    line(spriteX - lift, spriteY - neckLength + shake, spriteX - lift + neckMove, spriteY - neckLength + shake) //neckLefts
    line(spriteX - lift, spriteY - neckLength + shake, spriteX - lift + neckMove, spriteY - neckLength + shake) //neckRight
    strokeWeight(5.5);
    point(spriteX - foot, spriteY + lift + shake); //foot1
    point(spriteX + foot, spriteY - lift + shake); //foot2

    // for (var i = 0; i < heads.length; i++) { // Whatever the length of that array, update and display all of the objects.
    //   heads[i].update();
    //   heads[i].display();
    // }

    //random heads raining down
    for (var i = 0; i < heads.length; i++) {
      var head = heads[i];
      ellipse(head.x, head.y, 20);
      head.y += 0.1
      //when neck touches a head, the head disappears.
      if (dist(spriteX - lift, spriteY - neckLength, head.x, head.y) < 15 || head.y >= ground - 15 + shake || dist(spriteX - lift + neckMove, spriteY - neckLength + shake, head.x, head.y) < 15 || dist(spriteX - lift + neckMove, spriteY - neckLength + shake, head.x, head.y)< 15) {
       heads.splice(i, 1);
       yell.play();
       heads.push(new HeadRain(random(20, width - 20), random(-30, 120)));
       heads.push(new HeadRain(random(20, width - 20), random(-30, 10)));
       // heads.speed+=100;

       // collector.push(c)
      }
    }


    if (keyIsDown(RIGHT_ARROW)) {
      walk(1);
      spriteX += spriteV;
      shake += random(-0.2, 0.2);
    } else if (keyIsDown(LEFT_ARROW)) {
      walk(-1);
      spriteX -= spriteV;
      shake += random(-0.2, 0.2)
    } else {
      lift = 0;
      shake = 0;
      ground = 375;
    }

    if (keyIsDown(UP_ARROW)) {
      neckLength += 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      neckLength -= 20;
    }

    if (neckLength < 30) {
      neckLength = 30;
      neckMove = 0;
    }
    if (keyIsDown(65)) {
      neckMove -= 10;
    } else if (keyIsDown(68)) {
      neckMove += 10;
    }
  }

  function walk(direction) {
    lift = direction;
    foot += spriteV;
    if (foot > 12 || foot < -14) {
      foot = -foot;
    }
  }

  function HeadRain(tempX, tempY, tempW) {
    this.x = tempX; // x location of head
    this.y = tempY; // y location of haed
    this.w = tempW; // diameter of haed
    this.speed = 0;

    this.display = function() {
      // Display the head
      fill(255);
      stroke(0);
      strokeWeight(3)
      ellipse(this.x, this.y, this.w);
    }

    this.update = function() {
      // Add head to rain
      this.y = this.y + this.speed;
    }
  }
