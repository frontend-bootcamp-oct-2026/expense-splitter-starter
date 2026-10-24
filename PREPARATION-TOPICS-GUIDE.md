# HTML, CSS and JavaScript — Preparation Topics Guide

This guide covers the **base and core basics** that will help you feel ready for the Frontend Problem-Solving Bootcamp. It is a revision guide, not an exam. You do not need to memorise everything before joining.

Our project is a **Group Expense Splitter**. We will use HTML to structure the page, CSS to make it clear and usable, and JavaScript to represent people and expenses and calculate results.

Sections marked **Preview** show ideas we use later in the week. Read them once so they look familiar when they come up. You do not need to master them before Day 1.

## How to use this guide

1. Start with section 0 so you know where to run the examples.
2. Read one topic at a time.
3. Type the examples yourself rather than only reading them.
4. Change a value and predict what will happen before running the code.
5. Explain the example aloud in your own words.
6. If something is confusing, mark it and bring the question to the bootcamp.

---

# 0. Where to run the examples

You can run every JavaScript example in this guide in two places. Try both.

## 0.1 The browser console

Every browser has built-in developer tools, usually called **DevTools**. The **Console** tab is where you can type JavaScript and see the result straight away.

1. Open any web page. Your project preview from Codespaces works too.
2. Open the Console:
   - Windows or Linux: press `Ctrl+Shift+J`, or `F12` and then click **Console**.
   - Mac: press `Cmd+Option+J`.
   - Or right-click the page, choose **Inspect**, then click the **Console** tab.
3. Type `2 + 3` and press Enter. You should see `5`.

A few tips:

- To type more than one line before running, press `Shift+Enter` for a new line. Press `Enter` when you want to run it.
- The first time you paste code, Chrome may block it and ask you to type `allow pasting`. Typing examples yourself is better practice anyway.
- Red text in the Console is an error message. Section 0.3 explains how to read one.

## 0.2 The Codespaces terminal with Node

Node runs JavaScript outside the browser. Your codespace already has it installed.

1. In your codespace, create a file called `warmups/practice.js`.
2. Type an example into it and save with `Ctrl+S` (`Cmd+S` on Mac).
3. In the terminal, run:

```bash
node warmups/practice.js
```

Anything you `console.log` appears in the terminal. Change the file, save it, and run the same command again.

Use the browser console for quick one-line experiments. Use a file and Node when the example is longer or you want to keep it.

## 0.3 Read an error message

Errors are clues, not failures. Suppose `warmups/practice.js` contains:

```js
const expense = { description: "Hotel", amountPaise: 90000 };
console.log(expense.paidBy.toLowerCase());
```

Running it prints something like this:

```text
file:///workspaces/expense-splitter-asha/warmups/practice.js:2
console.log(expense.paidBy.toLowerCase());
                           ^

TypeError: Cannot read properties of undefined (reading 'toLowerCase')
    at file:///workspaces/expense-splitter-asha/warmups/practice.js:2:28
```

Read it in this order:

1. **The error line:** `TypeError: Cannot read properties of undefined (reading 'toLowerCase')`. Something was `undefined`, and we tried to call `.toLowerCase()` on it.
2. **Where:** `practice.js:2:28` means file `practice.js`, line 2, column 28. The `^` points at the same spot.
3. **Why:** the object has no `paidBy` property, so `expense.paidBy` is `undefined`.

When you are stuck, add a `console.log` just before the failing line to see the real values:

```js
console.log(expense.paidBy); // undefined
```

---

# 1. HTML: Give the page structure

HTML describes the content and structure of a web page. Think of it as the parts of a form or document—not its visual styling or calculations.

## 1.1 Elements, tags and attributes

An element commonly has an opening tag, content, and a closing tag. Attributes provide extra information.

```html
<h1>Group Expense Splitter</h1>
<p>Track shared expenses with your friends.</p>
<button type="button">Add expense</button>
```

- `<h1>` is a main heading.
- `<p>` is a paragraph.
- `<button>` creates a button.
- `type="button"` is an attribute that specifies the button's behaviour.

Some elements, such as `<input>`, do not use a closing tag.

## 1.2 Build a simple expense form

```html
<form>
  <label for="expense-name">Expense name</label>
  <input id="expense-name" name="expenseName" type="text"
         placeholder="e.g. Hotel" />

  <label for="expense-amount">Amount in rupees</label>
  <input id="expense-amount" name="amount" type="number"
         min="0.01" step="0.01" />

  <button type="submit">Add expense</button>
</form>
```

**What to notice**

- A `label` helps people understand what to enter.
- The label's `for` value matches the input's `id`.
- `name` identifies the field when form data is handled.
- `type` tells the browser what kind of input to show.
- `min` and `step` can help guide numeric input, but JavaScript must still validate data.

## 1.3 Choices: a dropdown and checkboxes

An expense has one payer but can be shared by several people. HTML has a control for each case.

```html
<label for="paid-by">Paid by</label>
<select id="paid-by" name="paidBy">
  <option value="p1">Asha</option>
  <option value="p2">Ravi</option>
  <option value="p3">Mina</option>
</select>

<fieldset>
  <legend>Shared by</legend>
  <label><input type="checkbox" name="sharedBy" value="p1" checked /> Asha</label>
  <label><input type="checkbox" name="sharedBy" value="p2" checked /> Ravi</label>
  <label><input type="checkbox" name="sharedBy" value="p3" checked /> Mina</label>
</fieldset>
```

**What to notice**

- A `<select>` lets the user pick **one** option. Checkboxes let the user pick **any number**.
- Each option's `value` is what JavaScript reads. The text between the tags is what the user sees. Here the value is a person's ID (`p1`) and the text is their name (`Asha`). Section 3.7 explains why we use IDs.
- `<fieldset>` groups related controls, and `<legend>` gives the group a name.
- Putting the checkbox inside its `<label>` means clicking the name also ticks the box.
- `checked` makes a checkbox start ticked.

## 1.4 Lists, tables and page sections

Expenses are a collection, so an HTML list is a natural way to show them.

```html
<section aria-labelledby="expenses-heading">
  <h2 id="expenses-heading">Expenses</h2>
  <ul>
    <li>Hotel — ₹900</li>
    <li>Lunch — ₹450</li>
  </ul>
</section>
```

Use headings to organise content, `<section>` for a meaningful section, and `<ul>` with `<li>` for a list. Prefer meaningful HTML elements over using a `<div>` for absolutely everything.

When information has rows **and** columns, such as how much each person paid and owes, use a table:

```html
<table>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Paid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Asha</td>
      <td>₹900</td>
    </tr>
    <tr>
      <td>Ravi</td>
      <td>₹300</td>
    </tr>
  </tbody>
</table>
```

`<tr>` is a row, `<th>` is a heading cell, and `<td>` is a data cell. `<thead>` holds the heading row and `<tbody>` holds the data rows.

### HTML quick practice

- [ ] Create a page heading and a short description.
- [ ] Add a form with an expense name and amount.
- [ ] Add a "Paid by" dropdown and "Shared by" checkboxes for three people.
- [ ] Add a button and a list containing two sample expenses.
- [ ] Add a small table showing two people and how much each paid.
- [ ] Check that each input has a clear label.

---

# 2. CSS: Make the page readable and usable

CSS controls presentation: colours, spacing, sizing, layout, and how the page adapts to different screen sizes.

## 2.1 Select elements and apply styles

```html
<h1 class="page-title">Group Expense Splitter</h1>
<p id="intro">Keep track of shared costs.</p>
```

```css
.page-title {
  color: navy;
  font-size: 2rem;
}

#intro {
  color: #444;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
```

- `.page-title` selects elements with that class.
- `#intro` selects the element with that ID.
- `button` selects all button elements.
- CSS declarations use a property and a value, such as `color: navy;`.

Use classes for styles you may reuse. An ID should be unique on the page.

## 2.2 The box model

Every element is laid out as a box:

- **Content:** the text or other content.
- **Padding:** space inside the border, around the content.
- **Border:** the edge around the padding and content.
- **Margin:** space outside the border, between elements.

```css
.expense-card {
  padding: 16px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  border-radius: 8px;
  box-sizing: border-box;
}
```

A useful baseline is:

```css
* {
  box-sizing: border-box;
}
```

This makes declared widths include padding and borders, which often makes sizing easier to reason about.

## 2.3 Layout with Flexbox

Flexbox helps arrange items in a row or column.

```html
<div class="expense-row">
  <span>Hotel</span>
  <strong>₹900</strong>
</div>
```

```css
.expense-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
```

- `display: flex` enables Flexbox layout.
- `justify-content` controls spacing along the main axis.
- `align-items` aligns items across the cross axis.
- `gap` adds space between items.

## 2.4 Make the page work on small screens

```css
.expense-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.expense-form input {
  max-width: 100%;
}

@media (max-width: 600px) {
  .expense-form {
    flex-direction: column;
  }
}
```

A responsive layout adapts to available space. Test by narrowing the browser window instead of assuming the page will fit every screen.

### CSS quick practice

- [ ] Give the page a readable font and spacing.
- [ ] Add padding, border, and margin to an expense card.
- [ ] Use Flexbox to place an expense name on the left and amount on the right.
- [ ] Narrow the browser and check that the form remains usable.

---

# 3. JavaScript: Represent information and solve problems

JavaScript lets us describe the data, make decisions, perform calculations, and respond to user actions.

## 3.1 Variables and values

Use `const` by default when you do not need to reassign a variable. Use `let` when the variable needs a new value.

```js
const description = "Hotel"; // string: text
const amountPaise = 90000;   // number
const isSettled = false;     // boolean: only true or false
let numberOfPeople = 3;

numberOfPeople = 4;

console.log(typeof description); // "string"
console.log(typeof isSettled);   // "boolean"
```

`const` prevents reassignment of the variable; it does not make an object or array deeply immutable.

Two more values you will meet:

- `undefined` means "no value here". You get it when you read a property that does not exist, as in section 0.3.
- `null` means "deliberately empty". A programmer chooses to use it.

## 3.2 Basic arithmetic

```js
const totalAmount = 900;
const peopleCount = 3;
const sharePerPerson = totalAmount / peopleCount;

console.log(sharePerPerson); // 300
```

For this simple case, each person contributes ₹300. Later, we will handle uneven splits and multiple expenses.

**Important:** Values read from HTML inputs are usually strings. Convert and validate them before doing calculations.

```js
const amountInput = "900";
const amount = Number(amountInput);

console.log(amountInput + 100); // "900100" — joined as text
console.log(amount + 100);      // 1000
```

Without conversion, the `+` operator joins strings instead of adding numbers.

### Why we store money in paise

Try these in the console:

```js
console.log(0.1 + 0.2);  // 0.30000000000000004
console.log(1.15 * 100); // 114.99999999999999
```

Computers store most decimal numbers approximately, so tiny errors creep in. Whole numbers do not have this problem. That is why the project stores every amount as a whole number of **paise**:

| Rupees | Paise |
| --- | ---: |
| ₹900 | `90000` |
| ₹12.50 | `1250` |
| ₹0.01 | `1` |

When converting a typed rupee amount, `Math.round` removes the tiny error:

```js
console.log(Math.round(1.15 * 100)); // 115
```

## 3.3 Comparisons and logical operators

A comparison answers a question with `true` or `false`.

```js
const amountPaise = 90000;

console.log(amountPaise === 90000); // true
console.log(amountPaise !== 0);     // true
console.log(amountPaise > 100000);  // false
console.log("5" === 5);             // false — a string is not a number
console.log("5" == 5);              // true — loose comparison; avoid it
```

- `=` **stores** a value. `===` **compares** two values. Mixing them up is a very common bug.
- Use `===` and `!==`. They also check the type, so `"5"` and `5` are not treated as equal.

Logical operators combine true/false answers:

```js
const description = "Hotel";
const amountPaise = 0;

console.log(description !== "" && amountPaise > 0);  // false: && needs BOTH to be true
console.log(description === "" || amountPaise <= 0); // true: || needs AT LEAST ONE
console.log(!true);                                  // false: ! flips the answer
```

`Number.isInteger` checks for a whole number:

```js
console.log(Number.isInteger(300)); // true
console.log(Number.isInteger(2.5)); // false
console.log(Number.isInteger(NaN)); // false — NaN means "not a number"
```

Practise reading a combined condition aloud in plain English:

```js
const peopleCount = 2.5;

if (!Number.isInteger(peopleCount) || peopleCount < 1) {
  console.log("Number of people must be a whole number, at least 1");
}
```

"If the number of people is **not** a whole number, **or** it is less than 1, show the message."

## 3.4 Conditions

Conditions let the program choose what to do.

```js
const amount = 900;

if (amount > 0) {
  console.log("Valid positive amount");
} else {
  console.log("Amount must be greater than zero");
}
```

Try changing `amount` to `0` and then to `-50`. Predict the message before running the code.

Use `else if` when there are more than two cases:

```js
const balance = -30000;

if (balance > 0) {
  console.log("Gets money back");
} else if (balance < 0) {
  console.log("Owes money");
} else {
  console.log("All settled");
}
```

## 3.5 Functions

A function groups a task into a reusable unit. Inputs are called parameters; a returned result can be used elsewhere.

```js
function calculateShare(amount, peopleCount) {
  if (peopleCount <= 0) {
    return null;
  }

  return amount / peopleCount;
}

const share = calculateShare(900, 3);
console.log(share); // 300
```

Why use a function? We can test the calculation separately and reuse it for different expenses.

### Return a list of problems

Returning `null` tells us something went wrong, but not what. In the project, checking functions return an **array of error messages** instead. An empty array means "no problems".

```js
function validateTripName(name) {
  const errors = [];
  const cleanName = name.trim();

  if (cleanName === "") {
    errors.push("Enter a trip name");
  }

  if (cleanName.length > 30) {
    errors.push("Keep the trip name to 30 characters or fewer");
  }

  return errors;
}

console.log(validateTripName("Goa 2026")); // []
console.log(validateTripName("   "));      // ["Enter a trip name"]
```

Collecting every problem lets the user fix them all at once, and the page can show each message. You will use this same pattern on Day 1.

## 3.6 Arrays: Keep a collection of items

An array stores an ordered collection.

```js
const people = ["Asha", "Ravi", "Mina"];

console.log(people[0]); // "Asha"
console.log(people.length); // 3
```

Array indexes start at zero, so the first item is at index `0`.

A few array and string tools you will use often:

```js
const people = ["Asha", "Ravi", "Mina"];

people.push("Dev");                   // add to the end
console.log(people.length);           // 4
console.log(people.includes("Ravi")); // true
console.log(people.includes("ravi")); // false — capital letters matter

console.log("Ravi".toLowerCase());                // "ravi"
console.log("Ravi".toLowerCase() === "ravi");     // true
console.log("  Ravi  ".trim());                   // "Ravi"
```

- `push` adds an item to the end of an array.
- `includes` answers "is this value in the array?" with `true` or `false`.
- `toLowerCase` gives a lower-case copy of a string, which helps compare names without caring about capital letters.
- `trim` removes spaces from the start and end.

## 3.7 Objects: Describe one thing

An object groups related information using properties. This is how the project describes people and expenses:

```js
const participants = [
  { id: "p1", name: "Asha" },
  { id: "p2", name: "Ravi" },
  { id: "p3", name: "Mina" }
];

const expense = {
  id: "e1",
  description: "Hotel",
  amountPaise: 90000,
  paidBy: "p1",
  sharedBy: ["p1", "p2", "p3"]
};

console.log(expense.description); // "Hotel"
console.log(expense.paidBy);      // "p1"
```

**Why IDs and not names?** Two friends could both be called Ravi, and someone might fix a spelling mistake in a name later. An ID such as `p2` never changes and is never shared, so it connects an expense to the right person. The page shows names; the data stores IDs.

An array of expense objects can represent an entire trip:

```js
const expenses = [
  { id: "e1", description: "Hotel", amountPaise: 90000, paidBy: "p1", sharedBy: ["p1", "p2", "p3"] },
  { id: "e2", description: "Lunch", amountPaise: 45000, paidBy: "p2", sharedBy: ["p1", "p2"] }
];
```

### Dot notation and bracket notation

There are two ways to read a property:

```js
console.log(expense.description);    // "Hotel"
console.log(expense["description"]); // "Hotel" — exactly the same
```

Brackets matter when the **key is stored in a variable**:

```js
const names = { p1: "Asha", p2: "Ravi", p3: "Mina" };
const payerId = expense.paidBy; // "p1", from the expense above

console.log(names[payerId]); // "Asha"
console.log(names.payerId);  // undefined — looks for a key literally called "payerId"
```

Rule of thumb: use a dot when you know the key name while writing the code. Use brackets when the key comes from a variable.

### Use an object as a lookup table

An object can keep one value per key and let you update it. Here we count votes for snacks:

```js
const votes = { samosa: 0, chai: 0 };

votes["samosa"] = votes["samosa"] + 1;

const choice = "chai";
votes[choice] = votes[choice] + 1;

console.log(votes); // { samosa: 1, chai: 1 }
```

Keep this pattern in mind. On Day 1 you will need a way to keep one running total per person.

## 3.8 Loops: Repeat a task

`for...of` visits each item in an array:

```js
const expenses = [
  { description: "Hotel", amountPaise: 90000 },
  { description: "Lunch", amountPaise: 45000 }
];

let total = 0;

for (const expense of expenses) {
  total = total + expense.amountPaise;
}

console.log(total); // 135000 paise, which is ₹1,350
```

The loop visits each expense and adds its amount to the running total. This is useful when the number of expenses can change.

A classic `for` loop counts with an index. Use it when you need the position as well as the item:

```js
const people = ["Asha", "Ravi", "Mina"];

for (let i = 0; i < people.length; i++) {
  console.log(i + ": " + people[i]);
}
// 0: Asha
// 1: Ravi
// 2: Mina
```

A `while` loop repeats **as long as** a condition is true:

```js
let remaining = 500;
let payments = 0;

while (remaining > 0) {
  const payment = Math.min(remaining, 200); // the smaller of the two numbers
  remaining = remaining - payment;
  payments = payments + 1;
}

console.log(payments); // 3 — paid as 200, 200, 100
```

Make sure something inside a `while` loop eventually makes the condition false. If it never does, the loop runs forever and the page freezes. Close the tab and fix the condition.

`for...in` visits each **key** of an object:

```js
const votes = { samosa: 3, chai: 5 };
let totalVotes = 0;

for (const snack in votes) {
  totalVotes = totalVotes + votes[snack];
}

console.log(totalVotes); // 8
```

Remember: `for...of` gives the **values** of an array; `for...in` gives the **keys** of an object.

## 3.9 Basic array methods

Array methods let us transform or select items.

```js
const expenses = [
  { description: "Hotel", amountPaise: 90000 },
  { description: "Lunch", amountPaise: 45000 },
  { description: "Taxi", amountPaise: 20000 }
];

const descriptions = expenses.map(expense => expense.description);
const largeExpenses = expenses.filter(expense => expense.amountPaise >= 50000);

console.log(descriptions); // ["Hotel", "Lunch", "Taxi"]
console.log(largeExpenses); // only the Hotel expense

const participants = [
  { id: "p1", name: "Asha" },
  { id: "p2", name: "Ravi" }
];
const ravi = participants.find(person => person.id === "p2");
console.log(ravi.name); // "Ravi"
```

- `map` creates a new array by transforming each item.
- `filter` creates a new array containing items that pass a condition.
- `find` returns the first matching item, or `undefined` if none matches.

`expense => expense.description` is a short way to write a function, called an **arrow function**. These two lines give the same result:

```js
const shortForm = expenses.map(expense => expense.description);

const longForm = expenses.map(function (expense) {
  return expense.description;
});
```

You will see the short form often online. The project code mostly uses the longer form because it is easier to read line by line. Both are fine.

You can revise these methods now, but do not worry if they are unfamiliar. We will practise them when the problem needs them.

## 3.10 Files that share code: `export` and `import`

The project is split into files, each with one job. `export` lets other files use a function, and `import` brings it in.

```js
// js/money.js
export function toPaise(rupees) {
  return Math.round(rupees * 100);
}
```

```js
// js/main.js
import { toPaise } from "./money.js";

console.log(toPaise(12.5)); // 1250
```

That is why every function in `js/logic.js` starts with `export`: the tests in `tests/logic.test.js` and the page code in `js/main.js` both import them. `import * as logic from "./logic.js"` brings in every export at once, so you can call `logic.totalPaid(...)`.

Files that use `import` need a web server in the browser. That is why we start the project with `npm run dev` instead of double-clicking `index.html`.

## 3.11 Preview: ideas for Day 2

Read these once. We will work through them properly when the problem needs them.

### Whole-number division and the remainder

```js
const amountPaise = 1000;
const peopleCount = 3;

console.log(amountPaise / peopleCount);             // 333.3333333333333
console.log(Math.floor(amountPaise / peopleCount)); // 333
console.log(amountPaise % peopleCount);             // 1
```

- `Math.floor` rounds **down** to a whole number.
- `%` (remainder) gives what is left over after making equal whole groups.

333 × 3 = 999, so 1 paisa is left over. Money must not disappear, so that paisa has to go to someone. Think about who should get it, and bring your idea to Day 2.

### Sorting numbers

```js
const amounts = [500, 90, 1200];

amounts.sort();
console.log(amounts); // [1200, 500, 90] — sorted as if they were text!

amounts.sort(function (a, b) {
  return a - b;
});
console.log(amounts); // [90, 500, 1200]
```

Without help, `sort` compares items as text. A **compare function** tells it how to order numbers:

- `a - b` puts smaller numbers first.
- `b - a` puts larger numbers first.

`sort` changes the original array rather than making a new one.

### Objects are shared, not copied

```js
const original = { p1: 500 };
const sameObject = original;

sameObject.p1 = 0;
console.log(original.p1); // 0 — both names point to the same object
```

The same thing happens when you pass an object to a function:

```js
function resetAll(scores) {
  for (const key in scores) {
    scores[key] = 0;
  }
}

const scores = { p1: 500, p2: 300 };
resetAll(scores);
console.log(scores); // { p1: 0, p2: 0 } — the original changed
```

`const` does not prevent this. If a function should not change the data it receives, it must work on its own new object or array instead.

### JavaScript quick practice

- [ ] Store an expense amount in paise and the number of people in variables.
- [ ] Write a function that calculates an equal share.
- [ ] Write a function that returns an array of error messages for a bad trip name.
- [ ] Create an array of three people's names, then `push` a fourth.
- [ ] Create an object describing one expense, using IDs for the payer and sharers.
- [ ] Use a variable and bracket notation to read a person's name from `{ p1: "Asha", p2: "Ravi" }`.
- [ ] Use a loop to calculate the total of two or three expenses.
- [ ] Use `filter` to find expenses above ₹500.
- [ ] Test what happens when the number of people is zero.
- [ ] Predict, then check: `"5" === 5`, `true && false`, `1000 % 3`.

---

# 4. How JavaScript connects to HTML

HTML creates the inputs and buttons. JavaScript can read the inputs, respond to the user, and update the page.

## 4.1 Respond to a form submission

```html
<form id="person-form">
  <label for="person-name">Person name</label>
  <input id="person-name" type="text" />
  <button type="submit">Add person</button>
</form>
<p id="message"></p>
<ul id="people-list"></ul>
```

```js
const form = document.querySelector("#person-form");
const nameInput = document.querySelector("#person-name");
const message = document.querySelector("#message");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the browser reloading the page

  const name = nameInput.value.trim();

  if (name === "") {
    message.textContent = "Please enter a name.";
    return;
  }

  message.textContent = "Added " + name + ".";
  nameInput.value = "";
});
```

**What happens?**

1. `querySelector` finds elements in the page.
2. `addEventListener("submit", ...)` runs a function when the form is submitted, either by clicking the button or pressing Enter in the input.
3. `event.preventDefault()` stops the browser's default behaviour, which is to reload the page. Without it, the page refreshes and anything your JavaScript was holding is lost. Try deleting that line to see.
4. `.value` reads what the user typed, and `.trim()` removes whitespace from both ends.
5. The `if` statement checks for empty input.
6. `textContent` updates the visible text.

Listen for the form's `submit` event rather than the button's `click`, so pressing Enter works too.

## 4.2 Show a list on the page

To show data, clear the old items, then create one element per item:

```js
const people = ["Asha", "Ravi"];
const list = document.querySelector("#people-list");

function showPeople() {
  list.innerHTML = ""; // remove the old items

  for (const person of people) {
    const item = document.createElement("li");
    item.textContent = person;
    list.appendChild(item);
  }
}

showPeople();
```

- `document.createElement("li")` makes a new element that is not on the page yet.
- `textContent` puts text inside it.
- `appendChild` adds it to the page, inside the list.

Now connect it to the form from 4.1. Inside the submit handler, replace the "Added" message with:

```js
people.push(name);
showPeople();
```

This is the pattern the whole app uses: **change the data, then redraw the page from the data.**

When displaying user-provided text, prefer `textContent` over `innerHTML`. Use `innerHTML = ""` only to clear an element.

## 4.3 Read a dropdown and checkboxes

Using the HTML from section 1.3:

```js
const paidBy = document.querySelector("#paid-by").value;

const sharedBy = [];
const boxes = document.querySelectorAll('input[name="sharedBy"]');
for (const box of boxes) {
  if (box.checked) {
    sharedBy.push(box.value);
  }
}

console.log(paidBy, sharedBy); // "p1" ["p1", "p2", "p3"]
```

- A `<select>`'s `.value` is the `value` of the chosen option.
- `querySelectorAll` finds **every** matching element, and you can loop over them.
- A checkbox's `.checked` is `true` when it is ticked.

### Try it yourself

Put the HTML from 4.1 in a file called `practice.html` in your repository, and add the JavaScript from 4.1 and 4.2 inside a `<script>` tag just before `</body>`. With `npm run dev` running, open the preview and add `/practice.html` to the end of its address.

---

# 5. Save your work: Git in Codespaces

Your codespace runs in the cloud, but the trainer and the automatic checks only see what you **push** to GitHub.

- A **commit** saves a snapshot of your files with a message describing it.
- A **push** sends your commits to GitHub.

## 5.1 Commit and push with buttons

1. Click the **Source Control** icon in the left-hand bar (it looks like three small circles joined by lines, like a branch). It lists the files you changed.
2. Type a message in the box at the top that says what works, for example `Add practice for objects`.
3. Click **Commit**. If VS Code asks whether to stage all your changes, choose **Yes**.
4. Click **Sync Changes** to push.
5. Open your repository on GitHub and check that your message appears next to the latest commit.

## 5.2 Or use the terminal

```bash
git status
git add .
git commit -m "Add practice for objects"
git push
```

- `git status` shows what has changed.
- `git add .` includes all your changes in the next commit.
- `git commit -m "..."` saves the snapshot with a message.
- `git push` sends it to GitHub.

Commit each time something works, and push before every session ends. At the end of the day, stop your codespace so it does not use up your free hours (**Code → Codespaces → ⋯ → Stop codespace** on your repository page). Your pushed work is safe on GitHub.

---

# 6. Put the basics together

Imagine the user enters a hotel bill of ₹900 shared by three people.

| Technology | Its job |
| --- | --- |
| HTML | Provide the amount field, payer dropdown, sharer checkboxes, button, and results section |
| CSS | Make the form and results clear, readable, and responsive |
| JavaScript variables | Hold the amount in paise and the number of participants |
| JavaScript objects and arrays | Represent people and expenses, connected by IDs |
| Bracket notation | Keep one running total per person, looked up by ID |
| Functions and arithmetic | Calculate each person's share |
| Comparisons and conditions | Reject invalid values such as a missing amount or zero participants |
| DOM events and rendering | Run the calculation when the user submits the form, then redraw the page |
| Testing | Check the result against examples we can calculate by hand |
| Git | Save each working step and share it with the trainer |

The point is not to build the whole application before the bootcamp. It is to recognise how each basic concept helps solve one part of the problem.

# 7. Self-check: Can you explain these?

Try answering without looking back at the guide. It is okay if you cannot answer everything yet.

1. What is the difference between HTML, CSS, and JavaScript?
2. What is the difference between a class selector and an ID selector in CSS?
3. What is the difference between `let` and `const`?
4. Why might we convert an input value to a number?
5. What is the difference between an array and an object?
6. Why would we put a calculation inside a function?
7. What does a loop help us do?
8. What is the difference between `map` and `filter`?
9. What does an event listener do?
10. If ₹900 is shared equally by three people, what is each person's share?
11. What is the difference between `=` and `===`?
12. If `const id = "p2"`, what is the difference between `names[id]` and `names.id`?
13. Why does the project store ₹12.50 as `1250`?
14. What does `1000 % 3` give, and what does it mean?
15. Why do we call `event.preventDefault()` in a submit handler?
16. What is the difference between a commit and a push?

## Suggested answers

1. HTML structures content; CSS styles and lays it out; JavaScript adds behaviour and logic.
2. A class selector starts with `.` and can be reused; an ID selector starts with `#` and should identify one element.
3. Both declare variables; `let` allows reassignment, while `const` does not.
4. Input values are commonly strings, and calculations need valid numeric values.
5. An array is an ordered collection; an object groups related properties.
6. A function makes a task reusable and easier to test.
7. A loop repeats work over items in a collection or while a condition is met.
8. `map` transforms each item; `filter` keeps items that pass a test.
9. It runs a callback when a specified event occurs, such as a click or form submission.
10. ₹300 per person.
11. `=` stores a value in a variable; `===` compares two values and gives `true` or `false`.
12. `names[id]` uses the value of `id`, so it reads the key `"p2"`. `names.id` reads a key literally named `"id"`.
13. Whole numbers add up exactly, while decimals such as `0.1 + 0.2` can have tiny errors. ₹12.50 is 1250 paise.
14. `1`. After making three equal groups of 333, one is left over.
15. To stop the browser reloading the page, which would lose what JavaScript was holding.
16. A commit saves a snapshot in your codespace; a push sends your commits to GitHub where others can see them.

---

## What you do not need to learn in advance

Do not feel that you must finish all of HTML, CSS, and JavaScript before the bootcamp. For now, focus on understanding the examples above and being able to experiment with them.

You do **not** need to learn React, advanced CSS, complex JavaScript internals, a backend framework, or advanced algorithms as a prerequisite. Topics such as JSON, `localStorage`, `try`/`catch` and `fetch` will be taught during the week, when the project needs them.

**The goal:** arrive ready to think, ask questions, try small changes, and explain what you observe. We will learn the next concept when our project needs it.
