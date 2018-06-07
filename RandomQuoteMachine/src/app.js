// Classes always use strict mode
"use strict";

class App {
    constructor(){
        this.author = document.querySelector('.random-quote-author');
        this.quote = document.querySelector('.random-quote-text');
    }
    /* Methods */
    getQuote() {
        fetch('https://random-quote-generator.herokuapp.com/api/quotes/random')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.quote.innerHTML = data.quote;
                this.author.innerHTML = `- ${data.author}`;
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    }
    getTweet() {
        const tweetText = `${this.quote.textContent}  ${this.author.textContent}`;
        const tweetLink = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText);
        window.open(tweetLink,'_blank');
    }
}

/* Create a new instance of app */
const RandomQuote = new App();
/* Add event listeners to buttons */
const Quote = document.querySelector('.btn-random-quote');
Quote.addEventListener('click', () => RandomQuote.getQuote());
const Tweet = document.querySelector('.btn-random-tweet');
Tweet.addEventListener('click', () => RandomQuote.getTweet());
