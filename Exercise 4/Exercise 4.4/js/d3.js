// 4.3 create container and basic rectangle
const svg43 = d3.select("#ex4-3-responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

svg43
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

// 4.4 read data from svg file, print data to console and start create bar chart function
const svg44 = d3.select("#ex4-4-responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

svg44
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

d3.csv("data/data.csv", d => {
  // console.log(d); 
  return {
    Screen_Tech: d.Screen_Tech,
    Avg_mode_power: +d.Avg_mode_power
  };
}).then(data => {
  console.log(data);
  }
);

// CreateBarChart(data);

// const createBarChart = (data) => {