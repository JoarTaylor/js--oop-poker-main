import {Dealer} from './dealer.js'
import {Player} from './player.js';
import {Validate} from './validate.js'

export class Game {
    constructor() {
        this.playersList =  [];
        this.gameDealer = new Dealer();
    }

    startGame = function(numPlayers, names, numCards, numRounds) {
            const myDealer = this.gameDealer;
            const myDeck = myDealer.newDeck;
            myDeck.reset();
            myDeck.shuffle();
            this.playersList = []; 

        for(let i = 0; i < numRounds; i++) {
            //start with a set amount of cards, then only deal as you have thrown
            if (i > 0) {
                numCards = 0;
            }
            this.addPlayers(numPlayers, names, numCards, myDeck)

            /////sub-par fix to solve wich players are included
            for(let i = 0; i < numPlayers; i++) {
                const cardIndexesToSwap = [2]
                console.log(this.playersList[i].playerName, {...this.playersList[i].displayHand()})
                this.playersList[i].throwCard(cardIndexesToSwap, myDeck)
                this.playersList[i].deal(cardIndexesToSwap.length, myDeck)
            }
            Validate.calculate(this.playersList, numPlayers);
        }
    }

    addPlayers = function(numPlayers, names, numCards, myDeck) {
        if(numPlayers < 2) {
            console.log('atleast 2 players required');
            return;
        }
    
        names.forEach(person => {
             const tempName = person;
             person = new Player();
             person.playerName = tempName;
             this.playersList.push(person);
        })  

        if(numCards != 0) {
        this.playersList.forEach(player => {
            player.deal(numCards, myDeck);
        })
    }
        return this.playersList;
    }
}