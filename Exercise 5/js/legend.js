const addLegendBar = data => {
    innerChart_bar
        .append("text")
        // .attr("class", "graph-label")
        .text("Energy consumption for different screen technologies for 55-inch TVs ")
        .attr("x", -30)
        .attr("y", -30)

    const leftAxisBar = d3.axisLeft(yScaleBar)
    const bottomAxisBar = d3.axisBottom(xScaleBar)

    innerChart_bar
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxisBar);
    innerChart_bar
        .append("g")
        .call(leftAxisBar);
    innerChart_bar
        .selectAll(".bar-label") 
        .data(data)             
        .join("text")
        .attr("class", "bar-label")
        .text(d => d3.format(".2f")(d.energy_mean))
        .attr("x", d => xScaleBar(d.screen_tech) + xScaleBar.bandwidth() / 2)
        .attr("y", d => yScaleBar(d.energy_mean)- 10)
        .style("text-anchor", "middle");


}



    // years.forEach((year, index) => {
    //     const donutContainer = d3.select(`.year-group-${year}`);
   
    //     const arcs = donutContainer.selectAll(`.arc-${year}`);

    //     arcs
    //     .append("text")
    //     .text(d => {
    //         d["percentage"] = (d.endAngle - d.startAngle)/ (2 * Math.PI);
    //         return d3.format(".0%")(d.percentage);
    //     })
    //     .attr("x", d => {
    //         d["centroid"] = arcGenerator
    //         .startAngle(d.startAngle)
    //         .endAngle(d.endAngle)
    //         .centroid();
    //         return d.centroid[0];
    //     })
    //     .attr("y", d => d.centroid[1])
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "middle")
    //     .attr("fill", "#f6fafc")
    //     .attr("fill-opacity", d => d.percentage< 0.05 ? 0 : 1)
    //     .style("font-size", "16px")
    //     .style("font-weight", 500);

    //     donutContainer
    //         .append("text")
    //         .text(year)
    //         .attr("text-anchor", "middle")
    //         .attr("dominant-baseline", "middle")
    //         .style("font-size", "24px")
    //         .style("font-weight", 500);

    // })

    // const leftAxis = d3.axisLeft(yScale)
    //     // below for percentage on left axis, without then will show absolute value
    //     .tickFormat(d3.format(".0%"))
    //     .ticks(5)
    //     .tickSizeOuter(0);
    // const bottomAxis = d3.axisBottom(xScale)
    //     // below to ensure dont show label for every year 
    //     .tickValues(d3.range(1991, 2024,5))
    //     .tickSizeOuter(0);
    // innerChart
    //     .append("g")
    //     .attr("transform", `translate(0, ${innerHeight})`)
    //     .call(bottomAxis);
    // innerChart
    //     .append("g")
    //     .call(leftAxis);