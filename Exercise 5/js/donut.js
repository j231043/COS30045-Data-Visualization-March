const svg_donut = d3.select("#donut")
    .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");

const donutContainer = svg_donut
  .append("g")


const arcGenerator = d3.arc()
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)
    .innerRadius(100)
    .outerRadius(150)
    .padAngle(0.02)
    .cornerRadius(3);

const techs = ["LCD", "LED", "OLED"]

const drawDonut = data => {

  donutContainer
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const formattedData = data.map(d => {
    return {
      format: d.screen_tech,      
      energy_mean: d.energy_mean  
    };
  });
  
  console.log("formattedData", formattedData);

  const pieGenerator = d3.pie()
      .value(d => d.energy_mean)
      .sort(null); 
      
  const annotatedData = pieGenerator(formattedData);

  const arcs = donutContainer
    .selectAll(`.arc`)
    .data(annotatedData)
    .join("g")
    .attr("class", `arc`)        
  arcs
      .append("path")
      .attr("d", arcGenerator) 
      .attr("fill", d => colorScale(d.data.format));
      
      // to add actual value for arcs instead of percentage
      // arcs
      //     .append("text")
      //     .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
      //     .attr("text-anchor", "middle")
      //     .attr("alignment-baseline", "middle")
      //     .text(d => d.data.production);

     
    }
