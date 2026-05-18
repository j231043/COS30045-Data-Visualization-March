// Load the csv file with a row conversion function
d3.csv("data/Ex5_TV_energy.csv", row => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {
    // log the processed data to the console
    // console.log("Parsed data:", data);

    // call functions after data is loaded
    drawHistogram(data);
    populateFilters(data);
}).catch(error => {
    console.error("Error loading the CSV file: ", error);
});