class Piece {
    constructor(type) {
        this.type = type;
        this.y = 3;
        this.x = 4;
        this.r = 0;
        this.startFrame = frameCount;
        this.fixed = false;
        this.update();
        this.almost = 0;
    }

    update() {
        let movable = true;
        // Fill correct field-slots

        if (!this.fixed) {
            for (let i = 0; i < 4; i++) {
                field[this.y + lib[this.type][this.r][i][0]][this.x + lib[this.type][this.r][i][1]] = this.type;
            }
        }

        for (let i = 0; i < 4; i++) {
            try {
                if (fixed[this.y + 1 + lib[this.type][this.r][i][0]][this.x + lib[this.type][this.r][i][1]] != 0) {
                    movable = false;
                }
            } catch (error) {
                movable = false;
            }

        }

        if (!movable) {
            if (this.almost < speed / 2) {
                this.almost++;
            } else {
                for (let i = 0; i < 4; i++) {
                    fixed[this.y + lib[this.type][this.r][i][0]][this.x + lib[this.type][this.r][i][1]] = this.type;
                }
                this.fixed = true;
            }
        } else if ((frameCount - this.startFrame) % speed == 0 && frameCount != this.startFrame) {
            this.y++;
        }

    }

    checkLR(xdif) {
        let movable = true
        for (let i = 0; i < 4; i++) {
            try {
                if (fixed[this.y + lib[this.type][this.r][i][0]][this.x + xdif + lib[this.type][this.r][i][1]] != 0) {
                    movable = false;
                }
            } catch (error) {
                movable = false;
            }

        }
        return movable;
    }

    checkROT(dir) {
        let movable = true
        let newR = 0;
        let borderCh = 0;

        // Edge Cases für Randrotationen
        if (this.type == 't') {
            if (this.x == wide - 1 && this.r == 3) {
                borderCh = -1;
            } else if (this.x == 0 && this.r == 1) {
                borderCh = 1;
            }
        } else if (this.type == 'i') {
            if (this.r == 1 && this.x == wide - 2) {
                borderCh = -1;
            } else if (this.r == 3 && this.x == wide - 1) {
                borderCh = -2;
            } else if (this.r == 3 && this.x == wide - 2) {
                borderCh = -1;
            } else if (this.r == 1 && this.x == -1) {
                borderCh = 2;
            } else if (this.r == 3 && this.x == 0) {
                borderCh = 1;
            } else if (this.r == 1 && this.x == 0) {
                borderCh = 1;
            }
        } else if (this.type == 'l') {
            if (this.x == 0) {
                if (this.r == 1 || this.r == 3) {
                    borderCh = 1;
                }
            } else if (this.x == wide - 1 && this.r == 3) {
                borderCh = -1;
            }
        } else if (this.type == 'j') {
            if (this.x == 0) {
                if (this.r == 1 || this.r == 3) {
                    borderCh = 1;
                }
            } else if (this.x == wide - 1 && this.r == 3) {
                borderCh = -1;
            }
        } else if (this.type == 's') {
            if (this.x == 0 && this.r == 1) {
                borderCh = 1;
            } else if (this.x == wide-1 && this.r == 3) {
                borderCh = -1;
            }
        } else if (this.type == 'z') {
            if (this.x == 0 && this.r == 1) {
                borderCh = 1;
            } else if (this.x == wide-1 && this.r == 3) {
                borderCh = -1;
            }
        }
        // Determine next Rotation-state
        if (dir = 1) {
            if (this.r == 3) {
                newR = 0;
            } else {
                newR++;
            }
        } else if (dir = -1) {
            if (this.r == 0) {
                newR = 3;
            } else {
                newR--;
            }
        }
        // Check availability
        for (let i = 0; i < 4; i++) {
            try {
                if (fixed[this.y + lib[this.type][newR][i][0]][this.x + borderCh + lib[this.type][newR][i][1]] != 0) {
                    movable = false;
                }
            } catch (error) {
                movable = false;
            }
        }
        // Adjust x-Position for Edge-Cases
        if (movable) {
            this.x += borderCh;
        }
        return movable;
    }
}

const colors = {
    0: [200],
    j: [0, 0, 240],
    o: [240, 240, 0],
    i: [0, 240, 240],
    l: [240, 160, 0],
    s: [0, 240, 0],
    z: [240, 0, 0],
    t: [160, 0, 240],
    w: [255]
}

const lib = {
    t: [
        [
            [0, 0],
            [0, -1],
            [0, 1],
            [-1, 0]
        ],
        [
            [0, 0],
            [-1, 0],
            [1, 0],
            [0, 1]
        ],
        [
            [0, 0],
            [0, 1],
            [0, -1],
            [1, 0]
        ],
        [
            [0, 0],
            [1, 0],
            [-1, 0],
            [0, -1]
        ]
    ],
    o: [
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ]
    ],
    i: [
        [
            [0, 0],
            [0, -1],
            [0, 1],
            [0, 2]
        ],
        [
            [-1, 1],
            [0, 1],
            [1, 1],
            [2, 1]
        ],
        [
            [1, -1],
            [1, 0],
            [1, 1],
            [1, 2]
        ],
        [
            [-1, 0],
            [0, 0],
            [1, 0],
            [-2, 0]
        ]
    ],
    l: [
        [
            [0, 0],
            [0, -1],
            [0, 1],
            [-1, 1]
        ],
        [
            [0, 0],
            [-1, 0],
            [1, 0],
            [1, 1]
        ],
        [
            [0, 0],
            [0, 1],
            [0, -1],
            [1, -1]
        ],
        [
            [0, 0],
            [1, 0],
            [-1, 0],
            [-1, -1]
        ]
    ],
    j: [
        [
            [0, 0],
            [0, -1],
            [0, 1],
            [-1, -1]
        ],
        [
            [0, 0],
            [-1, 0],
            [1, 0],
            [-1, 1]
        ],
        [
            [0, 0],
            [0, 1],
            [0, -1],
            [1, 1]
        ],
        [
            [0, 0],
            [1, 0],
            [-1, 0],
            [1, -1]
        ]
    ],
    s: [
        [
            [0, 0],
            [-1, 0],
            [0, -1],
            [-1, 1]
        ],
        [
            [0, 0],
            [-1, 0],
            [0, 1],
            [1, 1]
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, -1]
        ],
        [
            [0, 0],
            [0, -1],
            [-1, -1],
            [1, 0]
        ]
    ],
    z: [
        [
            [0, 0],
            [-1, 0],
            [0, 1],
            [-1, -1]
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [-1, 1]
        ],
        [
            [0, 0],
            [0, -1],
            [1, 0],
            [1, 1]
        ],
        [
            [0, 0],
            [0, -1],
            [1, -1],
            [-1, 0]
        ]
    ]
}