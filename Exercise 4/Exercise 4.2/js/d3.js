
d3.select("div")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

const svg = d3.select(".responsive-svg-container")
    .append("svg")
        .attr("viewBox", "0 0 1200 1600")
            .style("border", "1px solid black");

d3.select("svg")
  .append("rect")
   .attr("x", 50)
   .attr("y", 50)
   .attr("width", 100)
   .attr("height", 30)
   .style("fill", "green");