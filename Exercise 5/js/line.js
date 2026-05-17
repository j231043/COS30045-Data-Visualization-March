const svg_line = d3.select("#line")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("border", "1px solid black");

// Make it so our chart is placed with origin at inner chart
const innerChartLine = svg_line
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    
const drawLine = data => {
    const aubergine = "#75485E";
    innerChartLine
        .selectAll(".line-circle")
        .data(data)
        .join("circle")
        .attr("class", "line-circle")
        .attr("r", 4)
        .attr("cx", d => xScaleLine(d.year))
        .attr("cy", d => yScaleLine(d.avg_price))
        .attr("fill", aubergine);
    
    const lineGenerator = d3.line()
        .x(d => xScaleLine(d.year))
        .y(d => yScaleLine(d.avg_price))
        .curve(d3.curveCatmullRom); 


    innerChartLine
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", aubergine);
}

