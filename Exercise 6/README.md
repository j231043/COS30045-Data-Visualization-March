# Exercise 6 – Interactive Visualisations

## Overview
In this exercise you will build **interactive data visualisations using D3.js**. Interaction allows users to explore the data and gain deeper insights through features such as filtering and tooltips.

Use the **same repository you forked earlier for this unit** and complete this exercise inside the **Exercise 6 folder**.

---

## Exercise 6.1 – Interactive Histogram: Filtering

### Aim
Build a histogram and add **interactive filters**.

### Purpose
Interaction is one of the key advantages of visualisations on the web. In this exercise you will build a **histogram using the TV dataset** and allow users to filter the data.

Users should be able to explore energy consumption for different TV screen technologies such as:

- LCD
- LED
- OLED

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Exercise 6.2 – Interactive Scatterplot: Tooltips

### Aim
Build a scatterplot and add **tooltips and colour coding**.

### Purpose
Tooltips are one of the most common interactive features in data visualisations. In this exercise you will create a **scatterplot using the TV dataset**.

The chart should allow users to explore the relationship between:

- Energy consumption
- Star rating
- Screen size
- Screen technology

Tooltips should display additional information such as **screen size**, and colours should represent **screen type**.

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Instructions

1. Open your **existing forked repository**.
2. Navigate to the **Exercise 6 folder**.
3. Add the files needed to implement the histogram and scatterplot.
4. Implement the required interactive features using **D3.js**.
5. Commit and push your changes regularly to GitHub.

Your forked repository will serve as your **submission record**.

Q:
how to add opacity to see overlaps

A:
To see overlapping data points in a scatter plot (a common issue known as **overplotting**), the easiest and most effective method is to reduce the opacity of your marks. When multiple semi-transparent shapes stack on top of each other, the color builds up, naturally creating darker "heat zones" where data density is highest.

Here is how you implement it in D3, along with a few alternative tricks to handle overlapping data.

---

## 1. Using the CSS `.style("opacity")` or `.attr("opacity")`

You can inject opacity directly into your D3 selection chain. Opacity values range from `0` (completely transparent) to `1` (completely solid). For heavy overlaps, a value between `0.2` and `0.5` usually works best.

```javascript
innerChartScatterTech
        .selectAll(".circle")
        .data(data)
        .join("circle")
        .attr("class", "circle")
        .attr("r", 4)
        .attr("cx", d => xScaleScatterTech(d.star))
        .attr("cy", d => yScaleScatterTech(d.energyConsumption))
        .attr("fill", d => colorScaleTech(d.screenTech))
        // ADD THIS LINE: Sets the opacity of the circles to 40%
        .attr("opacity", 0.4); 

```

---

## 2. Using Alpha Channels in your Colors (`rgba` or `hsla`)

If you are hardcoding colors or building a custom color range, you can use `rgba()` (Red, Green, Blue, Alpha) strings. The fourth value controls the transparency.

```javascript
// Instead of a solid hex color, use rgba
.attr("fill", "rgba(96, 100, 100, 0.3)") 

```

---

## Other Great Ways to Handle Overlapping Points

If changing the opacity still doesn't make your scatter plot readable, you can combine opacity with these visualization techniques:

### A. Add a Stroke (Border) to the Circles

If your background is light, adding a solid, dark stroke with a semi-transparent fill helps the human eye distinguish individual circle boundaries even when they are clustered tightly together.

```javascript
innerChartScatterTech
        .selectAll(".circle")
        // ... data and positions ...
        .attr("fill", d => colorScaleTech(d.screenTech))
        .attr("opacity", 0.5)
        .attr("stroke", "#fff") // White border separates overlapping edges
        .attr("stroke-width", 1);

```

### B. Jittering (Adding Random Noise)

If your data points overlap perfectly because they use discrete integer scales (like a 1-to-5 star rating system), opacity might just create a few massive solid blobs. You can fix this by adding a tiny amount of random variation to their positions so they spread out.

```javascript
// Add a tiny bit of random padding so identical values don't sit directly on top of each other
.attr("cx", d => xScaleScatterTech(d.star) + (Math.random() - 0.5) * 10)

```

### C. Change the Radius Size

Sometimes the simplest fix is to just make your circles smaller. Shrinking `.attr("r", 4)` down to `.attr("r", 2)` opens up visual breathing room on the canvas.

Q:
how to add a legend box showing color and what screen tech it represents

A:
To add a clear legend box to your D3 scatter plot, you can use a combination of your existing `colorScaleTech` and a D3 selection to loop through your unique categories.

The easiest and most modular way to handle this is to append a new `<g>` element (acting as the container box) to your SVG, and then dynamically inject rows containing colored squares and matching text labels.

Here is the complete implementation code and how it works.

---

## The Implementation Code

Add this block of code right after or inside your chart script (after `colorScaleTech` has been initialized).

```javascript
// 1. Create a legend container box group and position it
const legend = svg.append("g")
    .attr("class", "legend-box")
    // Adjust these coordinates to place the box in an open area of your chart
    .attr("transform", `translate(${width - margin.right - 120}, ${margin.top})`);

// 2. Get the unique list of screen technologies from your scale's domain
const categories = colorScaleTech.domain(); 

// 3. Bind the categories data to build individual legend items
const legendItems = legend.selectAll(".legend-item")
    .data(categories)
    .join("g")
    .attr("class", "legend-item")
    // Space the items out vertically by 25 pixels
    .attr("transform", (d, i) => `translate(0, ${i * 25})`);

// 4. Append a colored rectangle/square for each category
legendItems.append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("rx", 2) // Optional: slightly rounded corners for the boxes
    .attr("fill", d => colorScaleTech(d)); // Use your color scale here

// 5. Append the text label next to the square
legendItems.append("text")
    .attr("x", 25) // Slide text to the right so it doesn't overlap the square
    .attr("y", 12) // Vertically align the text with the middle of the square
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("fill", "#333")
    .text(d => d); // The data point 'd' is the string name (e.g., "OLED")

```

---

## How it works under the hood

1. **`colorScaleTech.domain()`**: D3 ordinal scales automatically keep track of all unique keys passed into them. Running this method extracts an array of your exact string classifications (e.g., `["OLED", "LCD", "Plasma"]`).
2. **Transform Translation (`i * 25`)**: D3 allows you to access the array index via the second parameter `i` in your accessor functions. Multiplying `i` by 25 ensures that the first item sits at `y = 0`, the second at `y = 25`, the third at `y = 50`, and so on, preventing them from printing on top of one another.
3. **The `y` Offset for Text**: SVG text anchors from the bottom-left baseline by default. Setting `.attr("y", 12)` pushes the baseline down slightly so the text text aligns perfectly centered with your 15px tall square icon.

### Styling Tip

If you want a physical bounding box outline drawn around your legend group to separate it from the scatter points, you can prepend a background `<rect>` into the `legend` variable first:

```javascript
legend.append("rect")
    .attr("width", 130)
    .attr("height", categories.length * 25 + 10)
    .attr("x", -10)
    .attr("y", -10)
    .attr("fill", "#ffffff")
    .attr("stroke", "#ccc")
    .attr("rx", 4)
    .attr("opacity", 0.9); // Keeps it slightly translucent over gridlines

```