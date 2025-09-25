const monthlyInterest = 0.07; // 7% monthly

function makeDate(year, month, day) {
  return new Date(year, month - 1, day);
}

// Configure debt data here
const debtData = {
  "J0001": [
    { amount: 42, date: makeDate(2003, 12, 2) }
  ],
  "J0002": [
    { amount: 6, date: makeDate(2025, 4, 1) },
    { amount: 7, date: makeDate(2025, 4, 7) }
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

  return { breakdown, total };
}

/* UI wiring */
const input = document.getElementById("codeInput");
const btn = document.getElementById("calculateBtn");
const output = document.getElementById("output");
const homeBtn = document.getElementById("homeBtn");

function formatCurrency(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits:2 });
}

function renderResult(code) {
  const res = calculateDebt(code);
  output.innerHTML = "";
  if (!res) {
    output.textContent = `No data found for "${code}".`;
    return;
  }

  res.breakdown.forEach(ev => {
    const evDiv = document.createElement("div");
    evDiv.className = "event";
    const left = document.createElement("div");
    left.innerHTML = `<strong>${formatCurrency(ev.original)}</strong><br><small>${ev.date.toLocaleString(undefined,{month:'long', year:'numeric'})}</small>`;
    const right = document.createElement("div");
    right.innerHTML = `<small>${ev.months} month${ev.months===1?"":"s"} compounded</small><br><strong>${formatCurrency(ev.compounded)}</strong>`;
    evDiv.appendChild(left);
    evDiv.appendChild(right);
    output.appendChild(evDiv);
  });

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

/* Show welcome message on load */
showWelcome();

btn.addEventListener("click", () => {
  const code = input.value.trim().toUpperCase();
  if (!code) {
    output.innerHTML = `<p>Please enter a person code to see results.</p>`;
    return;
  }
  renderResult(code);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

homeBtn.addEventListener("click", showWelcome);
