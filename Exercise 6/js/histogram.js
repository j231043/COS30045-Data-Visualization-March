// set dimensions and margins of chart
const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]) 

// create inner chart group with margins
const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const drawHistogram = (data) => {

    // generate bins
    const bins = binGenerator(data); //save the bins into an array
    console.log(bins); // Log the bins to the console for debugging


    // define scales
    const minEng = bins[0].x0; // lower boundary
    const maxEng = bins[bins.length - 1].x1; // upper boundary
    const binsMaxLength = d3.max(bins, d => d.length)
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);
    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // to round the y-axis values

    // draw the bars of the histogram
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

    // construct the x-axis
    const bottomAxis = d3.axisBottom(xScale);

    // Add the x-axis to the bottom of the chart relative to the inner chart
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);
    
    // Add the x-axis label
    svg
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // construct the y-axis
    const leftAxis = d3.axisLeft(yScale);

    // Add the y-axis to the left of the chart relative to the inner chart
    innerChart
        .append("g")
        .call(leftAxis);

    // Add the y-axis label
    svg
        .append("text")
        .text("Frequency")
        .attr("x", 5)
        .attr("y", 20)
        .attr("class", "axis-label");


}