const addLegendBar = data => {
    const leftAxisBar = d3.axisLeft(yScaleBar)
    const bottomAxisBar = d3.axisBottom(xScaleBar)

    innerChartBar
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxisBar);
    innerChartBar
        .append("g")
        .call(leftAxisBar);
    innerChartBar
        .append("text")
        .text("Screen Technologies")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle");
    innerChartBar
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2) 
        .attr("y", -margin.left + 25) 
        .style("text-anchor", "middle")
        .text("Mean Energy Consumption (kWh/year)");
    innerChartBar
        .selectAll(".bar-label") 
        .data(data)             
        .join("text")
        .attr("class", "bar-label")
        .text(d => d3.format(".2f")(d.energy_mean))
        .attr("x", d => xScaleBar(d.screen_tech) + xScaleBar.bandwidth() / 2)
        .attr("y", d => yScaleBar(d.energy_mean)- 10)
        .style("text-anchor", "middle");
}

const addLegendDonut = data => {
    const arcs = donutContainer
        .selectAll(`.arc`)

    const labelArcGenerator = d3.arc()
        .innerRadius(200) 
        .outerRadius(200);

    arcs
        .append("text")
        .text(d => {
            const percentage = (d.endAngle - d.startAngle) / (2 * Math.PI);
            const techName = d.data.format; 
            const formattedPercent = d3.format(".0%")(percentage);
            return `${techName}: ${formattedPercent}`;
        })
        .attr("x", d => {
            d["centroid"] = labelArcGenerator
            .startAngle(d.startAngle)
            .endAngle(d.endAngle)
            .centroid();
            return d.centroid[0];
        })
        .attr("y", d => d.centroid[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#000000")
        .attr("fill-opacity", d => d.percentage< 0.05 ? 0 : 1)
        .style("font-size", "16px")
        .style("font-weight", 500);
}

const addLegendLine = data => {
    const firstYear = d3.min(data, d => d.year);
    const lastYear = d3.max(data, d => d.year);
    const aubergine = "#75485E";
    
    innerChartLine
        .append("text")
        .text("Average Price")
        .attr("x", xScaleLine(lastYear) - 30)
        .attr("y", yScaleLine(data[data.length - 1].avg_price)-50)
        .attr("fill", aubergine)
        .attr("dominant-baseline", "middle"); 

    const bottomAxisLine = d3.axisBottom(xScaleLine)
        .tickFormat(d3.format("d"));
    
    innerChartLine
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxisLine);

    const leftAxisLine = d3.axisLeft(yScaleLine);
    innerChartLine
        .append("g")
        .call(leftAxisLine);

    innerChartLine
        .append("text")
        .text("Year")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle");
    innerChartLine
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2) 
        .attr("y", -margin.left + 25) 
        .style("text-anchor", "middle")
        .text("Average price");
}

const addLegendScatter = data => {
    const lastStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energy);
    const aubergine = "#75485E";

    const bottomAxisScatter = d3.axisBottom(xScaleScatter)
    
    innerChartScatter
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxisScatter);

    const leftAxisScatter = d3.axisLeft(yScaleScatter);
    innerChartScatter
        .append("g")
        .call(leftAxisScatter);

    innerChartScatter
        .append("text")
        .text("Star Rating")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle");
    innerChartScatter
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2) 
        .attr("y", -margin.left + 25) 
        .style("text-anchor", "middle")
        .text("Energy consumption");
}