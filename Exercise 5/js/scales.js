const xScaleBar = d3.scaleBand();   
const yScaleBar = d3.scaleLinear()
const colorScaleBar = d3.scaleOrdinal();

const defineScalesBar = (data) => {
    xScaleBar
        .domain(data.map(d => d.screen_tech))
        .range([0, innerWidth])
        .padding(0.2);

    yScaleBar
        .domain([0, d3.max(data, d => d.energy_mean)])
        .range([innerHeight, 0])
        .nice();

};


