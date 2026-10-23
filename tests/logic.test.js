// Auto-checks for js/logic.js
// Run locally with:  node --test
// GitHub runs these on every push once the workflow is switched on (Day 2).
//
// A function that still says "TODO" is skipped, not failed.
// Read a failing test like a bug report: which dataset, what was expected, what you returned.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateParticipant,
  validateExpense,
  totalPaid,
  splitAmount,
  fairShares,
  calculateBalances,
  assertBalanced,
  settle,
} from "../js/logic.js";

// Skip a test while any function it needs is still a TODO stub.
function check(name, body) {
  test(name, (t) => {
    try {
      body();
    } catch (err) {
      if (err && typeof err.message === "string" && err.message.startsWith("TODO")) {
        t.skip(`not written yet (${err.message})`);
        return;
      }
      throw err;
    }
  });
}

const sum = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
const rupees = (r) => Math.round(r * 100);

// Applies payments to a copy of the balances and returns the result.
function applyPayments(balances, payments) {
  const after = { ...balances };
  for (const p of payments) {
    after[p.from] += p.amountPaise;
    after[p.to] -= p.amountPaise;
  }
  return after;
}

// ---------- Dataset 1: everyone shares everything ----------
const d1People = [
  { id: "p1", name: "Asha" },
  { id: "p2", name: "Ravi" },
  { id: "p3", name: "Mina" },
];
const all1 = ["p1", "p2", "p3"];
const d1Expenses = [
  { id: "e1", description: "Hotel", amountPaise: rupees(900), paidBy: "p1", sharedBy: all1 },
  { id: "e2", description: "Lunch", amountPaise: rupees(300), paidBy: "p2", sharedBy: all1 },
  { id: "e3", description: "Fuel", amountPaise: rupees(300), paidBy: "p3", sharedBy: all1 },
];

// ---------- Dataset 2: not everyone shares ----------
const d2People = [
  { id: "p1", name: "Asha" },
  { id: "p2", name: "Ravi" },
  { id: "p3", name: "Mina" },
  { id: "p4", name: "Kiran" },
];
const d2Expenses = [
  { id: "e1", description: "Hotel", amountPaise: rupees(2400), paidBy: "p1", sharedBy: ["p1", "p2", "p3", "p4"] },
  { id: "e2", description: "Lunch", amountPaise: rupees(900), paidBy: "p2", sharedBy: ["p1", "p2", "p3"] },
  { id: "e3", description: "Movie", amountPaise: rupees(600), paidBy: "p4", sharedBy: ["p4", "p3"] },
];

// ---------- Dataset 3: rounding ----------
const d3People = d1People;
const d3Expenses = [
  { id: "e1", description: "Dinner", amountPaise: rupees(1000), paidBy: "p1", sharedBy: all1 },
];

// ---------- Dataset 6: the Goa trip ----------
const d6People = [
  { id: "p1", name: "Asha" },
  { id: "p2", name: "Bala" },
  { id: "p3", name: "Chitra" },
  { id: "p4", name: "Dev" },
  { id: "p5", name: "Esha" },
  { id: "p6", name: "Farhan" },
];
const all6 = ["p1", "p2", "p3", "p4", "p5", "p6"];
const d6Expenses = [
  { id: "e1", description: "Hotel", amountPaise: rupees(12000), paidBy: "p1", sharedBy: all6 },
  { id: "e2", description: "Train tickets", amountPaise: rupees(6000), paidBy: "p2", sharedBy: all6 },
  { id: "e3", description: "Scooter rental", amountPaise: rupees(1800), paidBy: "p4", sharedBy: ["p4", "p5", "p6"] },
  { id: "e4", description: "Seafood dinner", amountPaise: rupees(3000), paidBy: "p3", sharedBy: ["p1", "p2", "p3", "p5", "p6"] },
  { id: "e5", description: "Water sports", amountPaise: rupees(2400), paidBy: "p6", sharedBy: ["p6", "p1", "p2", "p4"] },
];

// ================= Day 1: validation =================

check("validateParticipant: accepts a new name", () => {
  assert.deepEqual(validateParticipant("Kiran", d1People), []);
});

check("validateParticipant: rejects an empty or spaces-only name", () => {
  assert.ok(validateParticipant("", d1People).length > 0, "empty name should be rejected");
  assert.ok(validateParticipant("   ", d1People).length > 0, "spaces-only name should be rejected");
});

check("validateParticipant: rejects a duplicate, ignoring case and extra spaces", () => {
  assert.ok(validateParticipant("asha ", d1People).length > 0, '"asha " should clash with "Asha"');
});

check("validateExpense: accepts a valid expense", () => {
  assert.deepEqual(validateExpense(d1Expenses[0], d1People), []);
});

check("validateExpense: rejects zero, negative and non-whole amounts", () => {
  for (const amountPaise of [0, -500, 12.5, NaN]) {
    const bad = { ...d1Expenses[0], amountPaise };
    assert.ok(validateExpense(bad, d1People).length > 0, `amountPaise ${amountPaise} should be rejected`);
  }
});

check("validateExpense: rejects an empty description", () => {
  const bad = { ...d1Expenses[0], description: "  " };
  assert.ok(validateExpense(bad, d1People).length > 0);
});

check("validateExpense: rejects a payer who is not in the group", () => {
  const bad = { ...d1Expenses[0], paidBy: "p99" };
  assert.ok(validateExpense(bad, d1People).length > 0);
});

check("validateExpense: rejects an expense nobody shared", () => {
  const bad = { ...d1Expenses[0], sharedBy: [] };
  assert.ok(validateExpense(bad, d1People).length > 0);
});

check("validateExpense: rejects a sharer who is not in the group", () => {
  const bad = { ...d1Expenses[0], sharedBy: ["p1", "p99"] };
  assert.ok(validateExpense(bad, d1People).length > 0);
});

// ================= Day 1: totals =================

check("totalPaid: Dataset 1", () => {
  assert.deepEqual(totalPaid(d1People, d1Expenses), { p1: 90000, p2: 30000, p3: 30000 });
});

check("totalPaid: Dataset 2 — Mina paid nothing but still appears with 0", () => {
  assert.deepEqual(totalPaid(d2People, d2Expenses), { p1: 240000, p2: 90000, p3: 0, p4: 60000 });
});

check("totalPaid: no expenses gives everyone 0", () => {
  assert.deepEqual(totalPaid(d1People, []), { p1: 0, p2: 0, p3: 0 });
});

// ================= Day 2: splitting and balances =================

check("splitAmount: divides evenly when it can", () => {
  assert.deepEqual(splitAmount(90000, all1), { p1: 30000, p2: 30000, p3: 30000 });
});

check("splitAmount: Dataset 3 — leftover paisa goes to the first sharer", () => {
  assert.deepEqual(splitAmount(100000, all1), { p1: 33334, p2: 33333, p3: 33333 });
});

check("splitAmount: two leftover paise go to the first two sharers", () => {
  assert.deepEqual(splitAmount(80000, ["p3", "p1", "p2"]), { p3: 26667, p1: 26667, p2: 26666 });
});

check("splitAmount: the shares always add up to the amount", () => {
  for (const amount of [1, 2, 99, 100001, 2500003]) {
    assert.equal(sum(splitAmount(amount, all6)), amount, `split of ${amount} paise`);
  }
});

check("fairShares: Dataset 2", () => {
  assert.deepEqual(fairShares(d2People, d2Expenses), { p1: 90000, p2: 90000, p3: 120000, p4: 90000 });
});

check("calculateBalances: Dataset 1", () => {
  assert.deepEqual(calculateBalances(d1People, d1Expenses), { p1: 40000, p2: -20000, p3: -20000 });
});

check("calculateBalances: Dataset 2 — only sharers pay for each expense", () => {
  assert.deepEqual(calculateBalances(d2People, d2Expenses), { p1: 150000, p2: 0, p3: -120000, p4: -30000 });
});

check("calculateBalances: Dataset 3 — rounding still sums to exactly 0", () => {
  assert.deepEqual(calculateBalances(d3People, d3Expenses), { p1: 66666, p2: -33333, p3: -33333 });
});

check("calculateBalances: Dataset 6 — the Goa trip", () => {
  assert.deepEqual(calculateBalances(d6People, d6Expenses), {
    p1: 780000, p2: 180000, p3: -60000, p4: -240000, p5: -420000, p6: -240000,
  });
});

check("calculateBalances: one person, one expense gives a balance of 0", () => {
  const solo = [{ id: "p1", name: "Asha" }];
  const exp = [{ id: "e1", description: "Tea", amountPaise: 2000, paidBy: "p1", sharedBy: ["p1"] }];
  assert.deepEqual(calculateBalances(solo, exp), { p1: 0 });
});

check("assertBalanced: true when balances sum to 0, false when they don't", () => {
  assert.equal(assertBalanced({ p1: 40000, p2: -20000, p3: -20000 }), true);
  const originalWarn = console.warn;
  console.warn = () => {}; // keep the test output clean
  try {
    assert.equal(assertBalanced({ p1: 40000, p2: -20000, p3: -19999 }), false);
  } finally {
    console.warn = originalWarn;
  }
});

// ================= Day 2: settlement =================

check("settle: Dataset 1", () => {
  const balances = { p1: 40000, p2: -20000, p3: -20000 };
  assert.deepEqual(settle(balances, d1People), [
    { from: "p2", to: "p1", amountPaise: 20000 },
    { from: "p3", to: "p1", amountPaise: 20000 },
  ]);
});

check("settle: Dataset 2 — Ravi (balance 0) is not in any payment", () => {
  const balances = { p1: 150000, p2: 0, p3: -120000, p4: -30000 };
  assert.deepEqual(settle(balances, d2People), [
    { from: "p3", to: "p1", amountPaise: 120000 },
    { from: "p4", to: "p1", amountPaise: 30000 },
  ]);
});

check("settle: Dataset 6 — matches the trace table", () => {
  const balances = { p1: 780000, p2: 180000, p3: -60000, p4: -240000, p5: -420000, p6: -240000 };
  assert.deepEqual(settle(balances, d6People), [
    { from: "p5", to: "p1", amountPaise: 420000 },
    { from: "p4", to: "p1", amountPaise: 240000 },
    { from: "p6", to: "p2", amountPaise: 180000 },
    { from: "p3", to: "p1", amountPaise: 60000 },
    { from: "p6", to: "p1", amountPaise: 60000 },
  ]);
});

check("settle: does not change the balances it was given", () => {
  const balances = { p1: 780000, p2: 180000, p3: -60000, p4: -240000, p5: -420000, p6: -240000 };
  const copy = { ...balances };
  settle(balances, d6People);
  assert.deepEqual(balances, copy, "settle changed the original balances object");
});

check("settle: nothing to settle gives an empty list", () => {
  assert.deepEqual(settle({ p1: 0, p2: 0, p3: 0 }, d1People), []);
});

// ================= Properties: true for any valid data =================

check("property: balances always sum to 0 (Datasets 1, 2, 3, 6)", () => {
  for (const [people, expenses] of [
    [d1People, d1Expenses], [d2People, d2Expenses], [d3People, d3Expenses], [d6People, d6Expenses],
  ]) {
    assert.equal(sum(calculateBalances(people, expenses)), 0);
  }
});

check("property: after all payments, everyone is at 0", () => {
  for (const [people, expenses] of [
    [d1People, d1Expenses], [d2People, d2Expenses], [d3People, d3Expenses], [d6People, d6Expenses],
  ]) {
    const balances = calculateBalances(people, expenses);
    const after = applyPayments(balances, settle(balances, people));
    for (const value of Object.values(after)) assert.equal(value, 0);
  }
});

check("property: at most (people with non-zero balance − 1) payments", () => {
  for (const [people, expenses] of [
    [d1People, d1Expenses], [d2People, d2Expenses], [d3People, d3Expenses], [d6People, d6Expenses],
  ]) {
    const balances = calculateBalances(people, expenses);
    const nonZero = Object.values(balances).filter((v) => v !== 0).length;
    assert.ok(settle(balances, people).length <= Math.max(nonZero - 1, 0));
  }
});

check("property: every payment is a positive whole number of paise", () => {
  const balances = calculateBalances(d6People, d6Expenses);
  for (const p of settle(balances, d6People)) {
    assert.ok(Number.isInteger(p.amountPaise) && p.amountPaise > 0, JSON.stringify(p));
  }
});
