let col, row, board, img, cnv, song;
let grid_size = 30;
let width = window.innerWidth;
let height = window.innerHeight;
let start = true;
let w = width - (width % grid_size);
let h = height - (height % grid_size);
w = w/7*5;
w = w - (w % grid_size);

function preload() {
    img = loadImage("flower.png");
    song = loadSound('song.mp3');
    click = loadSound('click.mp3');
}

function setup() {
    cnv = createCanvas(w, h);
    cnv.mousePressed(function() {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.loop();
        }    
    });
    let x = (windowWidth - w) / 2;
    cnv.position(x);
    randomArr();
}

function windowResized(){
    let width_resize = windowWidth/7*5;
    let w_resize = width_resize - (width_resize % grid_size);
    let x = (windowWidth - width_resize) / 2;
    resizeCanvas(w_resize, windowHeight);
    cnv.position(x);
    resizeToggle = true;
}

function randomArr() {
    buttonChange();
    col = w / grid_size;
    row = h / grid_size;
    board = createArr(col,row);
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            board[i][j] = Math.floor(Math.random() * 2);;
        }
    } 
    img.resize(grid_size-6,grid_size-6);
}

function createArr(col,row) {
    let arr = new Array(col);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(row);
    }
    return arr;
}

function draw() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++ ) {
            if (board[i][j] == 1) {
                stroke('#f857d8');
                rect(i*grid_size, j*grid_size, grid_size-1, grid_size-1);
                image(img, i*grid_size+3, j*grid_size+3);
            } else {
                stroke('#b4ac8b');
                fill('#bed8a8');  
                rect(i*grid_size, j*grid_size, grid_size-1, grid_size-1);           
            }
            strokeWeight(1);
        }
    }
    createNewArr();
}

function createNewArr() {
    let newBoard = createArr(col,row);
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            let current = board[i][j];         
            let sumN = countN(board, i, j);
            if (current == 0 && sumN == 3) {
                newBoard[i][j] = 1;
            } else if (current == 1 && (sumN < 2 || sumN > 3)) {
                newBoard[i][j] = 0;
            } else {
                newBoard[i][j] = current;
            }
        }
    }   
    frameRate(10);
    board = newBoard;
}

function countN(board, x, y) {
    let sum = 0;    
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let c = x + i;
            let r = y + j;
            if (c<=0 || r<=0 || c*grid_size >= w || r*grid_size >= h) { 
                continue;
            } else if (i===0 && j===0) {
                continue;
            } else {
                sum += board[c][r];
            }
        }
    }
    return sum;
}

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

function buttonChange() {
    document.getElementById("button2").setAttribute("disabled",true);
    document.getElementById("button2").style.backgroundColor = "gray";
    document.getElementById("button3").removeAttribute("disabled");
    document.getElementById("button3").style.backgroundColor = "#4CAF50";
}

button1.addEventListener("click", function(e) {
    click.play();
    randomArr();
    loop();
} );

button2.addEventListener("click", function(e) {
    click.play();
    loop();
    buttonChange();
} );

button3.addEventListener("click", function(e) {
    click.play();
    noLoop();
    document.getElementById("button3").setAttribute("disabled",true);
    document.getElementById("button3").style.backgroundColor = "gray";
    document.getElementById("button2").removeAttribute("disabled");
    document.getElementById("button2").style.backgroundColor = "#4CAF50";
} );
