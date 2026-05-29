// set dimensions and margins of chart
const svg_histogram = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]) 
    .style("border", "1px solid black");

// create inner chart group with margins
const innerChartHist = svg_histogram
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const drawHistogram = (data) => {
    // generate bins
    const bins = binGenerator(data); //save the bins into an array
    console.log(bins); // Log the bins to the console for debugging


    // define scales
    const minEnergy = bins[0].x0; // lower boundary
    const maxEnergy = bins[bins.length - 1].x1; // upper boundary
    // console.log (maxEnergy)
    const binsMaxLength = d3.max(bins, d => d.length)
    xScaleHist
        .domain([minEnergy, maxEnergy])
        .range([0, innerWidth]);
    yScaleHist
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // to round the y-axis values

    // draw the bars of the histogram
    innerChartHist
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScaleHist(d.x0))
            .attr("y", d => yScaleHist(d.length))
            .attr("width", d => xScaleHist(d.x1) - xScaleHist(d.x0))
            .attr("height", d => innerHeight - yScaleHist(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

    


}