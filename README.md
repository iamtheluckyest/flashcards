# Flashcards
Create and store flashcards with this command line app. Flashcards can be basic or cloze and can belong to a deck of your own making.  

## Getting Started
Install inquirer directly  
`npm install inquirer`  
or from the package.json  
`npm i`  

## Commands
Enter a command into the command line, then follow the prompts to start making decks and populating them with flashcards.  

### Create Basic Card
Basic cards are typical flashcards, with a question or other prompt on the "front" and answer on the "back." 

To start creating basic cards, type the following command:  
`node cli.js basic`

### Create Cloze Card
To make cloze cards, enter a full statement, such as "Vasco de Gama arrive in India in 1498", then choose a term to remove from the statement, such as "1498". When studying cloze cards, the app will remove the chosen word and display the statement without it.

To start creating cloze cards, type the following command:  
`node cli.js cloze`

### Study Cards
To study the flashcards, type the name of the deck that you want to study. If you don't have any decks, create some before using this command!

To start studying, type the following command, substituting the name of your deck for [deck]:  
`node cli.js [deck]`

### Delete Cards
To delete all your decks, type the following command:  
`node cli.js reset`
