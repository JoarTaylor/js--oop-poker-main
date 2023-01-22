export class Validate{
    constructor() {
    }

    static calculate(people, numPlayers) {
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
        
         
        //validate hands like in real poker.....
         for (let i = 0; i < numPlayers; i++) {
            const arr = []
            people[i].displayHand().forEach(person => {
                arr.push(person.Value)
            })
            console.log(arr)
            var a = arr.reduce(function (acc, curr) {
                if (typeof acc[curr] == 'undefined') {
                  acc[curr] = 1;
                } else {
                  acc[curr] += 1;
                }
              
                return acc;
              }, {});
              console.log(a)
              const myEntries = Object.entries(a);
              const maxArr = [];
              myEntries.forEach(([key, value]) => {
                maxArr.push(value);
              })
              const highestCombo = Math.max(...maxArr);

              console.log('Name: ', people[i].playerName)

              switch (highestCombo) {
                case 1: console.log('high hand'); break;
                case 2: console.log('one pair'); break;
                case 3: console.log('three of a kind'); break;
                case 4: console.log('quad'); break;
              }
         }


        return handsByValue;
    }
}