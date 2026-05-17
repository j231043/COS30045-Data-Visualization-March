// for bar and donut
const xScaleBar = d3.scaleBand();   
const yScaleBar = d3.scaleLinear()
const colorScale = d3.scaleOrdinal();

const defineScalesBar = (data) => {
    xScaleBar
        .domain(data.map(d => d.screen_tech))
        .range([0, innerWidth])
        .padding(0.2);

    yScaleBar
        .domain([0, d3.max(data, d => d.energy_mean)])
        .range([innerHeight, 0])
        .nice();
    
     colorScale
        .domain(formatsInfo.map(f => f.id))
        .range(formatsInfo.map(f => f.color));
};

// for line
const xScaleLine = d3.scaleLinear()
const yScaleLine = d3.scaleLinear()
const defineScalesLine = (data) => {
    const firstYear = d3.min(data, d => d.year);
    const lastYear = d3.max(data, d => d.year);
    xScaleLine
        .domain([firstYear, lastYear])
        .range([0, innerWidth]);

    const maxVal = d3.max(data, d => d.avg_price);
    yScaleLine
        .domain([0, maxVal])
        .range([innerHeight, 0])
        .nice();

}

// for scatter
const xScaleScatter = d3.scaleLinear()
const yScaleScatter = d3.scaleLinear()
const defineScalesScatter = (data) => {
    const lastStar = d3.max(data, d => d.star);
    xScaleScatter
        .domain([1, lastStar])
        .range([0, innerWidth]);

    const maxEnergy = d3.max(data, d => d.energy);
    yScaleScatter
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

}