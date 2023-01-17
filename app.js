
//////player
class Player {
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

class cardDeck extends Player{
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


const firstDeck = new cardDeck();

firstDeck.reset();

firstDeck.shuffle();

console.log({...firstDeck.displayDeck()})

//part 2
const Slim = new Player();
Slim.playerName = 'Slim'
const Luke = new Player();
Luke.playerName = 'Luke';

Luke.deal(5, firstDeck);
console.log('WRONG? normal hand', Luke.displayHand());
console.log('destructed luke hand', {... Luke.displayHand()});
console.log('Luke total handvalue: ', Luke.handValue())

Slim.deal(5, firstDeck);
console.log('WRONG? slims hand', Slim.displayHand());
console.log('destructed slim hand', {... Slim.displayHand()});
console.log('Slim total handvalue: ', Slim.handValue())

console.log('42 cards left in deck: ', {...firstDeck.displayDeck()})

//part 3
const throwArr = [3, 4];
Luke.throwCard(throwArr, firstDeck);

Slim.throwCard(throwArr, firstDeck);
console.log('slim after mucked', {... Slim.displayHand()})
console.log('luke after mucked', {... Luke.displayHand()})


console.log('Lukes hand: ', Luke.handValue());
console.log('Slims hand: ',  Slim.handValue());

Luke.deal(2, firstDeck);
Slim.deal(2, firstDeck);

console.log('38 cards left in deck: ', {...firstDeck.displayDeck()})

//part 4
Slim.throwCard(Slim.throwAll(), firstDeck)
Luke.throwCard(Luke.throwAll(), firstDeck)

firstDeck.takeFromMuck(firstDeck);
console.log('deck complete', {...firstDeck.displayDeck()})
console.log('empty muck', firstDeck.muck)


console.log('slim after throw all', {... Slim.displayHand()})
console.log('luke after throw all', {... Luke.displayHand()})

console.log('Lukes hand: ', Luke.handValue());
console.log('Slims hand: ',  Slim.handValue());

//part 5
class Dealer {
    constructor() {
        this.newDeck = new cardDeck()
    }

    dealToPlayer = function(player, numCards, currentDeck) {
        player.deal(numCards, currentDeck)
    }
}

const HarryTheDealer = new Dealer();

const secondDeck = HarryTheDealer.newDeck;
secondDeck.reset();

console.log('reset', {...secondDeck.deck})

secondDeck.shuffle();

console.log('shuffled', {...secondDeck.deck})

HarryTheDealer.dealToPlayer(Slim, 5, secondDeck)
console.log('Slim hands from dealer: ', {...Slim.displayHand()})


HarryTheDealer.dealToPlayer(Luke, 5, secondDeck)
console.log('Lukes hands from dealer: ', {...Luke.displayHand()})

//part 6

class Validate{
    constructor() {
    }

    static calculate(people) {
        const rankArr = people.sort((a, b) => {
            if((a.handValue() < b.handValue())) {
              return 1;
            }
        
            if((a.handValue() > b.handValue())) {
              return -1;
            }
          })

        console.log('the winner is ', rankArr[0].playerName, ' ', rankArr[0].handValue())
          
         const handsByValue = rankArr.map(hand => {
            return `${hand.playerName}, ${hand.handValue()}`
                }
         )

         people.forEach(person => {
            
         })

        return handsByValue;
    }
}

Luke.deal(3, secondDeck);
console.log('Lukes hands from dealer +3 cards: ', {...Luke.displayHand()})

Slim.deal(3, secondDeck);
console.log('Slim hands from dealer +3 cards ', {...Slim.displayHand()})

Validate.calculate([Slim, Luke]);

//part 7
class Game {
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
            Validate.calculate(this.playersList);
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

const newestGame = new Game();

newestGame.startGame(5, ['Mark', 'Daniel', 'Anna', 'Henry', 'Joker'], 5, 3);

//part 8


