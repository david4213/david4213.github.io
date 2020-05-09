let wide = 10;
let high = 20;
let scaling = 500 / high;
let speed = 20;
let lTimer, rTimer, cwTimer, ccwTimer = 0;
let movSp = 8;
let rotSp = 10;
let clearing = false;
let clearingTimer = 0;
let animScl = 5;
let score = 0;
let level = 1;
const potPieces = ['i', 'o', 't', 's', 'z', 'l', 'j'];
let nextPiece = potPieces[Math.floor(Math.random() * potPieces.length)];

let field = new Array(high);
let fixed = new Array(high);
let pieces = [];
let completedLines = [];

for (var i = 0; i < field.length; i++) {
    field[i] = new Array(wide);
}
for (var i = 0; i < fixed.length; i++) {
    fixed[i] = new Array(wide);
}

for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
        field[i][j] = 0;
        fixed[i][j] = 0;
    }
}

function preload() {
    arcF = loadFont('resc/ka1.ttf');
    arcFB = loadFont('resc/ka2.ttf');
}

function setup() {
    createCanvas((wide + 6) * scaling + 40, high * scaling);
    background(50);
    frameRate(60);
    scr = createGraphics(6 * scaling, 10 * scaling);
    pieces.push(new Piece(potPieces[Math.floor(Math.random() * potPieces.length)]));
}

function draw() {
    image(scr, wide * scaling + 20, 0);
    drawScores();
    checkPieces();
    clearShit();
    fieldReset();
    for (let p of pieces) {
        p.update();
    }
    drawField();

    if (keyIsDown(RIGHT_ARROW)) {
        if (rTimer % movSp == 0) {
            for (let p of pieces) {
                if (p.checkLR(1)) {
                    p.x++;
                }
            }
        }
        rTimer++;
    } else {
        rTimer = 0;
    }
    if (keyIsDown(LEFT_ARROW)) {
        if (lTimer % movSp == 0) {
            for (let p of pieces) {
                if (p.checkLR(-1)) {
                    p.x--
                }
            }
        }
        lTimer++;
    } else {
        lTimer = 0;
    }
    if (keyIsDown(88)) {
        if (cwTimer % rotSp == 0) {
            for (let p of pieces) {
                if (p.checkROT(1)) {
                    if (p.r == 3) {
                        p.r = 0;
                    } else {
                        p.r++;
                    }
                    console.log(p.r);
                }
            }
        }
        cwTimer++;
    } else {
        cwTimer = 0;
    }
    if (keyIsDown(89)) {
        if (ccwTimer % rotSp == 0) {
            for (let p of pieces) {
                if (p.checkROT(-1)) {
                    if (p.r == 0) {
                        p.r = 3;
                    } else {
                        p.r--;
                    }
                    console.log(p.r);
                }
            }
        }
        ccwTimer++;
    } else {
        ccwTimer = 0;
    }

    if (pieces.length == 0 && !clearing) {
        pieces.push(new Piece(nextPiece));
        nextPiece = potPieces[Math.floor(Math.random() * potPieces.length)];
    }

}

function drawField() {
    stroke(0);
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            fill(colors[field[i][j]]);
            rect(j * scaling, i * scaling, scaling, scaling);
        }
    }
}

function fieldReset() {
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            field[i][j] = fixed[i][j];
        }
    }
}

function checkPieces() {
    for (let p of pieces) {
        if (p.fixed) {
            pieces = [];
        }
    }
}

function drawScores() {
    scr.background(100, 0, 0);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            scr.stroke(0);
            scr.fill(200);
            scr.rect(j * scaling, i * scaling, scaling, scaling);
        }
    }
    scr.rect(scaling, 0, scaling * 4, scaling);
    scr.rect(0, scaling, scaling * 2, scaling);
    scr.rect(scaling * 2, scaling, scaling * 4, scaling);
    scr.rect(0, scaling * 2, scaling * 2, scaling);
    scr.rect(scaling * 2, scaling * 2, scaling * 4, scaling);
    scr.stroke(0);
    scr.fill(colors[nextPiece]);
    for (var i = 0; i < 4; i++) {
        scr.rect(scaling*(3+lib[nextPiece][0][i][0]),scaling*(5+lib[nextPiece][0][i][1]),scaling,scaling);
    }
    scr.fill(0);
    scr.textFont(arcFB);
    scr.textSize(16);
    scr.textAlign(CENTER, CENTER);
    scr.text('TETRIS', scaling * 3, scaling / 2.5);
    scr.textFont(arcF);
    scr.textSize(14);
    scr.text('Score', scaling, scaling * 1.42);
    scr.text('Line', scaling, scaling * 2.42);
    scr.textAlign(LEFT);
    scr.text(score,scaling*2.3,scaling*1.42);
}

function checkCompleted() {
    let i = 0;
    let full = true;
    for (let l of fixed) {
        for (let p of l) {
            if (p == 0) {
                full = false;
            }
        }
        if (full) {
            completedLines.push(i);
        }
        i++;
        full = true;
    }
    if (completedLines.length != 0) {
        score += scores[completedLines.length];
    }
}

function clearShit() {
    if (!clearing) {
        checkCompleted();
    }
    if (completedLines.length > 0) {
        clearing = true;
        switch (clearingTimer) {
            case 0 * animScl:
                for (let l of completedLines) {
                    fixed[l][4] = 0;
                    fixed[l][5] = 0;
                }
                break;
            case 1 * animScl:
                for (let l of completedLines) {
                    fixed[l][4] = 0;
                    fixed[l][5] = 0;
                    fixed[l][3] = 0;
                    fixed[l][6] = 0;
                }
                break;
            case 2 * animScl:
                for (let l of completedLines) {
                    fixed[l][2] = 0;
                    fixed[l][7] = 0;
                }
                break;
            case 3 * animScl:
                for (let l of completedLines) {
                    fixed[l][1] = 0;
                    fixed[l][8] = 0;
                }
                break;
            case 4 * animScl:
                for (let l of completedLines) {
                    fixed[l][0] = 0;
                    fixed[l][9] = 0;
                }
                break;
            case 5 * animScl:
                clearing = false;
                clearingTimer = 0;
                let newField = [];
                for (let l of completedLines) {
                    newField = [];
                    for (let i = fixed.length - 1; i >= 0; i--) {
                        if (i > l || i == 0) {
                            newField[i] = fixed[i];
                        } else {
                            newField[i] = fixed[i - 1];
                        }
                    }
                    fixed = newField;
                }
                completedLines = [];
                break;
        }
        clearingTimer++;
    }
}

const scores = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200
}