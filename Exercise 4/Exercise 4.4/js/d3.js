d3.select("div ")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

d3.csv("/Exercise 4/Exercise 4.4/data/data.csv", d => {
  // console.log(d); 
  return {
    Screen_Tech: d.Screen_Tech,
    Avg_mode_power: +d.Avg_mode_power
  };
}).then(data => {
  console.log(data);
  }
);

CreateBarChart(data);

// const createBarChart = (data) => {