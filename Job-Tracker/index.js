let currentTab = "all";
const tabs = ["all", "interview", "rejected"];

const tabActive = ["bg-[#3B82F6]", "text-white"];
const tabInactive = ["bg-white", "text-[#64748B]"];

const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("rejected-container");

const totalState = document.getElementById("state-total");
const interviewState = document.getElementById("state-interview");
const rejectedState = document.getElementById("state-rejected");
const availableJobs = document.getElementById("job-count");
const emptyState = document.getElementById("empty-state");



// Switch tab
function switchTab(id) {
  currentTab = id.replace("-btn", "");

  for (let tab of tabs) {
    const btnId = tab + "-btn";
    const tabName = document.getElementById(btnId);

    if (btnId === id) {
      tabName.classList.remove(...tabInactive);
      tabName.classList.add(...tabActive);
    } else {
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInactive);
    }
  }

  filterCards();
  updateState();
}

// filter cards
// just hide and show based on data-status 
function filterCards() {
  const allCards = document.querySelectorAll('.job-card')
  let visibleCount = 0;
  allCards.forEach(function (card) {
    const status = card.dataset.status;

    if (currentTab == 'all') {
      // show every card
      card.style.display = 'block'
      visibleCount++
    }
    else if (currentTab == status) {
      card.style.display = 'block'
      visibleCount++
    }
    else {
      card.style.display = "none"
    }

  });

  if (visibleCount === 0) {
    emptyState.classList.remove('hidden')
  }
  else {
    emptyState.classList.add('hidden')
  }
  availableJobs.innerText = visibleCount;

}


// update state
function updateState() {
  const allCards = document.querySelectorAll('.job-card')

  let total = 0;
  let interviewCount = 0;
  let rejectedCount = 0;

  allCards.forEach(function (card) {
    const status = card.dataset.status;
    total++;
    if (status == "interview") interviewCount++
    if (status == "rejected") rejectedCount++
  });

  totalState.innerText = total;
  interviewState.innerText = interviewCount;
  rejectedState.innerText = rejectedCount;
}

// card button clicks
// jobs container
const jobContainer = document.getElementById("card-container");

jobContainer.addEventListener("click", function (e) {
  const clickElement = e.target;
  const card = clickElement.closest(".job-card");

  // If click happened outside a card, stop here
  if (!card) return

  const badge = card.querySelector(".status");

  if (clickElement.classList.contains("interview")) {
    card.dataset.status = 'interview'
    badge.innerText = 'Interviewed'
    badge.style.backgroundColor = 'green'
    badge.style.color = 'white'

  } else if (clickElement.classList.contains("rejected")) {
    card.dataset.status = 'rejected'
    badge.innerText = 'Rejected'
    badge.style.backgroundColor = 'Red';
    badge.style.color = 'white'

  } else if (clickElement.classList.contains("delete")) {
    card.dataset.status = 'not-applied';
    badge.innerText = 'Not Applied';

  }
  filterCards()
  updateState();
});

switchTab('all-btn')
updateState()