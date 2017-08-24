var inquirer = require('inquirer');
var fs = require('fs');
var ClozeCard = require('./cloze.js');
var BasicCard = require('./basic.js');

var currentDeck = {
        name : '',
        cards : []
    };
var deckIndex;

// Starts the process of making cards; begins with selecting the deck
function makeCards(allDecks, type, msg){
    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter the name of an existing deck you would like to work with, or the name of a new deck you would like to create.',
            name : 'deckName',
            validate: function(str){
                return str !== ''; //Can't be empty
              }
        }
    ]).then(function(response) {
        // If deck already exists, currentDeck gets the already existing deck object
        if(typeof allDecks[0] !== 'undefined') {
            var count = 0;
            allDecks.forEach(function(val, i){
                if (allDecks[i].name.toLowerCase() === response.deckName.toLowerCase()) {
                    currentDeck = allDecks[i];
                    deckIndex = i;
                    count++;
                    return;
                   
                } else if (count===0) {
                    deckIndex = allDecks.length;
                };
            });
        } else {
            deckIndex = 0;
        };
        currentDeck.name = response.deckName;   
        addCardPrompt(allDecks, type, msg);     
    });
};

// Confirms that you want to add a new card.
function addCardPrompt(allDecks, type, msg){
    inquirer.prompt([
        {
            type : 'confirm',
            message : 'Would you like to add a new card?',
            name : 'newCard',
            default : true
        }
    ]).then(function(response){
        if (response.newCard){
            addCard(allDecks, type, msg);
        }
        else {
            console.log('Okay. Restart the application to add cards to a different deck or to study the cards.');
        };
    });
};

// Takes inputs for the question and answer.
function addCard(allDecks, type, msg){
    inquirer.prompt([
        {
            type : 'input',
            message : msg.question,
            name : 'question',
            validate: function(que) {
                return que !== ''; //Can't be empty
              }
        },
        {
            type : 'input',
            message : msg.answer,
            name : 'answer',
            validate: function(ans) {
                return ans !== ''; //Can't be empty
              }
        }
    ]).then(function(response){
        if(type === 'basic') {
            var card = new BasicCard(response.question, response.answer);
        } else {
            var card = new ClozeCard(response.question, response.answer);
        };
        if(!card.found){
            console.log("That word is not in that statement. Try again.");
            addCard(allDecks, type, msg);
        } else {
            currentDeck.cards.push(card);
            allDecks[deckIndex] = currentDeck;
            console.log("Card added.");
            fs.writeFileSync('all-decks.txt', JSON.stringify(allDecks, null, 2));
            addCardPrompt(allDecks, type, msg);
        };
    }).catch(function(err){
        console.log(err);
    });
};

module.exports = makeCards;