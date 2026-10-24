# HTML, CSS and JavaScript — Preparation Topics Guide

This guide covers the **base and core basics** that will help you feel ready for the Frontend Problem-Solving Bootcamp. It is a revision guide, not an exam. You do not need to memorise everything before joining.

Our project is a **Group Expense Splitter**. We will use HTML to structure the page, CSS to make it clear and usable, and JavaScript to represent people and expenses and calculate results.

## How to use this guide

1. Read one topic at a time.
2. Type the examples yourself rather than only reading them.
3. Change a value and predict what will happen before running the code.
4. Explain the example aloud in your own words.
5. If something is confusing, mark it and bring the question to the bootcamp.

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

## 1.3 Lists and page sections

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

### HTML quick practice

- [ ] Create a page heading and a short description.
- [ ] Add a form with an expense name and amount.
- [ ] Add a button and a list containing two sample expenses.
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
const expenseName = "Hotel";
const amount = 900;
let numberOfPeople = 3;

numberOfPeople = 4;
```

Here, `expenseName` is a string and `amount` and `numberOfPeople` are numbers. `const` prevents reassignment of the variable; it does not make an object or array deeply immutable.

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

console.log(amount + 100); // 1000
```

Without conversion, the `+` operator can join strings instead of adding numbers. For money calculations, the bootcamp project will use integer paise internally to avoid common floating-point rounding issues.

## 3.3 Conditions

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

## 3.4 Functions

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

Why use a function? We can test the calculation separately and reuse it for different expenses. Returning `null` here is a simple example of handling an invalid count; a real application should also explain the validation error to the user.

## 3.5 Arrays: Keep a collection of items

An array stores an ordered collection.

```js
const people = ["Asha", "Ravi", "Mina"];

console.log(people[0]); // "Asha"
console.log(people.length); // 3
```

Array indexes start at zero, so the first item is at index `0`.

## 3.6 Objects: Describe one thing

An object groups related information using properties.

```js
const expense = {
  name: "Hotel",
  amount: 900,
  paidBy: "Asha",
  sharedBy: ["Asha", "Ravi", "Mina"]
};

console.log(expense.name); // "Hotel"
console.log(expense.paidBy); // "Asha"
```

The object describes one expense: its name, amount, payer, and participants. An array of expense objects can represent an entire trip.

```js
const expenses = [
  { name: "Hotel", amount: 900, paidBy: "Asha" },
  { name: "Lunch", amount: 450, paidBy: "Ravi" }
];
```

## 3.7 Loops: Repeat a task

```js
const expenses = [
  { name: "Hotel", amount: 900 },
  { name: "Lunch", amount: 450 }
];

let total = 0;

for (const expense of expenses) {
  total = total + expense.amount;
}

console.log(total); // 1350
```

The loop visits each expense and adds its amount to the running total. This is useful when the number of expenses can change.

## 3.8 Basic array methods

Array methods let us transform or select items.

```js
const expenses = [
  { name: "Hotel", amount: 900 },
  { name: "Lunch", amount: 450 },
  { name: "Taxi", amount: 200 }
];

const names = expenses.map(expense => expense.name);
const largeExpenses = expenses.filter(expense => expense.amount >= 500);

console.log(names); // ["Hotel", "Lunch", "Taxi"]
console.log(largeExpenses); // Hotel and Lunch
```

- `map` creates a new array by transforming each item.
- `filter` creates a new array containing items that pass a condition.
- `find` returns the first matching item, or `undefined` if none matches.

You can revise these methods now, but do not worry if they are unfamiliar. We will practise them when the problem needs them.

### JavaScript quick practice

- [ ] Store an expense amount and the number of people in variables.
- [ ] Write a function that calculates an equal share.
- [ ] Create an array of three people's names.
- [ ] Create an object describing one expense.
- [ ] Use a loop to calculate the total of two or three expenses.
- [ ] Use `filter` to find expenses above ₹500.
- [ ] Test what happens when the number of people is zero.

---

# 4. How JavaScript connects to HTML

HTML creates the input and button. JavaScript can read the input, respond to a click, and update the page.

```html
<label for="person-name">Person name</label>
<input id="person-name" type="text" />
<button id="greet-button" type="button">Greet</button>
<p id="message"></p>
```

```js
const nameInput = document.querySelector("#person-name");
const greetButton = document.querySelector("#greet-button");
const message = document.querySelector("#message");

greetButton.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name === "") {
    message.textContent = "Please enter a name.";
    return;
  }

  message.textContent = `Hello, ${name}!`;
});
```

**What happens?**

1. `querySelector` finds elements in the page.
2. `addEventListener` runs a function when the button is clicked.
3. `.value` reads what the user typed.
4. `.trim()` removes whitespace from the beginning and end.
5. The `if` statement checks for empty input.
6. `textContent` updates the visible text.

When displaying user-provided text, prefer `textContent` over `innerHTML` unless you specifically need to render trusted HTML.

---

# 5. Put the basics together

Imagine the user enters a hotel bill of ₹900 shared by three people.

| Technology | Its job |
| --- | --- |
| HTML | Provide the amount field, participant choices, button, and results section |
| CSS | Make the form and results clear, readable, and responsive |
| JavaScript variables | Hold the amount and number of participants |
| JavaScript objects and arrays | Represent people and expenses |
| Functions and arithmetic | Calculate each person's share |
| Conditions | Reject invalid values such as a missing amount or zero participants |
| DOM events | Run the calculation when the user submits the form |
| Testing | Check the result against examples we can calculate by hand |

The point is not to build the whole application before the bootcamp. It is to recognise how each basic concept helps solve one part of the problem.

# 6. Self-check: Can you explain these?

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

---

## What you do not need to learn in advance

Do not feel that you must finish all of HTML, CSS, and JavaScript before the bootcamp. For now, focus on understanding the examples above and being able to experiment with them.

You do **not** need to learn React, advanced CSS, complex JavaScript internals, a backend framework, or advanced algorithms as a prerequisite.

**The goal:** arrive ready to think, ask questions, try small changes, and explain what you observe. We will learn the next concept when our project needs it.
