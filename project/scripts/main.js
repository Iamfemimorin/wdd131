const safetyTips = [
  { title: `Use unique passwords`, detail: `Choose a different, long password for each important account. A password manager can help you keep track of them.` },
  { title: `Turn on multifactor authentication`, detail: `Add a second verification step to important accounts whenever the service offers it.` },
  { title: `Pause before clicking`, detail: `Unexpected urgency, unusual payment requests, and unfamiliar links are reasons to stop and verify.` },
  { title: `Keep software updated`, detail: `Install operating system, browser, and application updates from trusted sources.` },
  { title: `Back up important files`, detail: `Keep separate copies of important files and occasionally check that you can restore them.` },
  { title: `Review privacy settings`, detail: `Check what information your accounts share and limit public details you do not need to disclose.` }
];

const threats = [
  { title: `Phishing`, category: `messages`, text: `Fraudulent messages imitate trusted people or organizations to trick you into clicking, downloading, or sharing information.`, response: `Check the sender and destination carefully. Visit the official site directly.` },
  { title: `Malware`, category: `devices`, text: `Malicious software may steal information, disrupt a device, or give an attacker access.`, response: `Install software from trusted sources and avoid unexpected attachments.` },
  { title: `Password attacks`, category: `accounts`, text: `Weak or reused passwords can make it easier for attackers to access accounts.`, response: `Use unique passwords and enable multifactor authentication.` },
  { title: `Online scams`, category: `messages`, text: `Scammers use pressure, fake prizes, job offers, or investment promises to obtain money or information.`, response: `Verify claims independently and do not rush a payment.` },
  { title: `Unpatched software`, category: `devices`, text: `Out-of-date software may contain security weaknesses that have already been addressed by an update.`, response: `Apply updates and remove applications you no longer use.` },
  { title: `Identity theft`, category: `accounts`, text: `Personal information can be misused to impersonate you or attempt fraud.`, response: `Limit what you share and review account activity and security alerts.` }
];

function updateFooterYear() {
  document.querySelectorAll(`.current-year`).forEach((element) => {
    element.textContent = `${new Date().getFullYear()}`;
  });
}

function setupMobileNavigation() {
  const menuButton = document.querySelector(`.menu-toggle`);
  const navigation = document.querySelector(`#primary-nav`);
  if (!menuButton || !navigation) return;

  menuButton.addEventListener(`click`, () => {
    const isExpanded = menuButton.getAttribute(`aria-expanded`) === `true`;
    menuButton.setAttribute(`aria-expanded`, `${!isExpanded}`);
    navigation.classList.toggle(`is-open`, !isExpanded);
  });
}

function setupSafetyTip() {
  const tipText = document.querySelector(`#daily-tip`);
  const tipButton = document.querySelector(`#new-tip`);
  if (!tipText || !tipButton) return;

  let previousTip = -1;
  tipButton.addEventListener(`click`, () => {
    let nextTip = Math.floor(Math.random() * safetyTips.length);
    if (safetyTips.length > 1 && nextTip === previousTip) {
      nextTip = (nextTip + 1) % safetyTips.length;
    }
    previousTip = nextTip;
    const tip = safetyTips[nextTip];
    tipText.textContent = `${tip.title}: ${tip.detail}`;
  });
}

function setupSafetyChecklist() {
  const form = document.querySelector(`#safety-check`);
  const feedback = document.querySelector(`#check-feedback`);
  const resetButton = document.querySelector(`#reset-check`);
  if (!form || !feedback || !resetButton) return;

  const storageKey = `cyberstart-safety-habits`;
  const checkboxes = [...form.querySelectorAll(`input[name="habit"]`)];
  let savedHabits = [];
  try {
    savedHabits = JSON.parse(localStorage.getItem(storageKey) || `[]`);
    if (!Array.isArray(savedHabits)) savedHabits = [];
  } catch (error) {
    savedHabits = [];
  }

  checkboxes.forEach((checkbox) => {
    checkbox.checked = savedHabits.includes(checkbox.value);
    checkbox.addEventListener(`change`, () => {
      const selected = checkboxes.filter((item) => item.checked).map((item) => item.value);
      localStorage.setItem(storageKey, JSON.stringify(selected));
    });
  });

  form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const selectedHabits = checkboxes.filter((item) => item.checked).map((item) => item.value);
    localStorage.setItem(storageKey, JSON.stringify(selectedHabits));
    const count = selectedHabits.length;
    let message = `You selected ${count} of ${checkboxes.length} safety habits.`;
    if (count === 0) {
      message = `Start with one habit: enable multifactor authentication on an important account.`;
    } else if (count === checkboxes.length) {
      message = `Excellent! You selected all ${checkboxes.length} habits. Keep reviewing them regularly.`;
    } else if (count < 3) {
      message = `You selected ${count} habits. Choose one more practical step to work on this week.`;
    } else {
      message = `Good progress: you selected ${count} habits. Keep practicing and review the remaining steps.`;
    }
    feedback.textContent = `${message}`;
  });

  resetButton.addEventListener(`click`, () => {
    checkboxes.forEach((checkbox) => { checkbox.checked = false; });
    localStorage.removeItem(storageKey);
    feedback.textContent = `Your saved checklist has been cleared. Select the habits you currently use.`;
  });
}

function renderThreatCards(items) {
  const threatList = document.querySelector(`#threat-list`);
  const status = document.querySelector(`#filter-status`);
  if (!threatList || !status) return;

  if (items.length === 0) {
    threatList.innerHTML = `<p class="empty-state">No threats match this filter.</p>`;
    status.textContent = `No threats found.`;
    return;
  }

  threatList.innerHTML = items.map((threat, index) => `
    <article class="topic-card">
      <span class="card-icon" aria-hidden="true">${String(index + 1).padStart(2, `0`)}</span>
      <h3>${threat.title}</h3>
      <p>${threat.text}</p>
      <p class="response"><strong>Safer response:</strong> ${threat.response}</p>
    </article>
  `).join(``);
  status.textContent = `Showing ${items.length} ${items.length === 1 ? `threat` : `threats`}.`;
}

function setupThreatFilter() {
  const filter = document.querySelector(`#threat-filter`);
  if (!filter) return;

  filter.addEventListener(`change`, () => {
    const selectedCategory = filter.value;
    const filteredThreats = selectedCategory === `all`
      ? threats
      : threats.filter((threat) => threat.category === selectedCategory);
    renderThreatCards(filteredThreats);
  });
}

updateFooterYear();
setupMobileNavigation();
setupSafetyTip();
setupSafetyChecklist();
setupThreatFilter();
