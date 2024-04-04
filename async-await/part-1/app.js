// Numbers Facts  

let favNumber = 14;

let baseURL = "http://numbersapi.com";


// log data from a single call of favorite number.
async function getFavNumFact() {
    let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(data);
}

getFavNumFact();

// Log the data for 3 favorite numbers 

const favNumbers = [11, 3, 0];

async function getFavNumsFacts()  {
    let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
    console.log(data);
}

getFavNumsFacts();

// Display four facts about the favorite number.

async function displayFavNumFacts() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);        
    });
}
displayFavNumFacts();