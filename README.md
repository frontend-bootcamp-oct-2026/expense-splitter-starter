# Expense Splitter Bootcamp

A group goes on a trip. Different people pay for different things. This app works out who owes whom and suggests a settlement using as few payments as our greedy approach can manage.

Built during the **Frontend Problem-Solving Bootcamp**.

## What problem are we solving?

Imagine six friends on a trip. One pays for the hotel, another pays for lunch, and someone else pays for fuel. Some costs are shared by everyone; others are shared only by a few people.

At the end, the group needs to answer:

- How much did each person pay?
- What was each person's fair share?
- Who should receive money, and who still owes money?
- How can we settle the balances with fewer transfers?
- What happens when an expense is invalid or cannot be split evenly?

We will build a web application that lets us add people and expenses, see balances, calculate suggested payments, save the trip in the browser, and publish the result online.

**Our learning approach:** start with a real problem, understand it in plain English, write down the steps, implement one small piece, test it, and explain why it works. We are not learning concepts in isolation and looking for an example afterward. We learn each concept when the problem needs it.

## How web technologies help us solve it

| Technology / concept | Why the problem needs it | What we will implement |
| --- | --- | --- |
| HTML: forms, labels, inputs, buttons, lists | People need a clear way to enter and review information | Expense form, payer selector, participant choices, expense list, balances and settlements |
| CSS: selectors, box model, Flexbox, spacing, responsive layout | Information should be readable and usable on different screen sizes | Style the form, expense list, balance summaries, and settlement suggestions |
| JavaScript variables, numbers, operators | We must represent amounts and perform calculations | Store amounts in integer paise; calculate totals and shares |
| Arrays and objects | A trip contains multiple people and multiple expenses, each with its own details | Model participants and expenses using arrays and objects |
| Conditions and validation | Real users can submit missing, invalid, or inconsistent data | Validate amounts, payer, participants, and sharers; handle empty and unusual cases |
| Functions and decomposition | Each calculation should have one clear responsibility and be testable | Implement `validateExpense`, `totalPaid`, `splitAmount`, `fairShares`, `calculateBalances`, `settle`, and `formatRupees` |
| Loops and array methods (`map`, `filter`, `reduce`, sorting) | We need to process many expenses and separate people who owe money from people who should receive it | Aggregate totals, calculate balances, and prepare creditors and debtors |
| Integer division and remainder | Some amounts do not divide equally into whole paise | Split remainders consistently without losing money |
| DOM selection, events, state and rendering | The calculation needs to respond to user actions in the webpage | Handle form submissions, update app state, and render the latest expenses and results |
| JSON and `localStorage` | Refreshing the page should not erase the trip | Save and restore participants and expenses, with basic error handling |
| Testing and debugging | A plausible-looking answer can still be wrong | Run tests, check edge cases, inspect errors, and verify that balances sum to zero |
| GitHub, commits and deployment | We need a record of progress and a shareable working application | Commit working milestones and publish the app with GitHub Pages |
| AI-assisted learning | AI can help explain unfamiliar concepts, but should not replace our thinking | Ask for explanations or debugging hints, log AI usage, and explain every line of AI-assisted code |

### A small example

Asha pays ₹900 for a hotel shared equally by Asha, Ravi, and Mina.

- Fair share: ₹900 ÷ 3 = ₹300 per person.
- Asha paid ₹900 and used ₹300 of the benefit, so Asha should receive ₹600 overall.
- Ravi owes ₹300 to Asha.
- Mina owes ₹300 to Asha.

This one situation gives us a reason to use variables, arrays and objects, arithmetic, functions, and eventually DOM rendering. We will then make the example more realistic by adding more expenses, different groups of sharers, invalid input, and remainder paise.

## Six-day learning and implementation plan

We meet **three times per day online**, for one-hour Google Meet sessions in the morning, afternoon, and evening. The exact meeting links and timings will be shared separately.

Each session follows a simple rhythm: reconnect and recap, think through the problem, build a small piece, test and explain it, then record a checkpoint.

### Day 1: Understand the problem and model the data

**Topics:** problem decomposition, variables, numbers, operators, conditions, functions, arrays, objects, loops, and basic validation.

**Implement:** represent participants and expenses; write and test the first small logic functions, including `validateExpense` and `totalPaid`.

**Outcome:** explain the expense data model, validate a basic expense, and calculate how much each person paid.

### Day 2: Fair shares, balances, and settlement logic

**Topics:** integer paise, division and remainder, `map`, `filter`, `reduce`, sorting, separating positive and negative balances, and breaking an algorithm into functions.

**Implement:** `splitAmount`, `fairShares`, `calculateBalances`, and `settle`; run `node --test` to check them against the supplied datasets, and switch on the automatic GitHub checks (see [Check your logic](#check-your-logic)).

**Outcome:** explain why a person may owe or receive money, calculate net balances, and trace each suggested transfer. Our greedy settlement is designed to reduce the number of payments, but it does not guarantee the mathematically smallest possible number in every case.

### Day 3: Connect JavaScript to the webpage

**Topics:** HTML forms, CSS layout, DOM selection, event listeners, form handling, state, rendering, and validation feedback.

**Implement:** an interface to add expenses and participants, show the expense list and balances, and display suggested settlements. Add `formatRupees` in `js/ui.js` to show paise as rupees (for example, `33334` → `₹333.34`).

**Outcome:** enter an expense through the UI and explain how the event triggers validation, calculation, and a page update.

### Day 4: Save data and handle edge cases

**Topics:** JSON, `localStorage`, try/catch, testing, debugging, and changing existing behaviour safely.

**Implement:** save and restore the trip; test empty, zero, negative, malformed, and uneven amounts, missing sharers, and other edge cases. Start an individual feature variation where time allows.

**Outcome:** refresh the page without losing saved trip data, explain what happens when input is invalid, and demonstrate tests for important cases.

### Day 5: Prepare and publish the application

**Topics:** final integration, regression testing, Git commits, deployment, project documentation, and explaining technical decisions.

**Implement:** fix key defects, verify the full user flow, deploy with GitHub Pages, and update the project README with the demo link, data model, calculations, limitations, and AI usage.

**Outcome:** share a working application and explain how the main pieces fit together.

### Day 6: Independent problem-solving and demos

**Topics:** reading a new requirement, planning before coding, modifying existing logic, testing, debugging, and communicating trade-offs.

**Implement:** an individual change or challenge, then demonstrate and explain the result. Possible challenges include a percentage split, excluding a participant, recording repayments, or changing settlement preferences.

**Outcome:** show what you can solve independently, explain your approach, test a new case, and identify what you would improve next.

## Preparation checklist

Please complete these before Day 1. You do **not** need to master every topic before the bootcamp; the aim is to make sure you can join and start.

1. **[Student Preparation Checklist](PREPARATION-CHECKLIST.md)** — accounts, Codespaces, a test commit and push, the topics to revise, and a final readiness check.
2. **[HTML, CSS and JavaScript Preparation Topics Guide](PREPARATION-TOPICS-GUIDE.md)** — the core basics with examples you can run, starting with where to run them.

If setup fails, contact the trainer before the first session rather than spending hours stuck alone.

## Getting started

### Your repository

The trainer creates a repository for you in the bootcamp organization, named `expense-splitter-<your-github-username>`, and gives you write access. Watch your email for the GitHub invitation and click **Accept**. All your work goes into this repository.

### Open it in GitHub Codespaces

1. Open your repository on GitHub.
2. Select **Code** → **Codespaces** → **Create codespace on main**.
3. Wait for the browser-based VS Code editor to open. The first launch can take a couple of minutes.
4. Open the terminal from **Terminal → New Terminal**.
5. Run `npm run dev` to start the preview server.
6. Codespaces should forward port `5173` and open the preview. If it doesn't, open the **Ports** panel and click the forwarded port.
7. Keep that terminal running while you work. Stop the server with `Ctrl+C`.

At the end of each day, stop your codespace (**Code → Codespaces → ⋯ → Stop codespace**) so it doesn't use up your free monthly hours. Your work is safe as long as you've committed and pushed it. If you haven't done that before, see [Save your work: Git in Codespaces](PREPARATION-TOPICS-GUIDE.md#5-save-your-work-git-in-codespaces).

Don't install extra packages or change the project setup without checking with the trainer first.

### Check your logic

The tests in `tests/` check `js/logic.js` against the datasets you solve on paper. A function that still says `TODO` is skipped, not failed.

- **In Codespaces:** open a second terminal (the first one is running the preview) and run `node --test`.
- **On GitHub (from Day 2):** switch on automatic checks by removing the `#` in front of the two `push` lines in `.github/workflows/check.yml`, then commit and push. From then on, every push shows a green tick or a red cross next to your commit.

## How we will use AI

- **Core calculation logic in `js/logic.js` is yours.** AI may explain a concept or an error message, but it should not write these functions for you.
- For HTML and CSS, AI can help, but you must be able to explain every line you keep.
- Record each AI interaction in `ai-log.md`: what you asked, what you kept, and what you changed.
- If you cannot explain a line, pause and work through it before keeping it.
- The goal is not to avoid AI. The goal is to use it without giving away your thinking.

## How we will measure progress

We will look at evidence, not just the number of commits or how fast someone types.

At checkpoints, the trainer will note whether you can:

1. Explain the problem and propose an approach.
2. Implement a small function with appropriate guidance.
3. Test the function and debug a failure.
4. Explain your code in your own words.
5. Apply the idea to a new example or requirement.

It is okay to need guidance at first. We want to see progress toward solving and explaining more independently.

## Project files

| File / folder | Purpose | Planned focus |
| --- | --- | --- |
| `js/logic.js` | Pure calculations and validation; no DOM | Days 1–2 |
| `js/ui.js` | Rendering and event handlers | Day 3 |
| `js/storage.js` | Saving and restoring trip data | Day 4 |
| `js/api.js` | Optional Google Sheets sync, if time allows | Stretch |
| `js/main.js` | Starts and connects the app | Across the project |
| `tests/` | Checks logic against datasets and expected behaviour | Days 1–4 |
| `warmups/` | Short daily recap exercises | Days 1–5 |
| `ai-log.md` | Record of AI usage and decisions | Days 1–5 |

Google Sheets sync is a stretch goal, not a requirement for the core application. We will prioritise correct calculations, a usable interface, persistence, testing, and deployment.

## Working agreements

1. **Paper first:** solve a small example by hand before coding.
2. **Comments before code:** write the steps in plain English, then translate them into JavaScript.
3. **Build small:** implement and test one function at a time.
4. **Ask early:** if you have been stuck for 10 minutes, ask for help.
5. **Commit working milestones:** use messages that describe what works, for example `totalPaid passes Dataset 2`.
6. **Explain your work:** if you use code, you should be able to tell us what it does and why.

## Final README handover

Before your final demo, make sure your project README includes:

- Live demo link
- What the app does
- How balances are calculated
- How settlement works, including its limitations
- Data model
- Your individual feature
- How you used AI
- Known limitations
- How to run the project

**By the end of the bootcamp, the goal is not only a deployed expense splitter. It is a student who can explain the problem, reason about the solution, test it, and make a meaningful change independently.**
