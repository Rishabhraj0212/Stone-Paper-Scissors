let playerScore = Number(localStorage.getItem("playerScore")) || 0;
let pcScore = Number(localStorage.getItem("pcScore")) || 0;

const playerScoreEl = document.getElementById("player-score");
const pcScoreEl = document.getElementById("pc-score");

if (playerScoreEl) playerScoreEl.innerText = playerScore;
if (pcScoreEl) pcScoreEl.innerText = pcScore;

/* Game Page Logic */
const choiceButtons = document.querySelectorAll(".choice");

if (choiceButtons.length > 0) {
  choiceButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      const playerChoice = btn.dataset.choice;
      const arr = ["stone", "paper", "scissor"];
      const pcChoice = arr[Math.floor(Math.random() * 3)];

      localStorage.setItem("playerChoice", playerChoice);
      localStorage.setItem("pcChoice", pcChoice);

      window.location.href = "result.html";
    });
  });
}

/* Result Page Logic */
const resultText = document.getElementById("result-text");

if (resultText) {
  const player = localStorage.getItem("playerChoice");
  const pc = localStorage.getItem("pcChoice");

  const playerPicked = document.getElementById("player-picked");
  const pcPicked = document.getElementById("pc-picked");

  playerPicked.innerHTML = getImage(player);
  pcPicked.innerHTML = getImage(pc);
  playerPicked.classList.add(`ring-${player}`);
  pcPicked.classList.add(`ring-${pc}`);

  const result = determineWinner(player, pc);

  if (result === "player") {
    playerScore++;
    localStorage.setItem("playerScore", playerScore);
    resultText.innerText = "YOU WIN\nAGAINST PC";
    playerPicked.classList.add("winner");

    // Show NEXT button
    // Show NEXT button
    const showNextBtn = document.getElementById("nextBtn");
    const rulesBtn = document.getElementById("rulesBtn");
    if (showNextBtn) showNextBtn.classList.remove("hidden");
    if (rulesBtn) rulesBtn.style.right = "150px";
  }
  else if (result === "pc") {
    pcScore++;
    localStorage.setItem("pcScore", pcScore);
    resultText.innerText = "YOU LOST\nAGAINST PC";
    pcPicked.classList.add("winner");
  }
  else {
    resultText.innerText = "TIE UP";
    const playAgainBtn = document.getElementById("play-again");
    if (playAgainBtn) playAgainBtn.innerText = "REPLAY";
  }
  if (playerScoreEl) playerScoreEl.innerText = playerScore;
  if (pcScoreEl) pcScoreEl.innerText = pcScore;
}

/* Play Again */
const playAgainBtn = document.getElementById("play-again");

if (playAgainBtn) {
  playAgainBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.onclick = () => {
    window.location.href = "hurray.html";
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

function determineWinner(player, pc) {
  if (player === pc) return "tie";

  if (
    (player === "stone" && pc === "scissor") ||
    (player === "paper" && pc === "stone") ||
    (player === "scissor" && pc === "paper")
  ) return "player";

  return "pc";
}

function getImage(choice) {
  const base = "assets/images";
  if (choice === "stone") return `<img src="${base}/stone.png" alt="rock">`;
  if (choice === "paper") return `<img src="${base}/paper.png" alt="paper">`;
  if (choice === "scissor") return `<img src="${base}/scissor.png" alt="scissors">`;
  return "";
}
