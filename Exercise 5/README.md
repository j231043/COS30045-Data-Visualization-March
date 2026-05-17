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


Q:
data:
0: Object { screen_tech: "LCD", energy_mean: 306.49623867952073 }
​
1: Object { screen_tech: "LED", energy_mean: 355.67927199496165 }
​
2: Object { screen_tech: "OLED", energy_mean: 533.0641742418338 }

want to create single donut

const techs = ["LCD", "LED", "OLED"]

const drawDonut = data => {
  const formattedData = []
  
  techs.forEach(tech => {
    formattedData.push({
      format: tech,
      energy_mean: d.energy_mean[tech]
  });

  })
  console.log("formattedData", formattedData)

}
how to format array to input into d3.pie()

Q:
To create a **single** donut chart comparing the three technologies against each other, your `formattedData` array needs to look like a list of three distinct objects (one for LCD, one for LED, and one for OLED).

The issue in your current loop is `d.energy_mean[tech]`. The variable `d` isn't defined there, and your data is structured as an array of rows, not an object indexed by technology names.

Instead of looping through your hardcoded `techs` array and trying to search, you can map your incoming `data` array directly into the format D3 needs.

Here is the exact way to format your array and feed it to `d3.pie()`:

```javascript
const drawDonut = data => {
  // 1. Map the loaded data directly to the structural format D3 expects
  const formattedData = data.map(d => {
    return {
      format: d.screen_tech,      // This will be "LCD", "LED", or "OLED"
      energy_mean: d.energy_mean  // This holds the numeric value
    };
  });
  
  console.log("formattedData", formattedData);
  /* 
    This will perfectly output:
    [
      { format: "LCD", energy_mean: 306.496... },
      { format: "LED", energy_mean: 355.679... },
      { format: "OLED", energy_mean: 533.064... }
    ]
  */

  // 2. Setup your single pie layout generator
  const pieGenerator = d3.pie()
      .value(d => d.energy_mean) // Tell D3 to look at the energy numbers to calculate angles
      .sort(null);               // Keeps the data in the original order (LCD -> LED -> OLED)
  
  // 3. Generate the angles (startAngle, endAngle) for each slice
  const annotatedData = pieGenerator(formattedData);

  // 4. Center your single donut chart directly in the middle of your SVG
  const centerG = svg_donut
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // 5. Draw the donut arcs
  const arcs = centerG
      .selectAll(".arc")
      .data(annotatedData)
      .join("g")
      .attr("class", "arc");        
  
  arcs
      .append("path")
      .attr("d", arcGenerator) // Uses your existing arcGenerator config (inner/outer radius)
      .attr("fill", d => colorScale(d.data.format)); // e.g., coloring by tech type ("LCD")
};

```

### What changed?

* **`data.map()`:** This eliminates the need for the `techs.forEach` loop entirely. It loops through your 3-row data array and translates it into a new array of objects cleanly.
* **`d.data.format`:** When `pieGenerator` processes your data, it wraps your original objects into a new D3 layout object. Your custom properties move down into a `.data` key, which is why your color scale lookup becomes `d.data.format`.

Q:
why ${innerHeight / 2}) is still not in middle of box?

A:
Even after fixing the brackets, shifting by `${innerWidth / 2}, ${innerHeight / 2}` will still leave your donut off-center.

This happens because of a mismatch between the coordinates of your inner container and the total width and height of the outer SVG box.

Here are the two reasons why it's not landing perfectly in the middle:

### 1. The Container Margin Shift Offset

When you created `donutContainer`, you already shifted it right and down by your margins:

```javascript
const donutContainer = svg_donut
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

```

If you later apply a second `.attr("transform", ...)` to `donutContainer`, **you overwrite that original margin shift completely**.

Furthermore, `innerWidth` and `innerHeight` represent only the *plotting area* (the space inside the margins). The exact center of your entire black border box is simply half of the **total SVG dimensions**: `width / 2` and `height / 2`.

### 2. SVG Transform Overwriting

In D3, if you run `.attr("transform", ...)` on the same element twice, the second one deletes the first one. It doesn't add them together.

---

### The Two Ways to Position It Perfectly

Choose **one** of these two methods to center your donut:

#### Method A: Center it globally (Easiest & Cleanest)

If this SVG is only holding your donut chart, get rid of the margin shifting completely. Set the center coordinate directly on the container when you create it at the top of your file using `width` and `height`:

```javascript
// At the top of your file:
const donutContainer = svg_donut
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Inside your drawDonut function:
// Delete the donutContainer.attr("transform", ...) line entirely! 
// It is already centered.

```

#### Method B: Mathematical Addition (If you must keep margins)

If you need to keep your margins active (for instance, if you are planning to add a legend box inside the margins later), you must include those margins in your translation math inside the `drawDonut` function:

```javascript
const drawDonut = data => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Math formula: Margin Shift + (Inner Dimension / 2)
  const centerX = margin.left + (innerWidth / 2);
  const centerY = margin.top + (innerHeight / 2);

  donutContainer
    .attr("transform", `translate(${centerX}, ${centerY})`);
    
  // ... rest of your code
};

```

Using either of these approaches will account for the missing spacing and lock your donut directly into the true geometric center of your black border box.

Q:
 
  arcs
      .append("path")
      .attr("d", arcGenerator)
      .data(data) 
      .attr("fill", d => colorScale(d.data.format));
      
TypeError: can't access property "format", d.data is undefined

A:
The `TypeError: d.data is undefined` error is happening because you accidentally overwrote D3's pie chart calculation data by adding `.data(data)` directly to the path injection.

Take a look at this part of your code:

```javascript
arcs
  .append("path")
  .attr("d", arcGenerator)
  .data(data) // <--- CRITICAL ERROR: This overwrites the pie data!
  .attr("fill", d => colorScale(d.data.format));

```

### What went wrong?

When you created the `arcs` group using `.data(annotatedData)`, D3 created layout objects that look like this: `{ startAngle: ..., endAngle: ..., data: { format: "LCD", energy_mean: 306.49 } }`.

By adding `.data(data)` right inside the path chain, you stripped away all those computed angles and the layout information, forcing the path to read your raw source data array instead. Because your raw data objects only have `screen_tech` and `energy_mean` on them, `d.data` completely disappears, causing the app to crash when setting the `.attr("fill")`.

### The Fix

Remove that `.data(data)` line completely. The path elements automatically inherit the correct layout data from their parent `g` (`arcs`).

You also need to apply a positioning transform to `donutContainer` to center your chart, otherwise, your donut will be clipped by the top-left corner of your SVG borderbox.

Here is the clean, working version of your code:

```javascript
const svg_donut = d3.select("#donut")
    .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");

// FIXED: Center the chart container directly in the middle of your SVG coordinate box
const donutContainer = svg_donut
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const arcGenerator = d3.arc()
    .innerRadius(60)
    .outerRadius(100)
    .padAngle(0.02)
    .cornerRadius(3);

const drawDonut = data => {
  const formattedData = data.map(d => {
    return {
      format: d.screen_tech,      
      energy_mean: d.energy_mean  
    };
  });

  const pieGenerator = d3.pie()
      .value(d => d.energy_mean)
      .sort(null); 
      
  const annotatedData = pieGenerator(formattedData);

  const arcs = donutContainer
    .selectAll(".arc")
    .data(annotatedData)
    .join("g")
    .attr("class", "arc");        

  arcs
      .append("path")
      .attr("d", arcGenerator) // Automatically reads the angles passed down from 'arcs'
      // FIXED: Removed the stray .data(data) loop breaker
      .attr("fill", d => colorScale(d.data.format)); 
};

```

### Note on Arc Generators

You don't need to specify `.startAngle(d => d.startAngle)` and `.endAngle(d => d.endAngle)` explicitly inside your `d3.arc()` configurations anymore. D3's arc generator is smart enough to look for keys named precisely `startAngle` and `endAngle` inside the data array returned by `pieGenerator` by default!


Q:
arcs
        .append("text")
        .text(d => {
            d["percentage"] = (d.endAngle - d.startAngle)/ (2 * Math.PI), d["tech"] =  d.screen_tech;
            return d3.format(".0%")(d.percentage, d["tech"]);
        })

A:
The reason your percentage is rendering but your technology text isn't showing up comes down to how `d3.format` works.

The `d3.format` function **only formats numbers**—it does not support printing multiple arguments or strings like a standard `console.log` or template literal. When you pass `d["tech"]` as the second argument to `d3.format(".0%")(value, tech)`, it completely ignores it.

Additionally, `d.screen_tech` is `undefined` at this step. Remember that inside the `arcs` loop, the `d3.pie()` generator has nested your original data fields inside a property called **`d.data`**. So, to grab the technology name, you need to call `d.data.screen_tech`.

Here is how to clean up that state mutation inside your loops and format the string cleanly using a standard JavaScript template literal:

```javascript
arcs
    .append("text")
    // Calculate the coordinates to place the text precisely in the center of each slice
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .text(d => {
        // 1. Calculate the percentage value
        const percentage = (d.endAngle - d.startAngle) / (2 * Math.PI);
        
        // 2. Safely grab your tech label string from the nested .data wrapper
        const techName = d.data.screen_tech; 
        
        // 3. Format the percentage calculation cleanly
        const formattedPercent = d3.format(".0%")(percentage);
        
        // 4. Return both combined using a clean template literal string
        return `${techName}: ${formattedPercent}`;
    });

```

### Key Enhancements Made:

* **`d.data.screen_tech`:** Fixed the lookup so it stops fetching an empty `undefined` value.
* **Template Literal (`${}...`)**: Used standard string templates to safely bind text strings and numbers together.
* **`arcGenerator.centroid(d)`**: Added this positioning attribute. Without it, all your text labels will clump up directly in the top-left center position `(0,0)` of the donut hole. `centroid(d)` automatically calculates the geometric middle point of each slice for you.


Q:
i want text outside the donut by the arc, and with newline between tech and value

A:
Moving text outside a donut chart and breaking it into two lines requires two changes to your code structure:

1. **The Position Fix**: Instead of using your regular `arcGenerator` to calculate the center, you create a *second*, larger invisible arc generator (with no inner radius) to act as a guide. This pushes the coordinates out past the outer edge of your donut.
2. **The Newline Fix**: SVG `<text>` elements completely ignore `\n` or `<br>` tags. To create a true newline in SVG, you must append two separate `<tspan>` elements inside your text box and shift the second one down using the `dy` attribute.

Here is the exact code to achieve this cleanly:

```javascript
// 1. Create a scaling guide arc that is larger than your donut (outerRadius was 100)
// This will calculate points just outside the physical slices
const labelArcGenerator = d3.arc()
    .innerRadius(115) 
    .outerRadius(115);

// 2. Clear old text code and update with the multi-line layout
const textLabels = arcs
    .append("text")
    .attr("transform", d => `translate(${labelArcGenerator.centroid(d)})`)
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .style("fill", "#333")
    // Dynamically align text: Left-aligned on the right side, Right-aligned on the left side
    .style("text-anchor", d => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? "start" : "end";
    });

// Line 1: Technology Label
textLabels
    .append("tspan")
    .attr("x", 0) // Keeps it locked to the center calculation point
    .text(d => d.data.format);

// Line 2: Percentage Value (Shifted down onto a fresh line)
textLabels
    .append("tspan")
    .attr("x", 0)   // Keeps alignment uniform with the line above
    .attr("dy", "1.3em") // 'dy' pushes this element down by roughly one line-height
    .style("font-weight", "bold")
    .text(d => {
        const percentage = (d.endAngle - d.startAngle) / (2 * Math.PI);
        return d3.format(".0%")(percentage);
    });

```

### Why this works:

* **`labelArcGenerator`**: By setting both radii to `115px` (while your actual donut only goes up to `100px`), D3 calculates a coordinate point exactly 15 pixels outside the center perimeter of each slice.
* **The `text-anchor` logic**: If a slice is on the right half of your donut (`midAngle < Math.PI`), it aligns the text to the `"start"` so it reads outward to the right. If it's on the left half, it flips to `"end"` so it reads outward to the left. This prevents your labels from crashing directly into the sides of the donut.
* **`<tspan>`**: Think of these like `<span>` tags inside a `<p>` tag, but with layout superpowers. The `dy="1.3em"` property safely pushes the percentage line directly underneath your technology name line.


Q:
how to put x-axis and y-axis labels on bar chart, not the scales but the axis labels

A:
To add full text labels to your axes (like "Screen Technology" for the X-axis and "Mean Energy Consumption (kWh/year)" for the Y-axis), you need to append separate SVG `<text>` elements to your chart and position them relative to your margins.

Here is the code you should add to the end of your `addLegendBar` function in `legend.js`:

```javascript
const addLegendBar = data => {
    // ... (Keep your existing axes rendering and data labels code here) ...

    // ==========================================
    // 1. ADD X-AXIS TITLE LABEL
    // ==========================================
    innerChart_bar
        .append("text")
        // Center horizontally across the chart width
        .attr("x", innerWidth / 2)
        // Position it below the bottom axis lines (padding inside margin.bottom)
        .attr("y", innerHeight + margin.bottom - 10) 
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text("Screen Technology"); // Change to your preferred text

    // ==========================================
    // 2. ADD Y-AXIS TITLE LABEL
    // ==========================================
    innerChart_bar
        .append("text")
        // Rotate the text box 90 degrees counter-clockwise so it runs vertically
        .attr("transform", "rotate(-90)")
        // Because it is rotated, 'x' moves it vertically, 'y' moves it horizontally
        .attr("x", -innerHeight / 2) // Center vertically along the axis
        .attr("y", -margin.left + 15) // Position it to the left of the axis tick labels
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text("Mean Energy Consumption (kWh/year)"); // Change to your preferred text
}

```

### Layout Warning ⚠️

If your labels look cut off or clash with your axis tick numbers, it means your margin arrays don't have enough breathing room. Ensure your global margins in your layout setup are configured to give the text space:

* **`margin.bottom`** should be at least `40px` or `50px` to comfortably clear both the bar names and the X-axis label.
* **`margin.left`** should be at least `50px` or `60px` so that the vertical Y-axis title doesn't bleed off the left edge of your SVG container.

Q:
location of labels are outside box instead and all in straight line without spaces 

A:
The reason your labels are bunched up into a single line completely outside your chart box comes down to two specific layout bugs inside your `legend.js` file:

1. **`innerChartLine = svg_line`**: This overrides your inner chart group and targets the raw SVG root wrapper. Because it's missing the margin translation math (`margin.left`, `margin.top`), your axes are plotting relative to the absolute top-left corner of the HTML container instead of inside your plotting box.
2. **`.data(data).append("g")`**: By binding your 27-row dataset to the axis container, D3 is creating **27 separate X-axes** on top of each other. The `.attr("transform", d => ...)` is calculating positions for each individual axis group, resulting in a chaotic collision of text lines.

---

### The Cleaned `legend.js` Fix

An axis only needs to be appended **once** as a single operational component. D3 takes care of looping through your data array internally through the `xScaleLine` configurations.

Replace your entire `legend.js` file with this corrected version:

```javascript
const addLegendLine = data => {
    // 1. SELECT THE EXISTING INNER GROUP CONTAINER (It already has margins applied!)
    const innerChartLine = d3.select("#line g"); 

    // 2. CONFIGURE THE AXIS GENERATOR
    const bottomAxis = d3.axisBottom(xScaleLine)
        .tickFormat(d3.format("d")); // Clean integer formatting (no commas)
    
    // 3. RENDER THE AXIS EXACTLY ONCE
    // Notice: NO .data(data) loop here!
    innerChartLine
        .append("g")
        .attr("class", "axis-x")
        // JavaScript template literal using the global innerHeight variable
        .attr("transform", `translate(0, ${innerHeight})`) 
        .call(bottomAxis);
}

```

### Why this fixes your layout:

* **`d3.select("#line g")`**: This cleanly grabs the `<g>` element created inside `line.js`. This guarantees that `0,0` coordinate space starts right at your inner plotting margin boundaries rather than the outer frame edge.
* **Removing the `.data()` loop**: By dropping the data loop and setting a static horizontal translation offset of `0`, the axis anchors solidly at the start line. D3 then uses your active linear scale math to compute the exact, properly spaced pixel destinations for every single year stamp dynamically across your `innerWidth`.