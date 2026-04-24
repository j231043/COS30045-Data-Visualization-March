# Exercise 4.1
Note: The svg is create by me from scratch, did not ask AI to create ready made svg

AI USE DECLARATION
Introduction: Used to understand and clarify svg 
Tool Description: Google Gemini
Usage Details:

1. 
PROMPTS USED: 
 path d="M680 150 C 710 80, 725 80, 755 150 S 810 220, 840 150" fill="none" stroke=""#773b9a" stroke-width="3" />

what is this m c s 

Outputs Received: 
These letters are Path Commands. They tell the SVG "pen" exactly how to move across the coordinate system. Since SVG paths are basically a series of instructions, each letter acts as a specific drawing mode.

Here is the breakdown of your specific path:
M = MoveTo

    Command: M 680 150

    What it does: It picks up the pen and places it at the coordinates (680,150). It doesn't draw anything yet; it just sets the starting point.

C = Cubic Bézier Curve

    Command: C 710 80, 725 80, 755 150

    What it does: It draws a smooth curve from your current point to a new end point using two control points.

        710 80: The first control point (pulls the curve toward this direction from the start).

        725 80: The second control point (pulls the curve toward this direction at the end).

        755 150: The end point of this curve segment.

Think of control points like "magnets" that pull the line toward them without the line actually touching them.
S = Smooth Cubic Bézier Curve

    Command: S 810 220, 840 150

    What it does: This is a "shortcut" command used to chain curves together smoothly.

        It automatically calculates the first control point by reflecting the last control point of the previous command. This prevents a sharp "corner" where the two curves meet.

        810 220: The second control point.

        840 150: The final end point of the path.

MODIFICATIONS MADE: no code provided, used to understand how to draw curved path better

2. 
PROMPTS USED:  does svg group transformations not have rotate 

OUTPUTS RECEIVED: 
It is a common point of confusion, but the short answer is: Yes, the SVG <g> (group) element absolutely supports rotation, but it doesn't have a standalone rotate="" attribute.

Instead, rotation is handled through the universal transform attribute.
How to Rotate a Group

To rotate a group, you use the rotate function inside the transform attribute. The syntax follows this structure:

transform="rotate(angle [cx cy])"

    angle: The number of degrees to rotate (clockwise is positive).

    cx, cy (Optional): The x and y coordinates of the pivot point. If you omit these, the group rotates around the origin of the entire SVG coordinate system (0,0), which often makes the group swing off-screen.

Example Code

In the example below, the group is rotated 45∘ around the point (50,50).
SVG
Why it feels "missing"

If you are coming from a CSS background or working with specific SVG sub-elements, here is why it might feel inconsistent:

    No individual attribute: Unlike x or y on a <rect>, there is no rotate="45" attribute. It must live inside transform.

    CSS vs. HTML: In modern browsers, you can use CSS to rotate SVG groups (e.g., style="rotate: 45deg;"), but this behaves differently regarding the transform-origin and isn't supported in older viewers or some vector software.

    The Origin Problem: If you just write transform="rotate(45)", your shapes will likely disappear or move unexpectedly because they are rotating around the top-left corner of the canvas.

Quick Comparison Table
Feature	SVG Attribute Syntax	CSS Property Syntax
Basic Rotation	transform="rotate(45)"	rotate: 45deg;
Pivot Point	transform="rotate(45 50 50)"	transform-origin: 50px 50px;
Compatibility	High (All SVG versions)	Medium (Modern browsers only)

MODIFICATIONS MADE: code provided not used because gave up on rotation idea. 

Reflection: Helped me learn more about svg

Acknowledgment: 

References:
https://svg-tutorial.com/svg/quadratic-bezier
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Getting_started