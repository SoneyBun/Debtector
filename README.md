<!-- Alignment -->
<div align="center">
  <!-- Banner -->
  <img width="1197" height="119" alt="DBTCTOR" src="https://github.com/user-attachments/assets/851084e9-fae3-4aaa-909e-a10d7b004bc3" />

  <!-- Divider -->
  ---

  <h3>How To Use</h3>

  <a href="./script.js" target="_blank">`script.js`</a> contains debtData, in which you can insert new people and add new debts.
  
</div>

<!-- Code -->
 ```js
// Configure debt data here
const debtData = {
  "J0001": [
    { amount: 42, date: makeDate(2019, 12, 2) }
  ],
  "J0002": [
    { amount: 6, date: makeDate(2025, 4, 1) },
    { amount: 7, date: makeDate(2025, 4, 7) }
  ],
  "J0003": [
    { amount: 20, date: makeDate(2024, 6, 15) },
    { amount: 15, date: makeDate(2024, 9, 3) }
  ]
};
```

<!-- Alignment -->
<div align="center">
  
  In order to use deductions,  you can insert deductions in here. Make sure to use the same person code.
  
</div>

<!-- Code -->
```js
// Configure deduction data here
const deductionsData = {
  "J0003": [
    { amount: 12, label: "Returned Item Deduction" },
    { amount: 3, label: "System Correction" }
  ]
};
```

<!-- Alignment -->
<div align="center">
  
  <a href="./index.html" target="_blank">`index.html`</a> includes This Repo Link, where you can replace the repository link with that of your fork.
  
</div>

<!-- Code -->
```html
<!-- This Repo Link -->
<a href="https://github.com/Debtector/Debtector" target="_blank" rel="noopener" class="github-btn">
  <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub Logo" class="repo-icon">
  This GitHub Repository
</a>
```

<!-- Divider -->
---

<!-- Alignment -->
<div align="center">
  <!-- Fork Button -->
  <a href="https://github.com/Debtector/Debtector" target="_blank"><img alt="Static Badge" src="https://img.shields.io/badge/Fork-Debtector?style=for-the-badge&logo=GitHub&color=%23348543"></a>
</div>

