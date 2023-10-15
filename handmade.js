let x = [];
let fourierX;

const user = 0;
const machine = 1;
let time = 0;
let path = [];
let drawing = [];
let state = -1;

function epicycles(x, y, rotation, fourier){
  for (let j = 0; j < fourier.length; j++){
    let px = x;
    let py = y;
    let freq = fourier[j].freq;
    let radius = fourier[j].amp;
    let phase = fourier[j].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(100);
    noFill();
    ellipse(px, py, radius*2);

    stroke(255);
    line (px, py, x, y); 
  }

  return createVector(x, y);
}

function mousePressed() {
  state = user;
  drawing = [];
  x = [];
  time = 0;
  path = [];
}

function mouseReleased () {
  state = machine;

  background(0);
  let skip = 1;
  for (let i = 0; i < drawing.length; i+= skip){
    x.push(new Complex(drawing[i].x, drawing[i].y))
  }
  fourierX = dft(x);

  fourierX.sort((a, b) => b.amp - a.amp);
}

function setup() {
  createCanvas(1600, 700);
}

function draw() {

  // if (frameCount === 1){
  //   capturer.start();
  // }

  background(0);
  
  if (state == user) {

    let point = createVector(mouseX - width / 2, mouseY - height/ 2);
    drawing.push(point);

    stroke(255);
    noFill();
    beginShape();
    for (let v of drawing){
      vertex(v.x + width / 2, v.y + height / 2);
    }
    endShape();

  } else if (state == machine) {

    let v = epicycles(width / 2, height / 2, 0, fourierX);

    path.unshift(v);

    stroke(255);
    beginShape();
    noFill();
    for(let i = 0; i < path.length; i++){
      vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / fourierX.length
    time += dt;
    
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

    // if (path.length > 300){
    //   path.pop();
    // }

    // if (time < TWO_PI){
    //   capturer.capture(canvas);
    // } else if (time > TWO_PI){
    //   capturer.save();
    //   capturer.stop();
    // }
  }
}