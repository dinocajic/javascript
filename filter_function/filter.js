class Filter {

    state = {
        data: ["Dino", "Frank", "Steve", "John"],
        filteredData: [],
        dataObjects: [
            {id: 1, name: "Dino"},
            {id: 2, name: "Frank"},
            {id: 3, name: "Steve"},
            {id: 4, name: "John"}
        ],
        filteredObjects: []
    };

    constructor() {
        console.log("Produce Filtered Data");
        this.produceFilteredData();

        console.log("Produce Filtered Objects");
        this.produceFilteredObjects();

        console.log("Copy with Filter");
        this.copyWithFilter();
    }
    
    /**
     * Loops through each data array value. If the element length 
     * is greater than 4 characters, that element is returned and 
     * stored in the filtered constant.
     * The filter constant is assigned to the filteredData property 
     * inside the state object.
     */
    produceFilteredData = () => {
        const filtered = this.state.data.filter(name => {
            return name.length > 4;
        });

        this.state.filteredData = filtered;

        console.log(this.state.filteredData);
    }

    /**
     * Cycles through each object in the dataObjects array.
     * The filter method accepts a function. If the function returns 
     * true, the object is added to the filtered constant.
     * The filtered constant is added to the filteredObjects property 
     * in the state object.
     */
    produceFilteredObjects = () => {
        const filtered = this.state.dataObjects.filter(obj => {
            return obj.name.length <= 4;
        });

        this.state.filteredObjects = filtered;

        console.log(this.state.filteredObjects);
    }

    /**
     * To prove a point, if you return true in the filter method,
     * the element will be copied over to the new array.
     */
    copyWithFilter = () => {
        const copy = this.state.filteredObjects.filter(() => {
            return true;
        });

        console.log(copy);
    }
}

let filter = new Filter();