const playBtn = document.getElementById('btn-play');
const parentElemt = document.getElementById('display-image');
const winner = document.getElementById('winner');
let deckId

function getCard() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id;
            console.log(deckId)
        })
}
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
// 'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/

playBtn.addEventListener('click', getCard)

document.getElementById('draw-cards').addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            parentElemt.children[0].innerHTML = `<img src="${data.cards[0].image}" />`
            
            parentElemt.children[1].innerHTML = `<img src="${data.cards[1].image}" />`

            determineCardWinner(data.cards[0], data.cards[1])
        })
    
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log("card 1:", card1ValueIndex)
    console.log("card 2:", card2ValueIndex)
    
    if (card1ValueIndex > card2ValueIndex) {
        return  winner.textContent = "Card 1 wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return winner.textContent = "Card 2 wins!"
    } else {
        return  winner.textContent = "War!"
    }
}



