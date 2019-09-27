class AsyncAwait {

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
     * Constructor
     * Calls the getContent() method, which returns the word and the image url.
     * It then displays the word and the image.
     * The content will be displayed in order since they're chained, but if we 
     *  add another createContent() that's not chained, then it will apear in 
     *  parallel.
     */
    constructor() {
        this.createContent()
            .then(results => {
                this.createParagraph(results.word);
                this.createImage(results.imgUrl);
                return this.createContent();
            })
            .then(results => {
                this.createParagraph(results.word);
                this.createImage(results.imgUrl);
            })
            .catch(err => console.error(err));

        this.createContent()
            .then(results => {
                this.createParagraph(results.word);
                this.createImage(results.imgUrl);
            })
            .catch(err => console.error(err));    
    }

    /**
     * Since we're using a method that uses await, we have to label that method async.
     * Fetches the word from the random word api
     * If the response is good, it grabs the JSON string
     * If the response was good from giphy, the json string is retrieved.
     * If the JSON object is good, it grabs the image url
     * Returns an object with random word and giphy image url
     */
    async createContent() {
        let wordResponse  = await fetch(this._randomWordAPI);
        let wordJson      = await wordResponse.json();
        let wordRandom    = wordJson;

        let giphyResponse = await fetch(this._giphyAPI + wordJson);
        let giphyJson     = await giphyResponse.json();
        let giphyImageUrl = giphyJson.data[0].images['fixed_height_small'].url;

        return {
            word: wordRandom,
            imgUrl: giphyImageUrl
        }
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

let asyncAwait = new AsyncAwait();
