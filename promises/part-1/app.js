let favNumber = 14;

let baseURL = "http://numbersapi.com";

// Get JSON from api for favorite number.
$.getJSON(`${baseURL}/${favNumber}?json`)
    .then(data => {
        console.log(data);
    }
).catch(err => console.log(err));

// Get JSON from api for rest of favorite numbers.
let favNumbers = [11, 3, 0];
$.getJSON(`${baseURL}/${favNumbers}?json`)
    .then(data => {
        console.log(data);
    }
).catch(err => console.log(err));

// Make promise for data for  favorite number and append to page.
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${baseURL}/${favNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("ul").append(`<li>${data.text}</li>`));
}).catch(err => console.log(err));
