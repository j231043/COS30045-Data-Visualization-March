const svg_scatter_models = d3.select("#scatter_models")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("border", "1px solid black");

// Make it so our chart is placed with origin at inner chart
const innerChartScatterModels = svg_scatter_models
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    
const drawScatterModels = data => {
    innerChartScatterModels
        .selectAll(".circle")
        .data(data)
        .join("circle")
        .attr("class", "circle")
        .attr("r", 4)
        .attr("cx", d => xScaleScatterModels(d.star))
        .attr("cy", d => yScaleScatterModels(d.energy))
        .attr("fill", aubergine);
}



const svg_scatter_tech = d3.select("#scatter_tech")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("border", "1px solid black");

// Make it so our chart is placed with origin at inner chart
const innerChartScatterTech = svg_scatter_tech
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    
const drawScatterTech = data => {
    innerChartScatterTech
        .selectAll(".circle")
        .data(data)
        .join("circle")
        .attr("class", "circle")
        .attr("r", 4)
        .attr("cy", d => yScaleScatterTech(d.energyConsumption))
        .attr("fill", d => colorScaleTech(d.screenTech))
        .attr("opacity", 0.2)
        .attr("cx", d => xScaleScatterTech(d.star) + (Math.random() - 0.5) * 10);

}