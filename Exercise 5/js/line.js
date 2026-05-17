const svg_line = d3.select("#line")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("border", "1px solid black");

// Make it so our chart is placed with origin at inner chart
const innerChartLine = svg_line
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    
const drawLine = data => {
    console.log("Line Chart Data:", data)
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


// Overview of drawing line chart
// 1. Initialize a line generator, and set its x() and y() accessor functions
    // const lineGenerator = d3.line()
    // .x(d => xScale(d.date))
    // .y(d => yScale(d.ave_temp));
// 2. chain the line generator with the curve() accessor function, and set its curve interpolator. (optional)
    // const lineGenerator = d3.line()
    // .x(d => xScale(d.date))
    // .y(d => yScale(d.ave_temp))
    // .curve(d3.curveCatmullRom);
// 3. append an svg path element to your chart, and call the line generator to set its d attribute, passing the data as an argument
    // innerChart
    // .append("path")
    // .attr("d", lineGenerator(data))
    // .attr("fill", "none")
    // . attr("stroke", aubergine);


// // Drawing an area
// // Set up area generator
// const areaGenerator = d3.area()
//     .x(d => xScale(d.date))
//     .y0(d => yScale(d.min_temp))
//     .y1(d => yScale(d.max_temp));
// // x – calculates horizontal position of data point
// // y0 - lower edge of area
// // y1- upper edge of area

// // Append path determined by areaGenerator
// innerChart
//     .append("path")
//     .attr("d", areaGenerator(data))
//     .attr("fill", aubergine)
//     .attr("fill-opacity", 0.2)
//     .curve(d3.curveCatmullRom);

// // // D3 Axis generators: axisTop(), axisRight(), axisBottom(), axisLeft()
// // // Take scales as inputs
// // const bottomAxis = d3.axisBottom(xScale)
// //     .tickFormat(d3.timeFormat("%b")); // need to format ticks explicitly like this or else first month in axis is year instead of january

// // // Append the x-axis scale to innerChart
// // innerChart
// //     .append("g")
// //     .attr("class", "axis-x")
// //     .attr("transform", `translate(0, ${innerHeight})`) // Default axis at origin, so need to translate to put it at bottom
// //     .call(bottomAxis);

// // // Appending y-axis
// // const leftAxis = d3.axisLeft(yScale);
// // innerChart
// //     .append("g")
// //     .attr("class", "axis-y")
// //     .call(leftAxis);

// // // Adding axis labels
// // svg
// //     .append("text")
// //     .text("Temperature (°C)")
// //     .attr("y", 20);


// // // Draw a scatter plot
// // const aubergine = "#75485E";
// // innerChart
// //     .selectAll("circle")
// //     .data(data)
// //     .join("circle")
// //     .attr("r", 4)
// //     .attr("cx", d => xScale(d.date))
// //     .attr("cy", d => yScale(d.ave_temp))
// //     .attr("fill", aubergine);



// // // drawing the line
// // // d3.line()
// //     // .x(d => xScale(d.xValue)). <- horizontal position of each data point
// //     // .y(d => yScale(d.yValue); <- vertical position of each data point
// // // note: Default line generator is: .curve(d3.curveLinear) if dont use specific command to interpolate data points to curve. Reccommendation is to draw points firstm then check curve to represent them accurately
// //     // d3.curveBasics(): Underestimates sudden variations, will produce a cubic basis spline that passes through the first and last data point
// //     // d3.curveBundle(): straightens curve; produces a straighetened cubic basis spline
// //     // d3,curveCardinal: produces a cardinal spline that passes through each data point
// //     // d3.curveMonotoneX: Follows data points closely; produces a cubic spline that passes through each data point while preserving monotonicity in the vertical direction
// //     // d3.curveCatmullRom: Follows data points closely; produces a cardinal spline that passes through each data point
// //     // d3.curveStep: produces a step function passing through each data point and alternating horizontal and vertical lines
// // d3.curveStep
// // const lineGenerator = d3.line()
// //     .x(d => xScale(d.date))
// //     .y(d => yScale(d.ave_temp))
// //     .curve(d3.curveCatmullRom); // Interpolating data points to curve


// // innerChart
// //     .append("path")
// //     .attr("d", lineGenerator(data))
// //     .attr("fill", "none")
// //     .attr("stroke", aubergine);

// // // Overview of drawing line chart
// // // 1. Initialize a line generator, and set its x() and y() accessor functions
// //     // const lineGenerator = d3.line()
// //     // .x(d => xScale(d.date))
// //     // .y(d => yScale(d.ave_temp));
// // // 2. chain the line generator with the curve() accessor function, and set its curve interpolator. (optional)
// //     // const lineGenerator = d3.line()
// //     // .x(d => xScale(d.date))
// //     // .y(d => yScale(d.ave_temp))
// //     // .curve(d3.curveCatmullRom);
// // // 3. append an svg path element to your chart, and call the line generator to set its d attribute, passing the data as an argument
// //     // innerChart
// //     // .append("path")
// //     // .attr("d", lineGenerator(data))
// //     // .attr("fill", "none")
// //     // . attr("stroke", aubergine);


// // // Drawing an area
// // // Set up area generator
// // const areaGenerator = d3.area()
// //     .x(d => xScale(d.date))
// //     .y0(d => yScale(d.min_temp))
// //     .y1(d => yScale(d.max_temp));
// // // x – calculates horizontal position of data point
// // // y0 - lower edge of area
// // // y1- upper edge of area

// // // Append path determined by areaGenerator
// // innerChart
// //     .append("path")
// //     .attr("d", areaGenerator(data))
// //     .attr("fill", aubergine)
// //     .attr("fill-opacity", 0.2)
// //     .curve(d3.curveCatmullRom);



// // // Adding Labels - Average
// // // x - End of line -> lastDate (plus some padding)
// // // y - Find last row and access average temp
// // innerChart
// //     .append("text")
// //     .text("Average temperature")
// //     .attr("x", xScale(lastDate) + 10)
// //     .attr("y", yScale(data[data.length - 1].ave_temp))
// //     .attr("fill", aubergine)
// //     .attr("dominant-baseline", "middle"); // dominant-baseline refers to y position of the label in relation to the data point


// // // Adding Labels - Minimum
// // // Add label for minimum temperature
// // // Offset from Average temperature label
// // // idk: Label x and y position is 3 data points in form end of data set
// // // idk: Use + to get in desired position
// // innerChart
// //     .append("text")
// //     .text("Minimum temperature")
// //     .attr("x", xScale(data[data.length - 3].date) + 13)
// //     .attr("y", yScale(data[data.length - 3].min_temp) + 40)
// //     .attr("alignment-baseline", "hanging")
// //     .attr("fill", aubergine);

// // // Adding labels – Maximum
// // innerChart
// //     .append("text")
// //     .text("Maximum temperature")
// //     .attr("x", xScale(data[data.length - 3].date) + 13)
// //     .attr("y", yScale(data[data.length - 3].max_temp) + -30)
// //     .attr("fill", aubergine);

// // // Adding labels - Lines
// // innerChart
// //     .append("line")
// //     .attr("x1", xScale(data[data.length - 3].date))
// //     .attr("y1", yScale(data[data.length - 3].max_temp) + 3)
// //     .attr("x2", xScale(data[data.length - 3].date) + 10)
// //     .attr("y2", yScale(data[data.length - 3].max_temp) + -22)
// //     .attr("stroke", aubergine)
// //     .attr("stroke-width", 2);