// set dimensions and margins
const margin = {top:40, right: 30, bottom: 50, left: 70};
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// color for donut chart
const formatsInfo = [
    {id: "LCD", label: "LCD", color: "#efff10"},
    {id: "LED", label: "LED", color: "#4CDDF7"},
    {id: "OLED", label: "OLED", color: "#ff0000"},
];
    
// color for bars
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0"

const aubergine = "#75485E";

// create a bin generator using d3.bin
const binGenerator = d3.bin() 
    .value(d => d.energyConsumption); // accessor for energy consumption

// Make filter options accessible globally, and for filters to know:
// 1. what filters we need
// 2. what to put on the label
// 3. what state they are in to start with
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false },
];

const tooltipWidth = 150;
const tooltipHeight = 32;