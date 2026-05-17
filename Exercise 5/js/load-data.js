// viewing data
// d3.csv("data/Ex5_TV_energy.csv", row => (
//     console.log(row)
// ));

// viewing bar chart data

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", row => ({
    screen_tech: row.Screen_Tech,
    energy_mean: +row["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesBar(data);  
    drawBars(data);
    addLegendBar(data);
});

d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", row => ({
    screen_tech: row.Screen_Tech,
    energy_mean: +row["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesBar(data);  
    drawDonut(data);
    addLegendDonut(data);
});



d3.csv("data/Ex5_ARE_Spot_Prices.csv", row => ({
    year: +row.Year,
    avg_price: +row["Average Price (notTas-Snowy)"]
})).then(data => {
    // console.log("Parsed data:", data);
    defineScalesLine(data);  
    drawLine(data);
    addLegendLine(data);
});

d3.csv("data/Ex5_TV_energy.csv", row => ({
    star: +row.star2,
    energy: +row.energy_consumpt
})).then(data => {
    console.log("Parsed data:", data);
    defineScalesScatter(data);  
    drawScatter(data);
    addLegendScatter(data);
});

