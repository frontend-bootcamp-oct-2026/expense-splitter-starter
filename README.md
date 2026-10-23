# Expense Splitter

A group goes on a trip. Different people pay for different things. This app works out who owes whom and settles it in as few payments as possible.

Built during the Frontend Problem-Solving Bootcamp, October 2026.

> **On Day 5, replace this README with your own.** The section list at the bottom shows what to include.

## Start in the browser with GitHub Codespaces

1. Open your assigned repository in the bootcamp organization.
2. Select **Code** → **Codespaces** → **Create codespace on main**.
3. Wait for the browser-based VS Code editor to open. The first launch may take a little time while the environment is prepared.
4. Open the terminal from **Terminal → New Terminal**.
5. Run `npm run dev` to start the preview server.
6. Codespaces should forward port `5173` and open the preview. If it does not, open the **Ports** panel and click the forwarded port.
7. Keep the terminal running while you work. Stop the server with `Ctrl+C`.

Don't install extra packages or change the project setup without checking with the trainer first.

## How we work

1. **Paper first.** Solve it by hand before you write code.
2. **Comments before code.** Write the steps in plain English, then the JavaScript.
3. **Build small.** One function at a time, tested in the console before you move on.
4. **The 10-minute rule.** Stuck for 10 minutes? Ask. Not after an hour.

## AI rules

- **`js/logic.js` is yours.** AI can explain a concept or an error message, but it doesn't write these functions.
- **Everywhere else,** AI can help, as long as you can explain every line you keep.
- **Log it.** Add a line to `ai-log.md` each time you use AI: what you asked, what you kept, what you changed.
- **Can't explain a line?** Then it isn't your line yet. Delete it and write it again.

## Commit rule

Commit every time a function works, with a message that says what works:

```
totalPaid passes Dataset 2
```

Your commit history is how you (and your trainer) see your progress.

## Check your logic

The tests in `tests/` check `js/logic.js` against the datasets you solved on paper. A function that still says `TODO` is skipped, not failed.

- **In Codespaces:** run `node --test` in the terminal.
- **On GitHub:** on Day 2 afternoon, you'll enable automatic checks by uncommenting the `push` lines in `.github/workflows/check.yml`, then committing and pushing that change.

## Files

| File | What goes in it | Day |
| --- | --- | --- |
| `js/logic.js` | All calculations. No DOM. | 1–2 |
| `js/ui.js` | Rendering and click handlers | 3 |
| `js/storage.js` | Saving in the browser | 4 |
| `js/api.js` | Syncing with the Google Sheet | 4 |
| `js/main.js` | Starts the app | 1 |
| `warmups/` | Daily recap exercises | 1–5 |
| `ai-log.md` | Your AI log | 1–5 |

---

## Your Day 5 README should cover

- Live demo link
- What the app does
- How the balances are calculated
- How the settlement works, and when it isn't the minimum
- Data model
- Your personal feature
- How you used AI
- Limitations
- How to run it
