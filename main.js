//created a global variable for the deck id 
let deckId = ''

//created a fetch that grabs the deck id on page load
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') //here you shuffle deck and get one card
.then(res => res.json()) // parse response as JSON
.then(data => {
    console.log(data)
    deckId = data.deck_id //Here you assign the deck_id to the variable deckId (So that you can retrieve that deck and a couple cards from it)
})
.catch(err => {
    console.log(`error ${err}`)
});

//added an event listener to the button that draws the cards
document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2` //here you retrieve the 2 cards

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image //Here you are just displaying the images in the page (.image is a property given by the api)
        document.querySelector('#player2').src = data.cards[1].image

        let player1Val = convertToNum(data.cards[0].value) //CONVERT TO NUMBER FUNCTION DOWN BELOW because of the aces, kings etc, if not number
        let player2Val = convertToNum(data.cards[1].value)

        if(player1Val > player2Val){ //This is are your conditionals to see which of the players got a higher card
          document.querySelector('h3').innerText = 'Player 1 Wins'
        }else if(player1Val < player2Val){
          document.querySelector('h3').innerText = 'Player 2 Wins'
        }else{
          document.querySelector('h3').innerText = 'Time for War!'
        }

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function convertToNum(val){
    if(val === 'ACE'){
        return 14
    }else if(val === 'KING'){
        return 13
    }else if(val === 'QUEEN'){
        return 12
    }else if(val === 'JACK'){
        return 11
    }else{
        return Number(val)
    }
}
