// for bar and donut
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
    
     colorScaleBar
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
const xScaleScatterModels = d3.scaleLinear()
const yScaleScatterModels = d3.scaleLinear()
const defineScalesScatterModels = (data) => {
    const lastStar = d3.max(data, d => d.star);
    xScaleScatterModels
        .domain([1, lastStar])
        .range([0, innerWidth]);

    const maxEnergy = d3.max(data, d => d.energy);
    yScaleScatterModels
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

}

const xScaleScatterTech = d3.scaleLinear()
const yScaleScatterTech = d3.scaleLinear()
const colorScaleTech = d3.scaleOrdinal()

const defineScalesScatterTech = (data) => {
    const lastStar = d3.max(data, d => d.star);
    xScaleScatterTech
        .domain([0, lastStar])
        .range([0, innerWidth]);

    const maxEnergy = d3.max(data, d => d.energyConsumption);
    yScaleScatterTech
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    colorScaleTech
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

}

// histogram
const xScaleHist = d3.scaleLinear();
const yScaleHist = d3.scaleLinear();
