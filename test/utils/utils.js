const assert = require('assert').strict
function deepEqualSkipProperty (expected, actual, skipProperty) { 

    // Check if array
    if(expected.length > 0) {
        // Create a shallow copy of the objects to avoid modifying the originals
        const expectedCopy = [...expected].map(item => {
            const newItem = {...item}
            // Remove the property to be skipped
            delete newItem[skipProperty]
            return newItem;
        });
        const actualCopy = [...actual].map(item => {
            const newItem = {...item}
            // Remove the property to be skipped
            delete newItem[skipProperty]
            return newItem;
        });
        // Perform the deep equality check on the modified objects
        assert.deepEqual(
            expectedCopy, 
            actualCopy
        );
    }
    else { //If not array
        const expectedCopy = {...expected}
        const actualCopy = {...actual}

        // Remove the property to be skipped
        delete expectedCopy[skipProperty]
        delete actualCopy[skipProperty]

        // Perform the deep equality check on the modified objects
        assert.deepEqual(
            expectedCopy, 
            actualCopy
        );
    }
    
}
module.exports = deepEqualSkipProperty;