const state = {
  xp: Number(localStorage.getItem("certstack-xp") || 0),
  level: Number(localStorage.getItem("certstack-level") || 1),
  playSolved: false,
  battleSolved: false
};

const stages = [...document.querySelectorAll(".stage")];
const xpBar = document.getElementById("xpBar");
const xpLabel = document.getElementById("xpLabel");
const levelLabel = document.getElementById("levelLabel");

function renderStats() {
  const xpIntoLevel = state.xp % 100;
  levelLabel.textContent = "LVL " + state.level;
  xpLabel.textContent = xpIntoLevel + " / 100 XP";
  xpBar.style.width = xpIntoLevel + "%";
}

function gainXp(amount) {
  const oldLevel = state.level;
  state.xp += amount;
  state.level = Math.floor(state.xp / 100) + 1;
  localStorage.setItem("certstack-xp", state.xp);
  localStorage.setItem("certstack-level", state.level);
  renderStats();
  return state.level > oldLevel;
}

function showStage(id) {
  stages.forEach((stage) => stage.classList.toggle("active", stage.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", () => showStage(btn.dataset.next));
});

document.querySelectorAll("[data-play-answer]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (state.playSolved) return;

    const feedback = document.getElementById("playFeedback");

    if (btn.dataset.playAnswer === "customer") {
      state.playSolved = true;
      const leveled = gainXp(35);
      feedback.className = "feedback good";
      feedback.textContent =
        "CORRECT +35 XP — In IaaS, the customer manages the guest OS. Microsoft manages the physical infrastructure." +
        (leveled ? " LEVEL UP!" : "");
      setTimeout(() => showStage("battleStage"), 1100);
    } else {
      feedback.className = "feedback bad";
      feedback.textContent =
        "TRY AGAIN — Microsoft manages the physical host, but in IaaS the customer still manages the guest operating system.";
    }
  });
});

document.querySelectorAll("[data-answer]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (state.battleSolved) return;

    const feedback = document.getElementById("battleFeedback");

    if (btn.dataset.answer === "appservice") {
      state.battleSolved = true;
      const leveled = gainXp(65);
      feedback.className = "feedback good";
      feedback.textContent =
        "BOSS HIT +65 XP — Azure App Service is PaaS: deploy the app without managing the OS or server infrastructure." +
        (leveled ? " LEVEL UP!" : "");

      setTimeout(() => {
        document.getElementById("rewardText").textContent = leveled
          ? "LEVEL UP! Your tech girl powered up after mastering the mission."
          : "Your tech girl gained XP and moved closer to the next level.";
        showStage("masterStage");
      }, 1200);
    } else {
      feedback.className = "feedback bad";
      feedback.textContent =
        "NOT QUITE — Look for the option where Azure manages the platform and you focus on the application.";
    }
  });
});

document.getElementById("restartBtn").addEventListener("click", () => {
  state.playSolved = false;
  state.battleSolved = false;

  const playFeedback = document.getElementById("playFeedback");
  const battleFeedback = document.getElementById("battleFeedback");

  playFeedback.className = "feedback";
  playFeedback.textContent = "";
  battleFeedback.className = "feedback";
  battleFeedback.textContent = "";

  showStage("learnStage");
});

renderStats();
