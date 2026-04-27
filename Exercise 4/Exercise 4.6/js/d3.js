const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 100 200")
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
  const xScale = d3.scaleLinear()
    .domain([0, 129])
    .range([0, 90]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, 200])
    .padding(0.1);

  svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
    return `bar bar-${d.Avg_mode_power}`;
   })
  .attr("width", d => xScale(d.Avg_mode_power))
  .attr("height", yScale.bandwidth())
  .attr("x", 10)
  .attr("y", d => yScale(d.Screen_Tech));
};

