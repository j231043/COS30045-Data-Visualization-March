# AI USAGE

1. question 1
PROMPTS USED:
GET
http://127.0.0.1:5500/Exercise 4/data/data.csv
[HTTP/1.1 404 Not Found 1ms]

Uncaught (in promise) Error: 404 Not Found
    bc https://d3js.org/d3.v7.min.js:2
    promise callback*mc https://d3js.org/d3.v7.min.js:2
    xc https://d3js.org/d3.v7.min.js:2
    <anonymous> http://127.0.0.1:5500/Exercise 4/Exercise 4.4/js/d3.js:14

OUTPUT RECEIVED:
1. What the error tells us (important)
You see this request in the console:
GET http://127.0.0.1:5500/Exercise 4/data/data.csv
404 Not Found

This means:
✅ Live Server is running
✅ D3 is trying to load the CSV
❌ The file does not exist at that URL
So this is not a D3 problem — it’s a relative path problem.

2. Why this is happening
Your JS file is here (from the stack trace):
/Exercise 4/Exercise 4.4/js/d3.js

But the browser is trying to load:
/Exercise 4/data/data.csv

👉 That means your relative path calculation is wrong by one directory level.

3. Understand relative paths (this is the key)
Relative paths in JavaScript are resolved from the HTML file, not from the JS file.
Even though your code is inside:
Exercise 4/Exercise 4.4/js/d3.js

The browser resolves:
JavaScriptd3.csv("../data/data.csv")Show more lines
⬅️ relative to index.html, not d3.js

4. Fix: match the path to the real folder structure
Based on this URL:
http://127.0.0.1:5500/Exercise 4/Exercise 4.4/

Your likely structure is:
Exercise 4/
│
├─ data/
│   └─ data.csv
│
└─ Exercise 4.4/
   ├─ index.html
   └─ js/
      └─ d3.js

✅ Correct path from index.html
From Exercise 4.4/index.html to Exercise 4/data/data.csv:
JavaScriptd3.csv("../data/data.csv")Show more lines
⚠️ But your error shows the browser is looking in the wrong Exercise 4 folder, which means Live Server is probably started from the wrong root.

5. ✅ The most reliable fix (recommended)
Start Live Server from the parent folder
✅ Right‑click Exercise 4
✅ Click “Open with Live Server”
Your URL should become:
http://127.0.0.1:5500/Exercise%204/

Then your HTML loads as:
/Exercise 4/Exercise 4.4/index.html

Now this path will work:
JavaScriptd3.csv("../data/data.csv")  .then(data => console.log(data))  .catch(err => console.error(err));Show more lines

6. Alternative fix (hard‑code absolute path)
If you don’t want to restart Live Server, you can use an absolute path:
JavaScriptd3.csv("/Exercise 4/data/data.csv")  .then(data => console.log(data));``Show more lines
✅ This works only if Live Server root is above Exercise 4.

7. How to confirm it’s fixed (very important)

Open DevTools → Network
Reload page
Click data.csv
You should see:
Status: 200 OK


Then check Console → your data appears as JS objects ✅


8. Quick checklist ✅

✅ Live Server (not file://)
✅ D3 loaded
✅ Live Server started from correct root
✅ CSV path resolved from HTML, not JS
✅ Network tab shows 200 OK


9. TL;DR (short answer)
Your CSV path is wrong because Live Server’s root is wrong.
Start Live Server from the folder that contains both data/ and Exercise 4.4/, or adjust the path accordingly.

MODIFICATIONS MADE: no modifications made, hardcoded path to data.csv

Reflection: AI is useful in diagnosing and pinpointing errors, I should learn to understand some error codes and common causes

Acknowledgment: Code is done with the aid of AI to troubleshoot issues