/**
 * Created by Dino Cajic
 */
class Promise {

    constructor() {
        this.createContent();
    }

    /**
     * Random word getter
     * API KEY: GET_YOUR_OWN
     * https://random-word-api.herokuapp.com/word?key={my_api_key}&number={number_of_words}
     * https://random-word-api.herokuapp.com/word?key=GET_YOUR_OWN&number=1
     */
    _randomWordAPI = "https://random-word-api.herokuapp.com/word?key=GET_YOUR_OWN&number=1";

    /**
     * Get giphs
     * API KEY: GET_YOUR_OWN
     * http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5
     * http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=GET_YOUR_OWN&limit=5
     */
    _giphyAPI = "http://api.giphy.com/v1/gifs/search?api_key=GET_YOUR_OWN&limit=1&q=";

    /**
     * Fetches the word from the random word api
     * If the response is good, it grabs the JSON string
     * If the JSON object is good, it sends the word to the createParagraph() method and fetches the 
     *   gif from the giphy api using the word
     * If the response was good from giphy, the json string is retrieved.
     * If the JSON object is good, it grabs the image url and calls the createImage() method to display the image
     * If any error occurs along the way, the catch block will console log the error message
     */
    createContent() {
        fetch( this._randomWordAPI )
            .then( response => {
                return response.json(); 
            })
            .then( json => { 
                this.createParagraph(json);
                return fetch(this._giphyAPI + json);
            })
            .then( response => { 
                return response.json(); 
            })
            .then( json => { 
                this.createImage(json.data[0].images['fixed_height_small'].url); 
            })
            .catch( err => console.log(err) );
    }

    /**
     * Creates a paragraph on the screen and adds the randomly generated word to it
     * @param {String} word 
     */
    createParagraph(word) {
        let p    = document.createElement("p");
        let node = document.createTextNode(word);
        p.appendChild(node);
    
        document.body.appendChild(p);
    }

    /**
     * Creates an image with the specified URL
     * @param {String} url 
     */
    createImage(url) {
        let img = document.createElement("img");
        img.setAttribute("src", url);

        document.body.appendChild(img);
    }
}

// Instantiate object
let promise = new Promise();