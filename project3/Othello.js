'use strict';

/**
 * Othello game
 * Author(s): Tyler West
 */

class Othello {

	// Constructs and initializes the board of given size
	constructor(size, startPlayer, discColor) {
		// validate arguments
		if (size < 4 || size > 8 || size % 2 !== 0) {
			throw new Error("Invalid value for board size.");
		}
		if (startPlayer < 1 || startPlayer > 2) {
			throw new Error("Invalid value for player number.");
		}
		if (discColor !== Othello.WHITE && discColor !== Othello.BLACK) {
			throw new Error("Invalid value for disc.");
		}

		// set instance variables
		this.size = size;
		this.turn = startPlayer;
		this.disc = discColor;

		// set two more instance variables p1Disc and p2Disc
		if (this.turn === 1) {
			this.p1Disc = this.disc;
			this.p2Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		} else {
			this.p2Disc = this.disc;
			this.p1Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		}

		// create the grid (as array of arrays)
		this.board = new Array(this.size);
		for (let i = 0; i < this.board.length; i++) {
			this.board[i] = new Array(this.size);
			this.board[i].fill(0);
		}

		// initialize the grid
		this.initializeBoard();
	}

	// Getter for white disc
  	static get WHITE() {
    	return "W";
  	}

  	// Getter for black disc
  	static get BLACK() {
    	return "B";
  	}

  	// Getter for empty
  	static get EMPTY() {
    	return "-";
  	}

  	// Getter for tie
  	static get TIE() {
    	return "T";
  	}

  	// Initializes the board with start configuration of discs (as per project specs)
	initializeBoard() {

		// Done
        var maxMid = this.size / 2;
        var minMid = (this.size / 2) - 1;
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(i == maxMid && j == maxMid){
                    this.board[i][j] = "B";
                }
                else if(i == minMid && j == minMid){
                    this.board[i][j] = "B";
                }
                else if((i == minMid || i == maxMid) && (j == maxMid || j == minMid)){
                    this.board[i][j] = "W";
                }
                else{
                    this.board[i][j] = "-";
                }
            }
        }

  	}

	// Returns true if placing the disc of current player at row,col is valid; else returns false
	isValidMove(row, col) {
		return this.isValidMoveForDisc(row, col, this.disc);
	}

    //functions for seeing if moves are valid
    //Top
    canMoveTop(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;

        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }

        if(row-c >= min && this.board[row-c][col] == notDisc){
            while(row-c >= min){
                if(this.board[row-c][col] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Top Right 
    canMoveTopRight(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;

        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }

        if(col+c <= max && row-c >= min && this.board[row-c][col+c] == notDisc){
            while(col+c <= max && row-c >= min){
                if(this.board[row-c][col+c] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Top Left
    canMoveTopLeft(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;
    
        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }
    
        if(col-c >= min && row-c >= min && this.board[row-c][col-c] == notDisc){
            while(col-c >= min && row-c >= min){
                if(this.board[row-c][col-c] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Left
    canMoveLeft(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;
    
        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }
    
        if(col-c >= min && this.board[row][col-c] == notDisc){
            while(col-c >= min){
                if(this.board[row][col-c] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Right
    canMoveRight(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;
    
        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }
    
        if(col+c <= max && this.board[row][col+c] == notDisc){
            while(col+c <= max){
                if(this.board[row][col+c] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Bottom
    canMoveBottom(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;
    
        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }

        if(row+c <= max && this.board[row+c][col] == notDisc){
            while(row+c <= max){
                if(this.board[row+c][col] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Bottom Right
    canMoveBottomRight(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;
    
        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }

        if(row+c <= max && col+c <= max && this.board[row+c][col+c] == notDisc){
            while(row+c <= max && col+c <= max){
                if(this.board[row+c][col+c] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

    //Bottom Left
    canMoveBottomLeft(row,col,disc){
        var max = this.size -1;
        var min = 0;
        var notDisc = "";
        var c = 1;
    
        if(disc == "B"){
            notDisc = "W";
        }
        if(disc == "W"){
            notDisc = "B";
        }

        if(row+c <= max && col-c >= min && this.board[row+c][col-c] == notDisc){
            while(row+c <= max && col-c >= min){
                if(this.board[row+c][col-c] == disc){
                    return true;
                }
                c++;
            }
        }
        return false;
    }

	// Returns true if placing the specified disc at row,col is valid; else returns false
	isValidMoveForDisc(row, col, disc) {

		// Done
        if(this.canMoveTop(row,col,disc)){
            return true;
        }
        if(this.canMoveTopRight(row,col,disc)){
            return true;
        }
        if(this.canMoveTopLeft(row,col,disc)){
            return true;
        }
        if(this.canMoveLeft(row,col,disc)){
            return true;
        }
        if(this.canMoveRight(row,col,disc)){
            return true;
        }
        if(this.canMoveBottom(row,col,disc)){
            return true;
        }
        if(this.canMoveBottomLeft(row,col,disc)){
            return true;
        }
        if(this.canMoveBottomRight(row,col,disc)){
            return true;
        }

		// DO NOT DELETE - if control reaches this statement, then it is not a valid move
		return false;	// not a valid move
	}

	// Places the disc of current player at row,col and flips the opponent discs as needed
	placeDiscAt(row, col) {
		if (!this.isValidMove(row, col)) {
			return;
		}

		// place the current player's disc at row,col
		this.board[row][col] = this.disc;


		// Done
        var c = 1;
        var notDisc = "";

        if(this.disc == "B"){
            notDisc = "W";
        }
        if(this.disc == "W"){
            notDisc = "B";
        }

        //Top
        if(this.canMoveTop(row,col,this.disc)){
            while(this.board[row-c][col] == notDisc){
                this.board[row-c][col] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Top Right
        if(this.canMoveTopRight(row,col,this.disc)){
            while(this.board[row-c][col+c] == notDisc){
                this.board[row-c][col+c] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Top Left
        if(this.canMoveTopLeft(row,col,this.disc)){
            while(this.board[row-c][col-c] == notDisc){
                this.board[row-c][col-c] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Left
        if(this.canMoveLeft(row,col,this.disc)){
            while(this.board[row][col-c] == notDisc){
                this.board[row][col-c] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Right
        if(this.canMoveRight(row,col,this.disc)){
            while(this.board[row][col+c] == notDisc){
                this.board[row][col+c] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Bottom Left
        if(this.canMoveBottomLeft(row,col,this.disc)){
            while(this.board[row+c][col-c] == notDisc){
                this.board[row+c][col-c] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Bottom
        if(this.canMoveBottom(row,col,this.disc)){
            while(this.board[row+c][col] == notDisc){
                this.board[row+c][col] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        //Bottom Right
        if(this.canMoveBottomRight(row,col,this.disc)){
            while(this.board[row+c][col+c] == notDisc){
                this.board[row+c][col+c] = this.disc;
                c++;
            }
            c = 1; //reset c
        }
        
		// DO NOT DELETE - prepares for next turn if game is not over
		if (!this.isGameOver()) {
			this.prepareNextTurn();
		}
	}

	// Sets turn and disc information for next player
	prepareNextTurn() {
		if (this.turn === 1) {
			this.turn = 2;
		} else {
			this.turn = 1;
		}
		if (this.disc === Othello.WHITE) {
			this.disc = Othello.BLACK;
		} else {
			this.disc = Othello.WHITE;
		}
	}

	// Returns true if a valid move for current player is available; else returns false
	isValidMoveAvailable() {
		return this.isValidMoveAvailableForDisc(this.disc);
	}

	// Returns true if a valid move for the specified disc is available; else returns false
	isValidMoveAvailableForDisc(disc) {

		// Done
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(this.isValidMoveForDisc(i,j,disc)){
                    return true;
                }
            }
        }

		
		// DO NOT DELETE - if control reaches this statement, then a valid move is not available
		return false;	// not a valid move
	}

	// Returns true if the board is fully occupied with discs; else returns false
	isBoardFull() {

		// Done
        var counter = 0;
        var totalSpaces = this.size * this.size;

        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(this.board[i][j] != "-"){
                    counter++;
                }
            }
        }

        if(counter == totalSpaces){
            return true;
        }

		return false; 
	}

	// Returns true if either the board is full or a valid move is not available for either disc
	isGameOver() {
		return this.isBoardFull() ||
					(!this.isValidMoveAvailableForDisc(Othello.WHITE) &&
								!this.isValidMoveAvailableForDisc(Othello.BLACK));
	}

	// If there is a winner, it returns Othello.WHITE or Othello.BLACK.
	// In case of a tie, it returns Othello.TIE
	checkWinner() {

		// Done
        var bCounter = 0;
        var wCounter = 0;

        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(this.board[i][j] == "B"){
                    bCounter++;
                }
                if(this.board[i][j] == "W"){
                    wCounter++;
                }
            }
        }

        if(wCounter > bCounter){
            return Othello.WHITE;
        }
        if(bCounter > wCounter){
            return Othello.BLACK;
        }
        if(bCounter == wCounter){
            return Othello.TIE;
        }
		
	}

	// Returns a string representation of the board (for display purposes)
	toString() {
		let str = '\n ';
		for (let i = 0; i < this.size; i++) {
			str += ' ' + (i+1)
		}
		str += "\n";
		for (let i = 0; i < this.size; i++) {
			str += i+1 + ' ';
			str += this.board[i].join(' ') + "\n";
		}
		return str;
	}
}

module.exports = Othello;