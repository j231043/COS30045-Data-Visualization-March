const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// svg
//   .append("rect")
//     .attr("x", 10)
//     .attr("y", 10)
//     .attr("width", 414)
//     .attr("height", 16)
//     .attr("fill", "blue");


d3.csv("/Exercise 4/Exercise 4.5/data/data.csv", d => {
  // console.log(d); 
  return {
    Screen_Tech: d.Screen_Tech,
    Avg_mode_power: +d.Avg_mode_power
  };
}).then(data => {
  console.log(data);
  createBarChart(data);
  }
);
const barHeight = 50;

const createBarChart = data => {
  svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
    return `bar bar-${d.Avg_mode_power}`;
   })
  .attr("width", d => d.Avg_mode_power)
  .attr("height", barHeight)
  
};

