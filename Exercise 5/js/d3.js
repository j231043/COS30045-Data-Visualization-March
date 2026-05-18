d3.select("div ")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 300 200")
      .style("border", "1px solid black");

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
    .range([0, 180]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, 200])
    .padding(0.1);

  // svg
  // .selectAll("rect")
  // .data(data)
  // .join("rect")
  

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.Screen_Tech)})`);
    

   barAndLabel
    .append("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.Avg_mode_power}`;
    })
    .attr("width", d => xScale(d.Avg_mode_power))
    .attr("height", yScale.bandwidth())
    .attr("x", 70)

    barAndLabel
    .append("text")
    .text(d => d.Screen_Tech)
    .attr("x", 60)
    .attr("y", 25)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "10px");

    barAndLabel
      .append("text")
      .text(d => d3.format(".2f")(d.Avg_mode_power))
      .attr("x", d => 75 + xScale(d.Avg_mode_power))
      .attr("y", 25)
      .style("font-family", "sans-serif")
      .style("font-size", "10px");
};

