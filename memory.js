var MemGame = {};
MemGame.myImages = [];
MemGame.NUM_OF_IMAGES = 6;
MemGame.checker = [];

MemGame.createBoard = function () {

    for (var c = 0; c < MemGame.NUM_OF_IMAGES; c++) {  // Creating Array with  image numbers to shuffle
        MemGame.myImages.push(c + 1);
        MemGame.myImages.push(c + 1);
    }

    MemGame.shuffleArray(MemGame.myImages);  // calling the shuffle function that will return shuffled array

    var header = document.createElement("h1");
    header.innerText = "Welocme to ITC's Memory Game"
    document.body.appendChild(header);

    var newGame = document.createElement("button");
    newGame.innerText= "new game";
    newGame.className="newGameButton";
    newGame.addEventListener("click", function(){location.reload();});
    header.appendChild(newGame);

    var container = document.createElement("div");
    container.className = "mainBox";


    var counter = 0;  //this is a small cheat to allow the cards to be all appended regardles of the loop.

    for (var i = 0; i < 3; i++) {

        var row = document.createElement("div");
        row.className = "width";
        row.className = "span8";
        container.appendChild(row);

        for (var j = 0; j < 4; j++) {
            var card = document.createElement("div");
            card.className = "card";
            card.addEventListener("click", MemGame.cardCompare);
            card.setAttribute("data-img", MemGame.myImages[counter]);
            row.appendChild(card);
            counter++;

        }
    }

console.log(MemGame.myImages);
    document.body.appendChild(container);

}

var clickedCardsArray = [];
var youWon = 0;

MemGame.cardCompare = function (e) {
    e.target.style.backgroundImage = 'url(.' + '' + '/images/' + e.target.getAttribute("data-img") + '.jpg)';
    e.target.classList.add('clicked');
    clickedCardsArray.push(e.target);

    if (clickedCardsArray.length === 2) {
        console.log(clickedCardsArray[0].style.backgroundImage);
        console.log(clickedCardsArray[1].style.backgroundImage);
        if (clickedCardsArray[0].style.backgroundImage == clickedCardsArray[1].style.backgroundImage) {
            clickedCardsArray[0].classList.remove('.clicked');
            clickedCardsArray[1].classList.remove('.clicked');
            clickedCardsArray[0].classList.add('.answered');
            clickedCardsArray[1].classList.add('.answered');
            clickedCardsArray.length = 0;
            youWon+=1;
            if (youWon === 6){
               setTimeout(MemGame.resetBoard, 200);
            }
            return;
        }
        else if (clickedCardsArray[0].style.backgroundImage !== clickedCardsArray[1].style.backgroundImage) {
            setTimeout(MemGame.setIntervalFunc, 500);
        }
    }
}



MemGame.shuffleArray = function () {
    for (var i = MemGame.myImages.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = MemGame.myImages[i];
        MemGame.myImages[i] = MemGame.myImages[j];
        MemGame.myImages[j] = temp;
    }
}

MemGame.setIntervalFunc = function () {
    clickedCardsArray[0].style.backgroundImage = 'url(./images/texture.jpg)';
    clickedCardsArray[1].style.backgroundImage = 'url(./images/texture.jpg)';
    clickedCardsArray[0].classList.remove('.clicked');
    clickedCardsArray[1].classList.remove('.clicked');
    clickedCardsArray.length = 0;
    console.log("not equal");
    return;
}


MemGame.resetBoard = function () {
    var x = confirm("You Won! would you like to play again?");
    if (x==true) {
        location.reload();
    }
    else {
        alert("Thanks for playing, byebye");
    }
}

MemGame.createBoard();