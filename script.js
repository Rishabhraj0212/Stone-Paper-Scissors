let userScore = Number(localStorage.getItem("userScore")) || 0;
let computerScore = Number(localStorage.getItem("computerScore")) || 0;

const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("computer-score");

if (userScoreEl) userScoreEl.innerText = userScore;
if (compScoreEl) compScoreEl.innerText = computerScore;

/* Game Page Logic */
const choices = document.querySelectorAll(".choice");

if (choices.length > 0) {
  choices.forEach(btn => {
    btn.addEventListener("click", () => {

      const userChoice = btn.dataset.choice;
      const arr = ["stone", "paper", "scissor"];
      const pcChoice = arr[Math.floor(Math.random() * 3)];

      localStorage.setItem("userChoice", userChoice);
      localStorage.setItem("pcChoice", pcChoice);

      window.location.href = "result.html";
    });
  });
}

/* Result Page Logic */
const resultText = document.getElementById("result-text");

if (resultText) {
  const user = localStorage.getItem("userChoice");
  const pc = localStorage.getItem("pcChoice");

  const userPicked = document.getElementById("user-picked");
  const pcPicked = document.getElementById("pc-picked");

  userPicked.innerText = getEmoji(user);
  pcPicked.innerText = getEmoji(pc);

  const result = getWinner(user, pc);

  if (result === "user") {
    userScore++;
    localStorage.setItem("userScore", userScore);
    resultText.innerText = "YOU WIN AGAINST PC";
    userPicked.classList.add("winner");

    setTimeout(() => {
      window.location.href = "hurray.html";
    }, 1000);
  }
  else if (result === "pc") {
    computerScore++;
    localStorage.setItem("computerScore", computerScore);
    resultText.innerText = "YOU LOST AGAINST PC";
    pcPicked.classList.add("winner");
  }
  else {
    resultText.innerText = "TIE UP";
  }

  if (userScoreEl) userScoreEl.innerText = userScore;
  if (compScoreEl) compScoreEl.innerText = computerScore;
}

/* Play Again */
const playAgainBtn = document.getElementById("play-again");

if (playAgainBtn) {
  playAgainBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

/* Rules Modal */
// there may be multiple rule buttons on different pages
const rulesButtons = document.querySelectorAll(".rules-btn");
const modal = document.querySelector(".rules-popup");
const closeBtn = document.querySelector(".close-btn");

if (rulesButtons.length > 0 && modal) {
  rulesButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

function getWinner(user, pc) {
  if (user === pc) return "tie";

  if (
    (user === "stone" && pc === "scissor") ||
    (user === "paper" && pc === "stone") ||
    (user === "scissor" && pc === "paper")
  ) return "user";

  return "pc";
}

function getEmoji(choice) {
  if (choice === "stone") return "✊";
  if (choice === "paper") return "✋";
  if (choice === "scissor") return "✌️";
}