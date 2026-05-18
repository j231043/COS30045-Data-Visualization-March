// viewing data
// d3.csv("data/Ex5_TV_energy.csv", row => (
//     console.log(row)
// ));

// loading bar chart data with a row conversion function
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", row => ({
    screen_tech: row.Screen_Tech,
    energy_mean: +row["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesBar(data);  
    drawBars(data);
    addLegendBar(data);
});

// loading donut chart data with a row conversion function
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", row => ({
    screen_tech: row.Screen_Tech,
    energy_mean: +row["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesBar(data);  
    drawDonut(data);
    addLegendDonut(data);
});


// loading line chart data with a row conversion function
d3.csv("data/Ex5_ARE_Spot_Prices.csv", row => ({
    year: +row.Year,
    avg_price: +row["Average Price (notTas-Snowy)"]
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesLine(data);  
    drawLine(data);
    addLegendLine(data);
});

// loading scatter chart data with a row conversion function
d3.csv("data/Ex5_TV_energy.csv", row => ({
    star: +row.star2,
    energy: +row.energy_consumpt
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesScatterModels(data);  
    drawScatterModels(data);
    addLegendScatterModels(data);
});

// Load the histogram with a row conversion function
d3.csv("data/Ex6_TVdata.csv", row => ({
    brand: row.brand,
    model: row.model,
    screenSize: +row.screenSize,
    screenTech: row.screenTech,
    energyConsumption: +row.energyConsumption,
    star: +row.star
})).then(data => {
    // log the processed data to the console
    // console.log("Parsed data:", data);

    // call functions after data is loaded
    defineScalesScatterTech(data);  
    drawHistogram(data);
    addLegendHistogram(data);
    drawScatterTech(data);
    addLegendScatterTech(data);
    populateFilters(data);
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading the CSV file: ", error);
});