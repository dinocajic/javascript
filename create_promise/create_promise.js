class CreatePromise {

    constructor() {
        this.delay(1000)
            .then(()  => console.log("Hello"))
            .catch((err) => console.error(err));
    }

    /**
     * Returns a new promise after the specified timeout
     * If the value is not a number, it returns an error
     * @param {int} time 
     */
    delay(time) {
        return new Promise((resolve, reject) => {
            if (isNaN(time)) {
               return reject(new Error("Delay requires valid number"));
            }

            setTimeout(resolve, time);
        });
    }
}

let createPromise = new CreatePromise();