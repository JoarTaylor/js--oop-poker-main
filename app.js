import {Player} from './player.js';
import {cardDeck} from './carddeck.js'
import {Dealer} from './dealer.js'
import {Validate} from './validate.js'
import {Game} from './game.js'


const firstDeck = new cardDeck();

firstDeck.reset();

firstDeck.shuffle();

console.log({...firstDeck.displayDeck()})

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

Slim.throwCard(Slim.throwAll(), firstDeck)
Luke.throwCard(Luke.throwAll(), firstDeck)

firstDeck.takeFromMuck(firstDeck);
console.log('deck complete', {...firstDeck.displayDeck()})
console.log('empty muck', firstDeck.muck)


console.log('slim after throw all', {... Slim.displayHand()})
console.log('luke after throw all', {... Luke.displayHand()})

console.log('Lukes hand: ', Luke.handValue());
console.log('Slims hand: ',  Slim.handValue());



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




Luke.deal(3, secondDeck);
console.log('Lukes hands from dealer +3 cards: ', {...Luke.displayHand()})

Slim.deal(3, secondDeck);
console.log('Slim hands from dealer +3 cards ', {...Slim.displayHand()})

Validate.calculate([Slim, Luke]);



const newestGame = new Game();

newestGame.startGame(5, ['Mark', 'Daniel', 'Anna', 'Henry', 'Joker'], 5, 3);




