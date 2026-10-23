// logic.js — the brain of the app.
// Pure calculations only: no document, no window, no localStorage in this file.
// Every function here can be tested in the console or by `node --test`.
//
// Money is always stored in paise (whole numbers). ₹900 is 90000.
//
// Before writing any function: solve it on paper first,
// then write the steps as comments, then write the code.

/**
 * Day 1 — Is this a valid new participant name?
 * @param {string} name - what the user typed
 * @param {{id: string, name: string}[]} participants - people already in the group
 * @returns {string[]} error messages; an empty array means valid
 */
export function validateParticipant(name, participants) {
  throw new Error("TODO: validateParticipant");
}

/**
 * Day 1 — Is this expense valid?
 * @param {{id: string, description: string, amountPaise: number, paidBy: string, sharedBy: string[]}} expense
 * @param {{id: string, name: string}[]} participants
 * @returns {string[]} error messages; an empty array means valid
 */
export function validateExpense(expense, participants) {
  throw new Error("TODO: validateExpense");
}

/**
 * Day 1 — How much did each person pay in total?
 * @returns {Object<string, number>} e.g. { p1: 90000, p2: 0, p3: 30000 }
 */
export function totalPaid(participants, expenses) {
  throw new Error("TODO: totalPaid");
}

/**
 * Day 2 — Split one amount equally among the people who shared it.
 * Leftover paise go one each to the first people in sharedBy.
 * @param {number} amountPaise
 * @param {string[]} sharedBy - participant ids
 * @returns {Object<string, number>} e.g. splitAmount(100000, ["p1","p2","p3"]) → { p1: 33334, p2: 33333, p3: 33333 }
 */
export function splitAmount(amountPaise, sharedBy) {
  throw new Error("TODO: splitAmount");
}

/**
 * Day 2 — Each person's total fair share across all expenses.
 * @returns {Object<string, number>}
 */
export function fairShares(participants, expenses) {
  throw new Error("TODO: fairShares");
}

/**
 * Day 2 — Net balance = total paid − fair share.
 * Positive: gets money back. Negative: owes money.
 * @returns {Object<string, number>}
 */
export function calculateBalances(participants, expenses) {
  throw new Error("TODO: calculateBalances");
}

/**
 * Day 2 — Do all balances add up to exactly 0?
 * @param {Object<string, number>} balances
 * @returns {boolean} true if balanced; if not, also console.warn the total
 */
export function assertBalanced(balances) {
  throw new Error("TODO: assertBalanced");
}

/**
 * Day 2 — Who pays whom?
 * Must not change the balances object it receives.
 * Ties go to whoever comes first in the participants list.
 * @param {Object<string, number>} balances
 * @param {{id: string, name: string}[]} participants - gives the tie-break order
 * @returns {{from: string, to: string, amountPaise: number}[]}
 */
export function settle(balances, participants) {
  throw new Error("TODO: settle");
}
