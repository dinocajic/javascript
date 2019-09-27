class MapFunction {

    state = {
        data: [1, 2, 3, 4],
        results: [],
        dataObjectArray: [
            {id: 1, name: "Dino"}, 
            {id: 2, name: "Steve"}
        ],
        dataObjectArrayResults: []
    };

    constructor() {
        console.log("Double Array");
        this.doubleArray();
        
        console.log("Add Index to Array");
        this.addIndexToArray();

        console.log("Print an Array");
        this.printArray();

        console.log("Manipulate new array based on condition");
        this.conditionalArray();

        console.log("Update the state");
        this.updateState();

        console.log("Print object array");
        this.printObjectArray();

        console.log("Update Object State");
        this.updateObjectState();
    }

    /**
     * Cycles through the data inside the state.
     * Each item is stored inside the double constant with the same index value.
     * Before storing each item into the double constant, each item is multiplied by 2.
     */
    doubleArray = () => {
        const double = this.state.data.map(item => {
            return item * 2;
        });

        console.log(double);
    }

    /**
     * The map function can also pass the index value of the array element.
     * The index value (starting at 0) of the particular item is added to the item.
     * Each item is returned and stored in the addTo array.
     */
    addIndexToArray = () => {
        const addTo = this.state.data.map((item, i) => {
            return item + i;
        });

        console.log(addTo);
    }

    /**
     * The map item doesn't have to return anything.
     * We can loop through the array and print out each item.
     */
    printArray = () => {
        this.state.data.map(item => {
            console.log(item);
        });
    }

    /**
     * Loops through each data item and return the item to be stored in the constant x.
     * If the item is 3, it's multiplied by 5 and stored in x in the appropriate index location.
     */
    conditionalArray = () => {
        const x = this.state.data.map(item => {
            if ( item == 3 ) {
                item *= 5;
            }

            return item;
        });

        console.log(x);
    }

    /**
     * Cycles through each data item and multiplies each item by 10.
     * Stores each multiplied item into a results array.
     * Stores the new array into the results array inside the state object.
     */
    updateState = () => {
        const results = this.state.data.map(item => {
            return item * 10;
        });

        this.state.results = results;

        console.log(this.state.results);
    }

    /**
     * Cycles through each object in the dataObjectArray.
     * For each object, it displays the name property.
     */
    printObjectArray = () => {
        this.state.dataObjectArray.map(obj => {
            console.log("Name: " + obj.name);
        });
    }

    /**
     * Cycles through each object in the dataObjectArray.
     * Each object is returned and stored in the constant x.
     * If the name property of the current object in the loop is equal to Steve,
     * the name property is updated to John.
     * The dataObjectArrayResults is updated to contain the newly modified array of objects.
     */
    updateObjectState = () => {
        const x = this.state.dataObjectArray.map(obj => {
            if ( obj.name === "Steve" ) {
                obj.name = "John";
            }

            return obj;
        });

        this.state.dataObjectArrayResults = x;

        console.log(this.state.dataObjectArrayResults);
    }
}

let mapFunction = new MapFunction();