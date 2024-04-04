// Deck of cards


$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // log data from a single card draw
    async function singleDraw() {
        let data = await $.getJSON(`${baseURL}/new/draw/`);
        let { suit, value} = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    // log data from 2 card draws from the same deck
    async function doubleDraw() {
        let firstCardData = await $.getJSON(`${baseURL}/new/draw`);
        let deckId = firstCardData.deck_id;
        let secondCardData = await $getJSON(`${baseURL}/${deckId}/draw/`);
        [firstCardData, secondCardData].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);            
        });
    }

    // Display cards stacking on top of eachother at the touch of a button.
    async function setUp() {
        let $btn = $('button');
        let $cardArea = $('#card-area');

        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $(`<img>`, {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (cardData.remaining === 0) $btn.remove();
        });
    }
    setUp();
});