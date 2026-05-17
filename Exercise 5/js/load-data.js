// viewing data
// d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", row => (
//     console.log(row)
// ));

// viewing bar chart data
// Object { Screen_Tech: "LCD", "Mean(Labelled energy consumption (kWh/year))": "326.00166666666667" }
// ​
// "Mean(Labelled energy consumption (kWh/year))": "326.00166666666667"
// Screen_Tech: "LCD"
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", row => ({
    screen_tech: row.Screen_Tech,
    energy_mean: +row["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    console.log("Parsed data:", data);
    defineScalesBar(data);  
    drawBars(data);
    addLegendBar(data);
});

