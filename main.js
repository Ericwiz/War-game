const playBtn = document.getElementById('btn-play');
const parentElemt = document.getElementById('display-image');
const drawCardBtn = document.getElementById('draw-cards');
const winner = document.getElementById('winner');
const cardRemaining = document.getElementById('card-remaining');
const computerScore = document.getElementById('score1')
const yourScore = document.getElementById('score2')
let Card1Score = 0;
let Card2Score = 0;
let deckId

function getCard() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id;
            console.log(deckId)

            cardRemaining.textContent = `Card Remaining: ${data.remaining}`;

            
                drawCardBtn.disabled = false
            
        })
}
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
// 'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/

playBtn.addEventListener('click', getCard)

drawCardBtn.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            parentElemt.children[0].innerHTML = `<img src="${data.cards[0].image}" />`
            
            parentElemt.children[1].innerHTML = `<img src="${data.cards[1].image}" />`

            determineCardWinner(data.cards[0], data.cards[1])

            cardRemaining.textContent = `Card Remaining: ${data.remaining}`;

            if (data.remaining === 0) {
                drawCardBtn.disabled = true
            } else {
                drawCardBtn.disabled = false
            }

            if (data.remaining === 0 && Card1Score > Card2Score) {
                computerScore.textContent = 'COMPUTER SCORE: ' 

                yourScore.textContent = 'YOUR SCORE: '
                return winner.textContent = "The Computer won the Game";
            } else if (data.remaining === 0 && Card2Score > Card1Score) {
                computerScore.textContent = 'COMPUTER SCORE: '

                yourScore.textContent = 'YOUR SCORE: ' 
                return winner.textContent = "Congratulation you won the Game!"
            } else if (data.remaining === 0 && Card2Score === Card1Score) {
                computerScore.textContent = 'COMPUTER SCORE: '

                yourScore.textContent = 'YOUR SCORE: ' 
                return winner.textContent = "Tie Game!"
            }
        })

        
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        Card1Score += 5
        computerScore.textContent = 'COMPUTER SCORE: ' + Card1Score;
        return winner.textContent = "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        Card2Score += 5
        yourScore.textContent = 'YOUR SCORE: ' + Card2Score;
        return winner.textContent = "You win!"
    } else {
        
        return winner.textContent = "War!"
    }
}




