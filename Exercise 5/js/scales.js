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

const xScaleLine = d3.scaleLinear()
const yScaleLine = d3.scaleLinear()

// for line
const defineScalesLine = (data) => {
    const firstYear = d3.min(data, d => d.year);
    const lastYear = d3.max(data, d => d.year);
    const aubergine = "#75485E";
    xScaleLine
        .domain([firstYear, lastYear])
        .range([0, innerWidth]);

    const maxVal = d3.max(data, d => d.avg_price);
    yScaleLine
        .domain([0, maxVal])
        .range([innerHeight, 0])
        .nice();

}