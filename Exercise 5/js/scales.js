const xScaleBar = d3.scaleBand();   
const yScaleBar = d3.scaleLinear()

const defineScales = (data) => {
    xScaleBar
        .domain(data.map(d => d.screen_tech))
        .range([0, innerWidth])
        .padding(0.2);

    yScaleBar
        // .domain([0, maxUpperBoundary])
        .domain([0, 1])
        .range([innerHeight, 0])
        // .nice()
        ;
};


