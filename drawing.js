let x = [];
let fourierX;
let showcircles = 1;
let showlines = 1;

let time = 0;
let path = [];

function epicycles(x, y, showc, showl, rotation, fourier){
  for (let j = 0; j < fourier.length; j++){
    let px = x;
    let py = y;
    let freq = fourier[j].freq;
    let radius = 0.5*fourier[j].amp;
    let phase = fourier[j].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    if (showc == 1){
    stroke(50);
    noFill();
    ellipse(px, py, radius*2);
    }

    if (showl == 1){
    stroke(150);
    line (px, py, x, y); 
    }
  }

  return createVector(x, y);
}

function ShowCircles(){
  if (showcircles == 1){
    showcircles = 0;
  } else {
    showcircles = 1;
  }
}

function Showlines(){
  if (showlines == 1){
    showlines = 0;
  } else {
    showlines = 1;
  }
}

function setup() {
  createCanvas(700, 700);
  background(0);
  for (let i = 0; i < drawingPoints.length; i++){

    let c = new Complex(drawingPoints[i].x, drawingPoints[i].y);

    x.push(c);
  }
  fourierX = dft(x);

  fourierX.sort((a, b) => b.amp - a.amp);
}

function draw() {

  // if (frameCount === 1){
  //   capturer.start();
  // }

  

  if (time < TWO_PI){
    background(0);
  
    
    let v = epicycles(width/4, height/2, showcircles, showlines, 0, fourierX);

    path.unshift(v);

    beginShape();
    noFill();
    stroke(255);
    for(let i = 0; i < path.length; i++){
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / fourierX.length
    time += dt;

  } 
  
  // if (time < TWO_PI){
  //   capturer.capture(canvas);
  // } else if (time > TWO_PI){
  //   capturer.save();
  //   capturer.stop();
  // }

  if (time > TWO_PI){
    time = 0;
    path = [];
  }

}