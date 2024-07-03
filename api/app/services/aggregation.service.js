class AggregationService {
    calculateAggregation = (arr, aggType) => {
        if (!Array.isArray(arr) || arr.length === 0) {
            // Optionally, you can choose to throw an error here.
            // throw new Error('Invalid input: arr must be a non-empty array.');
            return -1;
        }
    
        switch (aggType.toLowerCase()) {
            case 'mean':
                return this.calculateMean(arr);
            case 'median':
                return this.calculateMedian(arr);
            case 'mode':
                return this.calculateMode(arr);
            default:
                throw new Error('Invalid aggregation type: aggType must be "mean", "median", or "mode".');
        }
    }
    
    calculateMean = (arr) => {
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    }
    
    calculateMedian = (arr) => {
        const sortedArr = arr.slice().sort((a, b) => a - b);
        const midIndex = Math.floor(sortedArr.length / 2);
        
        if (sortedArr.length % 2 === 0) {
            // Even number of elements
            return (sortedArr[midIndex - 1] + sortedArr[midIndex]) / 2;
        } else {
            // Odd number of elements
            return sortedArr[midIndex];
        }
    }
    
    calculateMode = (arr) => {
        const frequencyMap = {};
        let maxCount = 0;
        let mode = arr[0];
    
        arr.forEach(item => {
            frequencyMap[item] = (frequencyMap[item] || 0) + 1;
            
            if (frequencyMap[item] > maxCount) {
                maxCount = frequencyMap[item];
                mode = item;
            }
        });
    
        return mode;
    }
}

module.exports = AggregationService;
