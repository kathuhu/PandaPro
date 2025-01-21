var canvas,ctx;
var mouseX,mouseY,mouseDown=0;
var touchX,touchY;
var lastX,lastY=-1;

// Start of code from Zipso.net

function drawLine(ctx,x,y,size) {
  if (lastX==-1) {
    lastX=x;
	  lastY=y;
  }

ctx.lineCap = "round";

ctx.beginPath();
ctx.moveTo(lastX,lastY);
ctx.lineTo(x,y);
 
  ctx.lineWidth = size;
  ctx.stroke();

  ctx.closePath();

	lastX=x;
	lastY=y;
    } 

    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function sketchpad_mouseDown() {
        mouseDown=1;
        drawLine(ctx,mouseX,mouseY,12);
    }

    function sketchpad_mouseUp() {
        mouseDown=0;

        lastX=-1;
        lastY=-1;
    }


function sketchpad_mouseMove(e) { 
  getMousePos(e);

  if (mouseDown==1) {
    drawLine(ctx,mouseX,mouseY,12);
        }
    }

    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

    function sketchpad_touchStart() {
        getTouchPos();
        drawLine(ctx,touchX,touchY,12);
        event.preventDefault();
    }

    function sketchpad_touchEnd() {
        lastX=-1;
        lastY=-1;
    }


    function sketchpad_touchMove(e) { 
        getTouchPos(e);
        drawLine(ctx,touchX,touchY,12); 
        event.preventDefault();
    }

    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }

// End of code from Zipso.net

    function init() {
        canvas = document.getElementById('sketchpad');

        if (canvas.getContext)
            ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchend', sketchpad_touchEnd, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }
    }

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.80;
}

function start(){
    init();
    resizeCanvas();
}

document.querySelectorAll('.colorChange').forEach((el) => {
  el.onclick = function () {
    console.log("clicked");
    ctx.strokeStyle = el.style.backgroundColor;
  };
});

const download = document.getElementById('downloadbutton');
download.addEventListener('click', function (e) {
  const link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});

var array = ["Horse", "Duck", "Cow", "Cat", "Monkey", "Pig", "Zebra", "Chicken", "Lion", "Tiger", "Dog", "Rooster", "Turtle", "Fish", "Moose", "Elephant", "Sheep", "Owl", "Panda", "Parrot", "Fox"];

let animal = document.getElementById("RS");

let n = Math.floor(Math.random()*22);



animal.innerHTML = "Try drawing a " + array[n] + "!";

