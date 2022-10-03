const playBtn = document.getElementById('btn-play');
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
                let img = `
                    <img src="${data.cards[0].image}" />
                    <img src="${data.cards[1].image}" />
                `
                document.getElementById('display-image').innerHTML += img;
        })
    
})


