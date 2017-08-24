var inquirer = require ('inquirer');

function studyCards(deck) {
    console.log("Studying \"" + deck.name + "\" deck.");
    shuffle(deck.cards);
    askQuestion(deck);
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

function askQuestion(deck) {
    if (deck.cards[0]) {
        inquirer.prompt([
            {
                type: 'input',
                message: deck.cards[0].question,
                name: 'answer'
            }
        ]).then(function(response) {
            if (response.answer.toLowerCase() === deck.cards[0].answer.toLowerCase()) {
                console.log('Correct!');
                if (deck.cards[0].statement) {
                    console.log(deck.cards[0].statement);
                };
                inquirer.prompt([
                    {
                        type : 'confirm',
                        message : 'Keep card in deck?',
                        name : 'keep',
                        default : true
                    }
                ]).then(function(response){
                    if(!response.keep){
                        deck.cards.splice(0,1);
                    } else {
                        keepInDeck(deck.cards);
                    };
                    askQuestion(deck);
                });
            } else if (response.answer ==='') {
                displayCorrectAns(deck);
                keepInDeck(deck.cards);
                askQuestion(deck);
            } else {
                console.log("Incorrect!");
                inquirer.prompt([
                    {
                        type : 'confirm',
                        message : 'Try again?',
                        name : 'tryAgain',
                        default : true
                    }
                ]).then(function(response){
                    if(response.tryAgain){
                        askQuestion(deck);
                    } else {
                        console.log("Correct answer:");
                        displayCorrectAns(deck);
                        keepInDeck(deck.cards);
                        askQuestion(deck);
                    };
                }).catch(function(err){
                    console.log(err);
                });
            };
        }).catch(function(err){
            console.log(err)
        });
    } else {
        console.log("You have studied all the cards in this deck. Restart the application to keep studying or to create more flashcards.");
    }
};

function keepInDeck(arr){
    var removed = arr.splice(0,1);
    arr.push(removed[0]);
    return arr;
};

function displayCorrectAns(deck){
    if (deck.cards[0].statement){
        console.log(deck.cards[0].statement);
    } else{
        console.log(deck.cards[0].answer);
    };
};

module.exports = studyCards;

