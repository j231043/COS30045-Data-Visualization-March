const svg_scatter = d3.select("#scatter")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("border", "1px solid black");

// Make it so our chart is placed with origin at inner chart
const innerChartScatter = svg_scatter
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    
const drawScatter = data => {
    const aubergine = "#75485E";
    innerChartScatter
        .selectAll(".circle")
        .data(data)
        .join("circle")
        .attr("class", "circle")
        .attr("r", 4)
        .attr("cx", d => xScaleScatter(d.star))
        .attr("cy", d => yScaleScatter(d.energy))
        .attr("fill", aubergine);
}