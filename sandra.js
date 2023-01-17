class cardDeck {
    constructor(deck = [], muck = []) {
        this.deck = deck;
        this.muck = muck;
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
                this.deck.push({'Name': `${suit} of ${value.Name}`, 'Value': value.Value});
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

    takeFromMuck = function() {
        this.muck.forEach(card => {
            this.deck.push(card);
        });  
        game1.muck = [];
    }

    displayDeck = function() {
        return this.deck;
    }
}


//////player
class Player {
    constructor() {
        this.hand = [];
        this.personalMuck = [];
        this.totalValue = 0;
    }

    deal = function(numberOfCards, game) {
        console.log(game.deck)
        for(let i = 0; i < numberOfCards; i++) {
            let randomInt = Math.floor(Math.random() * game.deck.length);
            this.hand.push(game.deck[randomInt]);
            game.deck.splice(randomInt, 1);
        }
        return this.hand;
    }

    handValue = function() {
         this.totalValue = this.hand.reduce((acc, current) => {
            return acc + current.Value;
        }, 0)
        return `handvalue: ${this.totalValue}`;
    }

    throwCard = function(numThrown, game) {
        for(let i = 0; i < numThrown.length; i++) {
            game.muck.push(this.hand[numThrown[i]]);
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
        console.log('muck', game1.muck)
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

const game1 = new cardDeck();

game1.reset();

game1.shuffle();

//console.log(game1.displayDeck())

const Slim = new Player();
const Luke = new Player();

//console.log(game1)

Luke.deal(5, game1);
const showLukesHAnd = {... Luke.displayHand()}
console.log('luke hand', Luke.displayHand());
console.log('Luke total handvalue: ', Luke.handValue())

// Slim.deal(5, game1);
// console.log('slims hand', Slim.displayHand());
// console.log('Slim total handvalue: ', Slim.handValue())

//console.log('42 cards left in deck: ', game1.displayDeck())

const throwArr = [3, 4];
Luke.throwCard(throwArr, game1);

//Slim.throwCard(throwArr);
//console.log('slim after mucked', Slim.displayHand())
console.log('luke after mucked', Luke.displayHand())


// console.log('Lukes hand: ', Luke.handValue());
// console.log('Slims hand: ',  Slim.handValue());

// Luke.deal(2, game1);
// Slim.deal(2, game1);

// console.log('38 cards left in deck: ', game1.displayDeck())

// //part 4
// Slim.throwCard(Slim.throwAll())
// Luke.throwCard(Luke.throwAll())
// game1.takeFromMuck();
// console.log('deck complete', game1.displayDeck())
// console.log('empty muck', game1.muck)

// console.log('Personal muck', Slim.personalMuck)
// console.log('Personal muck', Luke.personalMuck);

// console.log('Lukes hand: ', Luke.handValue());
// console.log('Slims hand: ',  Slim.handValue());

// //part 5
// class Dealer extends cardDeck {
//     constructor() {
//         super();
//     }
// }

//const HarryTheDealer = new Dealer();






