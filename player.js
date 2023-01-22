export class Player {
    constructor() {
        this.hand = [];
        this.playerName = '';   
        this.personalMuck = [];
        this.totalValue = 0;
    }

    deal = function(numberOfCards, currentDeck) {
        for(let i = 0; i < numberOfCards; i++) {
            let randomInt = Math.floor(Math.random() * currentDeck.deck.length);
            this.hand.push(currentDeck.deck[randomInt]);
            currentDeck.deck.splice(randomInt, 1);
        }
        return this.hand;
    }

    handValue = function() {
         this.totalValue = this.hand.reduce((acc, current) => {
            return acc + current.Value;
        }, 0)
        return `handvalue: ${this.totalValue}`;
    }

    throwCard = function(numThrown, currentDeck) {
        for(let i = 0; i < numThrown.length; i++) {
            currentDeck.muck.push(this.hand[numThrown[i]]);
            this.personalMuck.push(this.hand[numThrown[i]]);
        }

        let muckedCardsArr = [];

        for(let i = 0; i < numThrown.length; i++) {
            muckedCardsArr.push(this.hand[numThrown[i]]);
        }

        for(let i = muckedCardsArr.length - 1; i >= 0; i--) {
            let index = this.hand.findIndex(x => x == muckedCardsArr[i]);
            this.hand.splice(index, 1)
        }
    }

    throwAll = function() {
        const everyCardOnHand = [];
        for(let i = 0; i < this.hand.length; i++) {
            everyCardOnHand.push(i);
        }
        return everyCardOnHand;
    }

    displayHand = function() {
        return this.hand;
    }
}