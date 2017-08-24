//NEED TO SET UP USER VALIDATION FOR EMPTY STRINGS AS INQUIRER INPUTS AND MAKING SURE THAT THE CLOZE WORD IS IN THE CLOSE STATEMENT.

var makeCards = require ('./makeCards.js');
var fs = require('fs');
var studyCards = require ('./studyCards');

process.argv.splice(0,2);
var command = process.argv;
var allDecks =  [];

allDecks = fs.readFileSync('all-decks.txt', 'utf-8');
if (allDecks === ''){
    allDecks = [];
} else {
    allDecks = JSON.parse(allDecks);
};

if (command[0] === 'reset') {
    fs.writeFile('all-decks.txt', '');
} else if (command[0] ==='basic') {
    console.log('You\'ll be making basic cards');
    var msg = {
        question: "Question: ",
        answer: "Answer: "
    }
    makeCards(allDecks, command[0], msg);
} else if (command[0] ==='cloze') {
    console.log('You\'ll be making cloze cards');
    var msg = {
        question: "Full statement: ",
        answer: "Word to remove: "
    };
    makeCards(allDecks, command[0], msg);
} else {
    var deckIndex = -1;
    allDecks.forEach(function(value, index){
        if(typeof command[0] === 'undefined'){
            return;
        } else if (command[0].toLowerCase() === allDecks[index].name.toLowerCase()) {
            deckIndex = index;
        };
    });
    if (deckIndex > -1){ 
        studyCards(allDecks[deckIndex])
    } else {
        console.log('That command is not recognized. \nType "basic" to create basic cards. \nType "cloze" to create cloze cards. \nType the name of a deck to study that deck. \nType "reset" to delete all decks.')
    };
};
