var boardArray = [[], [], [], [], [], [], []]; // each nested array represents a column, the elements of each nested array are rows
var isRedTurn = true;
var redWin = false;     // depending on whose turn it is either redWin or yellowWin becomes true, so I can make different messages
var yellowWin = false;  // appear based on who wins

function moveObject(object, maxpos) {  // animation
  // from w3 schools
  var pos = 132;
  var id = setInterval(frame, 5);  // executes the function "frame" every 5 milliseconds
  function frame() {
    if (pos >= maxpos) {  // if the box hits the bottom, stop
      clearInterval(id);
    }
    else {  // otherwise move it one pixel down
      pos++
      object.style.top = pos + "px";
    }
  }
}

function identical(array) {
  var filteredArray = array.filter(function (el) {   // I was having trouble with the length being 4 all the time b/c of nulls
    return el != null;                               // so I wrote this to remove the nulls--checks only "RED" or "YLW"
  });
  for (var i=0; i < filteredArray.length; i++) {
    if (filteredArray[i] != filteredArray[0]) {  // if any element in the array is not the same as the first, returns false
      return false;
    }
  }
  if (filteredArray.length < 4) {  // needed this somewhere (here or in checkForWin) so that it didn't give a winner if there were
    return false;                  // two or three or one of the same element and nothing else
  }
  return true;
}

function errorMessage() {
  $("#errorMSG").hide();   // for a setTimeout later
}

function reset() {
  boardArray = [[], [], [], [], [], [], []];
  isRedTurn = true;
  $("#redWins").hide();
  $("#yellowWins").hide();
  $("div").remove();
  $("body").css("background-color", "white");
  $("#gameBoard").css("background-color", "");
  if (redWin) {
    clearInterval(blinkR);
  }
  else {
    clearInterval(blinkY);
  }
  redWin = false;
  yellowWin = false;
}

function checkForWin() {    // IMPORTANT: I INVERTED THE COLUMNS AND ROWS (boardArray[0][0] refers to the bottom left cell,
                            // and boardArray [1][2] refers to the second column from the left, third row up)
  for (var a=0; a<7; a++) {   // for vertical wins

    var vertArray1 = [];       // for each column, there's only 3 possible winning combinations: rows 0-3, 1-4 and 2-5
    var vertArray2 = [];       // I reset the arrays each time I run through the columns b/c otherwise I'd have to make 3*7=21 arrays
    var vertArray3 = [];       // By just doing everything inside a for loop and returning stuff if there's a win I only need 3 unique arrays (for verticals at least)

    for (var i=0; i<4; i++) {

      vertArray1.push(boardArray[a][i]);   // after for loop gives array of rows 0-3 of col a
      vertArray2.push(boardArray[a][i+1]);  // ''                                1-4
      vertArray3.push(boardArray[a][i+2]);  // ''                                2-5
      vertArray1 = vertArray1.filter(function (el) {    // more filtering--might be unnecessary but just to be safe
        return el != null;
      });
      vertArray2 = vertArray2.filter(function (el) {
        return el != null;
      });
      vertArray3 = vertArray3.filter(function (el) {
        return el != null;
      });
    }
              // at this point I have arrays for column a, rows 0-3, 1-4, and 2-5
              // if any of these are identical then there's a win
    if (identical(vertArray1) || identical(vertArray2) || identical(vertArray3)) {    // if any of these return true, someone won
      if (isRedTurn) {
        redWin = true;
        return;
      }
      else {
        yellowWin = true;
        return;
      }
    }   // if there's no win, I reset the arrays (b/c they don't matter anymore) and try the next column

  } // end of big vertical for loop

  for (var a=0; a<6; a++) {   // checks for horizontal wins, same logic as before

    var horArray1 = [];   // for each row, there's 4 possible win conditions: cols 0-3, 1-4, 2-5, 3-6
    var horArray2 = [];
    var horArray3 = [];
    var horArray4 = [];

    for (var i=0; i<4; i++) {

      horArray1.push(boardArray[i][a]);   // same logic as before, but with four arrays (b/c 4 win conditions)
      horArray2.push(boardArray[i+1][a]);
      horArray3.push(boardArray[i+2][a]);
      horArray4.push(boardArray[i+3][a]);
      horArray1 = horArray1.filter(function (el) {
        return el != null;
      });
      horArray2 = horArray2.filter(function (el) {
        return el != null;
      });
      horArray3 = horArray3.filter(function (el) {
        return el != null;
      });
      horArray4 = horArray4.filter(function (el) {
        return el != null;
      });
    }

    if (identical(horArray1) || identical(horArray2) || identical(horArray3) || identical(horArray4)) {
      if (isRedTurn) {
        redWin = true;
        return;
      }
      else {
        yellowWin = true;
        return;
      }
    }

  }   // end of big horizontal for loop

  for (var a=0; a<3; a++) {  // diagonals are a bit weirder

    diagArray1 = [];    // there's 24 possible diagonal wins, 12 going up/right and 12 going down/right
    diagArray2 = [];    // (up/left and down/left are the same as down/right and up/right respectively)
    diagArray3 = [];    // I need 8 unique arrays becuase each array can account for 3 win conditions (based on starting point)
    diagArray4 = [];
    diagArray5 = [];
    diagArray6 = [];
    diagArray7 = [];
    diagArray8 = [];

    for (var i=0; i<4; i++) {

      diagArray1.push(boardArray[i][i+a]);            // for up/right (the first four push statements)
      diagArray2.push(boardArray[i+1][i+a]);          // [i][i] gives 0,0 -> 1,1 -> 2,2 etc., so [i+1][i] gives
      diagArray3.push(boardArray[i+2][i+a]);          // 1,0 -> 2,1 -> 3,2. [i+a] makes it so that the array starts
      diagArray4.push(boardArray[i+3][i+a]);          // on a new row each time--the first iteration of the "a" for loop
      diagArray5.push(boardArray[i][5-(i+a)]);        // starts on the bottom row (boardArray[0][0]), and the second starts on
      diagArray6.push(boardArray[i+1][5-(i+a)]);      // the second row (boardArray[0][1])
      diagArray7.push(boardArray[i+2][5-(i+a)]);      // the down/right is pretty much the same except I needed it to
      diagArray8.push(boardArray[i+3][5-(i+a)]);      // start from the top (rowNum=5), so subtracting (i+a) from 5 gives that.

      diagArray1 = diagArray1.filter(function (el) {
        return el != null;
      });
      diagArray2 = diagArray2.filter(function (el) {
        return el != null;
      });
      diagArray3 = diagArray3.filter(function (el) {
        return el != null;
      });
      diagArray4 = diagArray4.filter(function (el) {
        return el != null;
      });
      diagArray5 = diagArray5.filter(function (el) {
        return el != null;
      });
      diagArray6 = diagArray6.filter(function (el) {
        return el != null;
      });
      diagArray7 = diagArray7.filter(function (el) {
        return el != null;
      });
      diagArray8 = diagArray8.filter(function (el) {
        return el != null;
      });
    }

    if (identical(diagArray1) || identical(diagArray2) || identical(diagArray3) || identical(diagArray4) || identical(diagArray5) || identical(diagArray6) || identical(diagArray7) || identical(diagArray8)) {
      if (isRedTurn) {
        redWin = true;
        return;
      }
      else {
        yellowWin = true;
        return;
      }
    }

  }   // end of big diag for loop

} // end of function

function boxClicked(box) {

  if (redWin || yellowWin) {
    return;
  }

  var colNum = box.parentElement.rowIndex;    // I inverted the table using css (lines 10, 11, 17) so the rowIndex is the colNum
                                              // it was just easier to picture/work with.
  var rowNum = 5 - boardArray[colNum].length; // this is so any box you click in a particular column will drop a div to the bottom or
                                              // onto the highest block. Note that rowNum isn't based off of "box" except for the column
  if (boardArray[colNum].length >= 6) {       // if the column is full, display the error message
    $("#errorMSG").show();
    setTimeout(errorMessage, 2000); // executes the function errorMessage after 2 seconds, which hides the message again.
    return;
  }
  else {
    var newPiece = document.createElement('div');
    var wholePage = document.getElementById('body');
    wholePage.appendChild(newPiece);
    newPiece.style.top = "132px";           // slightly above the top of the game board, so it can fall in
    var leftPixels = 537 + (colNum * 52);         // the number is weird because of the table's border--this places the div directly above the correct column
    newPiece.style.left = leftPixels + "px";      // css makes the position:absolute so I can use this
    moveObject(newPiece, (202 + (rowNum)*52));    // newPiece is the object to move, 202+rowNum*52 is the pixel value to move it to (places the div in the correct row)
                                                  // rowNum=0 is the top, so if the piece should stop in the first space, it will move to 202px (the first space)
    if (isRedTurn) {
      newPiece.setAttribute('class', 'redPiece');   // sets the class of red pieces, so I can style them easier
      boardArray[colNum][5-rowNum] = "RED";         // I inverted the boardArray (so boardArray[0][0] refers to the bottom left square)
    }
    else {
      newPiece.setAttribute('class', 'yellowPiece');
      boardArray[colNum][5-rowNum] = "YLW";
    }

    checkForWin();

    if (redWin) {
      boardArray[colNum] = [];    // so if you click more on a column you don't get the "column full" message
      $("body").css('background-color', 'rgba(255, 0, 0, 0.5)');
      $("#gameBoard").css('background-color', 'white');
      $("div").css('zIndex', '3');    // from w3 schools--puts the divs in front b/c I made the background of the table white (not clear)
      blinkR = setInterval(blinkRed, 500);  // shows Red Wins! for .75 sec, then hides for .75 sec, etc.
      function blinkRed() {
        $("#redWins").toggle();
      }
      return;
    }
    else if (yellowWin) {
      boardArray[colNum] = [];
      $("body").css('background-color', 'rgba(0, 255, 0, 0.5)');
      $("#gameBoard").css('background-color', 'white');
      $("div").css('zIndex', '3');
      blinkY = setInterval(blinkYel, 500);
      function blinkYel() {
        $("#yellowWins").toggle();
      }
      return;
    }

    if (isRedTurn) {
      isRedTurn = false;
    }
    else {
      isRedTurn = true;
    }
  }
}
