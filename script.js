const monthlyInterest = 0.07; // 7% monthly

function makeDate(year, month, day) {
  return new Date(year, month - 1, day);
}

// Configure debt data here
const debtData = {
  "A0001": [
    { amount: 5, date: makeDate(2025, 4, 15) },
    { amount: 15, date: makeDate(2025, 6, 13) },
    { amount: 5, date: makeDate(2025, 11, 27) }
  ],
  "L0001": [
    { amount: 19.75, date: makeDate(2023, 10, 7) },
    { amount: 4, date: makeDate(2025, 7, 1) },
    { amount: 20, date: makeDate(2025, 11, 20) }
  ],
  "N0001": [
    { amount: 12.07, date: makeDate(2025, 8, 5) }
  ]
};

// Configure deduction data here
const deductionsData = {
  "L0001": [
    { amount: 4, label: "Provided loaner" },
    { amount: 4, label: "Paid off the amount before interest." }
  ]
};

function monthsBetween(fromDate, toDate) {
  const yDiff = toDate.getFullYear() - fromDate.getFullYear();
  const mDiff = toDate.getMonth() - fromDate.getMonth();
  const dayAdjust = toDate.getDate() < fromDate.getDate() ? -1 : 0;
  const months = yDiff * 12 + mDiff + dayAdjust;
  return Math.max(0, months);
}

function calculateDebt(code) {
  const events = debtData[code];
  const deductions = deductionsData[code] || [];

  if (!events) return null;

  const now = new Date();
  let total = 0;

  const breakdown = events.map(ev => {
    const months = monthsBetween(ev.date, now);
    const compounded = ev.amount * Math.pow(1 + monthlyInterest, months);
    total += compounded;
    return {
      original: ev.amount,
      date: new Date(ev.date),
      months,
      compounded
    };
  });

  // Subtract deductions
  const deductionBreakdown = deductions.map(d => {
    total -= d.amount;
    return {
      label: d.label,
      amount: d.amount
    };
  });

  return { breakdown, deductionBreakdown, total };
}

/* UI wiring */
const input = document.getElementById("codeInput");
const btn = document.getElementById("calculateBtn");
const output = document.getElementById("output");
const homeBtn = document.getElementById("homeBtn");

function formatCurrency(n) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });
}

function renderResult(code) {
  const res = calculateDebt(code);
  output.innerHTML = "";

  if (!res) {
    output.textContent = `No data found for "${code}".`;
    return;
  }

  // Debt events
  res.breakdown.forEach(ev => {
    const evDiv = document.createElement("div");
    evDiv.className = "event";

    const left = document.createElement("div");
    left.innerHTML = `
      <strong>${formatCurrency(ev.original)}</strong><br>
      <small>${ev.date.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</small>
    `;

    const right = document.createElement("div");
    right.innerHTML = `
      <small>${ev.months} month${ev.months === 1 ? "" : "s"} compounded</small><br>
      <strong>${formatCurrency(ev.compounded)}</strong>
    `;

    evDiv.appendChild(left);
    evDiv.appendChild(right);
    output.appendChild(evDiv);
  });

  // Deductions
  if (res.deductionBreakdown.length > 0) {
    const header = document.createElement("div");
    header.innerHTML = "<strong>Deductions</strong>";
    header.style.margin = "12px 0 6px";
    output.appendChild(header);

    res.deductionBreakdown.forEach(d => {
      const dedDiv = document.createElement("div");
      dedDiv.className = "event";
      dedDiv.style.background = "#ffecec";

      dedDiv.innerHTML = `
        <div><strong>${d.label}</strong></div>
        <div><strong>- ${formatCurrency(d.amount)}</strong></div>
      `;

      output.appendChild(dedDiv);
    });
  }

  // Total
  const tot = document.createElement("div");
  tot.className = "total";
  tot.textContent = `Total Debt: ${formatCurrency(res.total)}`;
  output.appendChild(tot);
}

function showWelcome() {
  input.value = "";
  output.innerHTML = `
    <p>Welcome to <strong>Debtector</strong> — enter a person code above to calculate their total debt with 7% monthly compounded interest.</p>
    <p>Person Codes include the first letter of the person's code and a number in numerical order.</p>
    <p>Example: <code>S0001</code></p>
  `;
}

showWelcome();

btn.addEventListener("click", () => {
  const code = input.value.trim().toUpperCase();
  if (!code) {
    output.innerHTML = `<p>Please enter a person code to see results.</p>`;
    return;
  }
  renderResult(code);
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") btn.click();
});

homeBtn.addEventListener("click", showWelcome);
