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


  
// 4.5 create the create bar chart
const svg45 = d3.select("#ex4-5-responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");


d3.csv("data/data.csv", d => {
  // console.log(d); 
  return {
    Screen_Tech: d.Screen_Tech,
    Avg_mode_power: +d.Avg_mode_power
  };
}).then(data => {
  console.log(data);
  createBarChart45(data);
  }
);
const barHeight45 = 50;

const createBarChart45 = data => {
  svg45
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
    return `bar bar-${d.Avg_mode_power}`;
   })
  .attr("width", d => d.Avg_mode_power)
  .attr("height", barHeight45)
  .attr("x", 0)
  .attr("y", (d, i) => (barHeight45 + 5) * i);
};


// 4.6 scaling
const svg46 = d3.select("#ex4-6-responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 100 200")
      .style("border", "1px solid black");

d3.csv("data/data.csv", d => {
  // console.log(d); 
  return {
    Screen_Tech: d.Screen_Tech,
    Avg_mode_power: +d.Avg_mode_power
  };
}).then(data => {
  console.log(data);
  createBarChart46(data);
  }
);
const barHeight46 = 50;

const createBarChart46 = data => {
  const xScale46 = d3.scaleLinear()
    .domain([0, 129])
    .range([0, 90]);

  const yScale46 = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, 200])
    .padding(0.1);

  svg46
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
    return `bar bar-${d.Avg_mode_power}`;
   })
  .attr("width", d => xScale46(d.Avg_mode_power))
  .attr("height", yScale46.bandwidth())
  .attr("x", 10)
  .attr("y", d => yScale46(d.Screen_Tech));
};

