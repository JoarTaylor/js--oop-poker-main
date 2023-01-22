import {cardDeck} from './carddeck.js'
export class Dealer {
    constructor() {
        this.newDeck = new cardDeck()
    }

    dealToPlayer = function(player, numCards, currentDeck) {
        player.deal(numCards, currentDeck)
    }
}

