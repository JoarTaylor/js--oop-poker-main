import {Player} from './player.js';


export class cardDeck extends Player{
    constructor() { 
        super();
        this.deck = [];
        this.muck = [];
    }

    reset = function() {
        this.deck = [];
        const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
        const values = [
            {'Name': 'A', 'Value': 14},
            {'Name': '2', 'Value': 2}, 
            {'Name': '3', 'Value': 3}, 
            {'Name': '4', 'Value': 4}, 
            {'Name': '5', 'Value': 5}, 
            {'Name': '6', 'Value': 6}, 
            {'Name': '7', 'Value': 7}, 
            {'Name': '8', 'Value': 8}, 
            {'Name': '9', 'Value': 9}, 
            {'Name': '10', 'Value': 10}, 
            {'Name': 'J', 'Value': 11}, 
            {'Name': 'Q', 'Value': 12}, 
            {'Name': 'K', 'Value': 13}
        ]
        
        suits.forEach( (suit) => {
            values.forEach((value) => {
                this.deck.push({'Name': `${suit} of ${value.Name}`, 'Suit': suit, 'Value': value.Value});
            })
        })
    }

    shuffle = function() {
            for (var i = this.deck.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));        
                var temp = this.deck[i];
                this.deck[i] = this.deck[j];    
                this.deck[j] = temp;
            }
            return this.deck;
         }

    takeFromMuck = function(currentDeck) {
        this.muck.forEach(card => {
            this.deck.push(card);
        });  
        currentDeck.muck = [];
    }

    displayDeck = function() {
        return this.deck;
    }
}