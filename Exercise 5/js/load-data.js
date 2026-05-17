// viewing data
// d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", row => (
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
    console.log("Parsed data:", data);
    defineScalesBar(data);  
    drawDonut(data);
    addLegendDonut(data);
});


