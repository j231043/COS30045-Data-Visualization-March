# Exercise 5 – Multi-Chart Webpage

## Aim
Create a variety of different chart types using **D3.js**.

## Purpose
In previous exercises, we created simple charts such as a horizontal bar chart. In this exercise, you will extend your skills by building multiple chart types and presenting them on a webpage.

This activity focuses on using **D3 to visualise different types of data** and understanding when different charts are appropriate.

## Charts to Create

Using the provided **TV energy consumption dataset** (or your own dataset), your webpage must include the following chart types:

- **Scatter Plot**  
  Energy consumption vs star rating.

- **Donut Chart**  
  Energy consumption for different screen technologies across all TVs combined.

- **Bar Chart**  
  Energy consumption for different screen technologies for **55-inch TVs only**.

- **Line Chart**  
  Spot power prices from **1998 to 2024** (either plot the average or include a line for each state).

You may use the **provided datasets** or your **own dataset**, but your webpage must include **one example of each chart type**.

## Preparation

Before starting this exercise, it is recommended that you:

- Review this week's **lecture slides**
- Review **Chapter 4 and Chapter 5 of Dufour and Meeks (2024)**

## Instructions

Use the **forked repository that you created earlier for this unit**.

1. Open your existing **forked repository**.
2. Navigate to the **Exercise 5 folder**.
3. Add your code and files for this exercise inside that folder.
4. Build a webpage that displays the required charts using **D3.js**.
5. Commit and push your changes regularly to your GitHub repository.

## Submission

Your **forked repository** will serve as your submission.

Ensure that:
- All Exercise 5 files are inside the **Exercise 5 folder**
- Your code is pushed to GitHub
- Your repository link is submitted through the submission system.


AI
prompt:
const svg_bar = d3.select("#bar")
    .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");

const innerChart_bar = svg_bar
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const drawBars = data => {
  const bars = svg_bar
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${xScaleBar(d.screen_tech)})`);
    
   bars
    .append("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.energy_mean}`;
    })
    .attr("x", d => xScaleBar(d.screen_tech))
    .attr("y", d => yScaleBar(d.energy_mean))
    .attr("width", d => xScaleBar.bandwidth())
    .attr("height", d => d.energy_mean)
}


Output:
It looks like your bars aren't rendering quite right because of a few common D3 mix-ups.

There are three main issues in your `drawBars` function:

1. **Appending to the wrong element:** You are appending the bars directly to `svg_bar` instead of your `innerChart_bar` (which has your margins applied).
2. **Confusing X and Y axes/scales:** You are using `xScaleBar` for both the positioning *and* the width, and setting the `height` directly to the data value (`d.energy_mean`) instead of calculating it using the scale and chart height.
3. **Redundant translation:** You are translating the group `g` element *and* trying to set `x` and `y` coordinates on the `rect` itself, which will throw off the positioning.

Here is the corrected and cleaned-up version of your code, assuming this is a **vertical bar chart**:

```javascript
const svg_bar = d3.select("#bar")
    .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");

// This is your inner plotting area (accounting for margins)
const innerChart_bar = svg_bar
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const drawBars = data => {
  // Calculate the actual width and height of the plotting area
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // 1. Bind data to 'g' elements appended to innerChart_bar
  const bars = innerChart_bar
    .selectAll(".bar-group")
    .data(data)
    .join("g")
    .attr("class", "bar-group")
    // Translate each group horizontally based on the screen tech
    .attr("transform", d => `translate(${xScaleBar(d.screen_tech)}, 0)`);
    
  // 2. Append the rect to the group
  bars
    .append("rect")
    .attr("class", d => `bar bar-${d.energy_mean}`)
    // x is 0 because the parent <g> is already translated to the correct X position
    .attr("x", 0) 
    // In D3, Y starts at the top (0) and goes down. 
    // This positions the top of the bar at its scaled value.
    .attr("y", d => yScaleBar(d.energy_mean))
    // The width is determined by the bandwidth of your categorical scale
    .attr("width", xScaleBar.bandwidth())
    // The height is the distance from the top of the bar to the bottom of the chart
    .attr("height", d => innerHeight - yScaleBar(d.energy_mean));
}

```

### Key Changes Explained

* **`innerWidth` & `innerHeight`:** When you use margins in D3, your scales should map to the inner dimensions of the chart, not the total SVG `width` and `height`.
* **The SVG Coordinate System:** In web browsers, $(0,0)$ is the top-left corner. To make a bar stand up from the bottom, its `y` position must be `yScaleBar(value)`, and its `height` must be `innerHeight - yScaleBar(value)`.
* **Group Translation:** By translating the `<g>` element using `.attr("transform", ...xScaleBar(d.screen_tech))`, you move the coordinate system for that specific bar. Inside that group, the rectangle's local `x` coordinate just needs to be `0`.


Q:
in load-data.js, have addLegendBar(data);

in legend.js, have:

const addLegendBar = data => {
    const leftAxisBar = d3.axisLeft(yScaleBar)
    const bottomAxisBar = d3.axisBottom(xScaleBar)
    innerChart_bar
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxisBar);
    innerChart_bar
        .append("g")
        .call(leftAxisBar);
    innerChart_bar
        .append("g")
        .text("test")
        .text(d => d3.format(".2f")(d.energy_mean))
        .attr("x", d => 75 + xScale(d.screen_tech))
        .attr("y", d => yScale(d.energy_mean)-20)
        .style("font-family", "sans-serif")
        .style("font-size", "10px");

}

why still Uncaught (in promise) TypeError: can't access property "energy_mean", d is undefined

A:
The `TypeError: d is undefined` is happening right here:

```javascript
innerChart_bar
    .append("g")
    .text("test")
    .text(d => d3.format(".2f")(d.energy_mean)) // <--- ERROR HERE

```

You are asking D3 to loop through data and read `d.energy_mean`, but you never actually gave the data to this element. In D3, you cannot use functions like `d => ...` unless you explicitly bind data using `.data(data)` first.

Additionally, you are trying to attach text attributes (`.text()`, `.attr("x")`, `.attr("y")`) directly to a `<g>` (group) element. In SVG, a `<g>` element doesn't support text properties or individual `x`/`y` positioning attributes directly. You need to append actual `<text>` elements.

Since it looks like you are trying to add data labels right above each individual bar (instead of a separate sidebar legend box), you need to use D3's full `.selectAll()`, `.data()`, and `.join()` pattern.

Here is the corrected version of your function:

```javascript
const addLegendBar = data => {
    // 1. Render the Axes
    const leftAxisBar = d3.axisLeft(yScaleBar);
    const bottomAxisBar = d3.axisBottom(xScaleBar);
    
    innerChart_bar
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxisBar);
        
    innerChart_bar
        .append("g")
        .call(leftAxisBar);

    // 2. Render Data Labels over each bar
    innerChart_bar
        .selectAll(".bar-label") // 1. Create a selection group name
        .data(data)              // 2. BIND THE DATA HERE so 'd' becomes available
        .join("text")            // 3. Create a <text> element for every object in the data array
        .attr("class", "bar-label")
        // Now 'd' is defined!
        .text(d => d3.format(".2f")(d.energy_mean)) 
        // Position the text horizontally over the center of each bar
        .attr("x", d => xScaleBar(d.screen_tech) + xScaleBar.bandwidth() / 2)
        // Position the text slightly above the top of each bar (-10px padding)
        .attr("y", d => yScaleBar(d.energy_mean) - 10)
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("text-anchor", "middle"); // Center-aligns the text precisely over the coordinates
}

```

### What changed?

1. **`.data(data).join("text")` was added:** This feeds your array to D3, making `d` accessible. It also changes the generated tag from a generic group container (`g`) to a literal browser-readable text tag (`text`).
2. **`xScaleBar` usage:** Replaced `xScale` and `yScale` with your exact variable names (`xScaleBar` and `yScaleBar`).
3. **Centered Alignment:** Used `xScaleBar.bandwidth() / 2` and `text-anchor: middle` to automatically center the numbers perfectly over your bars regardless of how wide your screen is, rather than using hardcoded pixel additions (like `75 + ...`).