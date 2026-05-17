const svg_bar = d3.select("#bar")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("border", "1px solid black");

const innerChartBar = svg_bar
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const drawBars = data => {

  const bars = innerChartBar 
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(${xScaleBar(d.screen_tech)}, 0)`);

  bars
    .append("rect")
    .attr("class", d => `bar bar-${d.energy_mean}`)
    .attr("y", d => yScaleBar(d.energy_mean))
    .attr("width", xScaleBar.bandwidth())
    .attr("height", d => innerHeight - yScaleBar(d.energy_mean))
    .style("fill", d => colorScale(d.screen_tech));


};

