let keywords = [];
let paused = false;
let waitingForResult = false;

/* ---------------- INIT ---------------- */

console.log("🎮 Pokemon Detector Loaded");

fetch(chrome.runtime.getURL("keywords.json"))
  .then(res => res.json())
  .then(data => {
    keywords = data.keywords.map(k => k.toLowerCase());
    console.log("✅ Keywords loaded:", keywords);
  });

/* ---------------- KEY HANDLER ---------------- */

function keyHandler(e) {
  if (paused) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  if (!e.key || !e.key.startsWith("Arrow")) return;

  if (waitingForResult) return; // prevent overlap

  console.log("➡️ Arrow key pressed:", e.key);
  waitingForResult = true;

  waitForResultAfterMove();
}

/* Capture keys everywhere */
window.addEventListener("keydown", keyHandler, true);
document.addEventListener("keydown", keyHandler, true);

/* Restore focus if lost */
window.addEventListener("click", () => window.focus());

/* ---------------- GAME STATE WATCHER ---------------- */

function getScreenText() {
  return document.body?.innerText.toLowerCase() || "";
}

function waitForResultAfterMove() {
  let sawSearching = false;

  const observer = new MutationObserver(() => {
    const text = getScreenText();

    // Step 1: wait until "Searching..." appears
    if (!sawSearching && text.includes("searching")) {
      sawSearching = true;
      console.log("🔍 Searching detected...");
      return;
    }

    // Step 2: searching disappeared → final result ready
    if (sawSearching && !text.includes("searching")) {
      observer.disconnect();
      waitingForResult = false;
      console.log("✅ Final result detected");
      scanFinalResult(text);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // Safety timeout (network lag / edge case)
  setTimeout(() => {
    observer.disconnect();
    waitingForResult = false;
    console.log("⚠️ Timeout waiting for result");
  }, 2500);
}

/* ---------------- SCAN FINAL RESULT ---------------- */

function scanFinalResult(text) {
  for (const word of keywords) {
    if (text.includes(word)) {
      console.log(`🎯 RARE FOUND: ${word.toUpperCase()}`);
      pauseGame(word);
      return;
    }
  }

  // 👇 THIS IS WHAT YOU ASKED FOR
  console.log("❌ No rare keyword found in result");
}

/* ---------------- PAUSE + MODAL ---------------- */

function pauseGame(word) {
  paused = true;

  if (document.getElementById("poke-detector-modal")) return;

  const overlay = document.createElement("div");
  overlay.id = "poke-detector-modal";

  overlay.innerHTML = `
    <div style="
      background:#111;
      padding:26px 34px;
      border-radius:14px;
      text-align:center;
      box-shadow:0 0 45px gold;
      max-width:420px;
      font-family:system-ui;
    ">
      <h2 style="color:gold;margin-bottom:10px;">
        ⚡ ${word.toUpperCase()} POKÉMON DETECTED!
      </h2>
      <p style="color:#ddd;margin-bottom:18px;">
        Game paused. Controls are locked.
      </p>
      <button id="poke-resume" style="
        padding:12px 22px;
        font-size:16px;
        cursor:pointer;
        background:gold;
        border:none;
        border-radius:8px;
      ">
        Resume & Catch
      </button>
    </div>
  `;

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.78)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "999999"
  });

  document.body.appendChild(overlay);

  document.getElementById("poke-resume").onclick = () => {
    paused = false;
    overlay.remove();
    console.log("▶️ Game resumed");
  };
}
