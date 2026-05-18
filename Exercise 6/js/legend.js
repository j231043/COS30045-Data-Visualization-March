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
        .attr("x", xScaleLine(lastYear) - 70)
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

const addLegendScatterModels = data => {
    const lastStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energy);
    const aubergine = "#75485E";

    const bottomAxisScatterModels = d3.axisBottom(xScaleScatterModels)
    
    innerChartScatterModels
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxisScatterModels);

    const leftAxisScatterModels = d3.axisLeft(yScaleScatterModels);
    innerChartScatterModels
        .append("g")
        .call(leftAxisScatterModels);

    innerChartScatterModels
        .append("text")
        .text("Star Rating")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle");
    innerChartScatterModels
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2) 
        .attr("y", -margin.left + 25) 
        .style("text-anchor", "middle")
        .text("Energy consumption");
}

const addLegendHistogram = data => {
    // construct the x-axis
    const bottomAxisHist = d3.axisBottom(xScaleHist);

    // Add the x-axis to the bottom of the chart relative to the inner chart
    innerChartHist
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxisHist);
    
    // Add the x-axis label
    innerChartHist
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle");

    // construct the y-axis
    const leftAxisHist = d3.axisLeft(yScaleHist);

    // Add the y-axis to the left of the chart relative to the inner chart
    innerChartHist
        .append("g")
        .call(leftAxisHist);

    // Add the y-axis label
    innerChartHist
        .append("text")
        .text("Frequency")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2) 
        .attr("y", -margin.left + 25) 
        .style("text-anchor", "middle");
}

const addLegendScatterTech = data => {
    const lastStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energy);
    const aubergine = "#75485E";

    const bottomAxisScatterTech = d3.axisBottom(xScaleScatterTech)
    
    innerChartScatterTech
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxisScatterTech);

    const leftAxisScatterTech = d3.axisLeft(yScaleScatterTech);
    innerChartScatterTech
        .append("g")
        .call(leftAxisScatterTech);

    innerChartScatterTech
        .append("text")
        .text("Star Rating")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle");
    innerChartScatterTech
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2) 
        .attr("y", -margin.left + 25) 
        .style("text-anchor", "middle")
        .text("Labeled Energy Consumption (kWh/year)");

    // legend container box
    // 1. Create a legend container box group and position it
    const legend = innerChartScatterTech.append("g")
        .attr("class", "legend-box")
        .attr("transform", `translate(${width - margin.right - 150}, ${margin.top})`);

    // 2. Get the unique list of screen technologies from colorscale's domain
    const categories = colorScaleTech.domain(); 

    // Bind the categories data to build individual legend items
    const legendItems = legend.selectAll(".legend-item")
        .data(categories)
        .join("g")
        .attr("class", "legend-item")
        // Space the items out vertically by 25 pixels
        .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    // 4. Append a colored rectangle/square for each category
    legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("rx", 2) 
        .attr("fill", d => colorScaleTech(d));

    // 5. Append the text label next to the square
    legendItems.append("text")
        .attr("x", 25) 
        .attr("y", 12) 
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .style("fill", "#333")
        .text(d => d);
    
}