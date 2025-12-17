# Keyword Pause Detector for DelugeRPG ⚪🔴

**A lightweight Chrome extension designed to prevent accidental skips of rare Pokémon encounters in DelugeRPG.**

---

## 📖 Overview

This extension solves a specific gameplay frustration when grinding or exploring in **DelugeRPG**. When moving continuously using arrow keys to cover ground quickly, the game interface updates asynchronously. Often, a rare Pokémon (like a *Retro* or *Legendary*) appears for a split second, but because the next arrow key input is already registered, the player accidentally moves away, losing the encounter.

This tool monitors the game's text output and **automatically blocks movement inputs** the moment a high-value keyword is detected.

---

## ❓ The Problem

While exploring maps efficiently using continuous arrow key presses, the game loop looks like this:
1. Player presses Arrow Key.
2. Game displays **“Searching…”**
3. Game resolves to either a Pokémon encounter or a "Couldn't find anything" message.

**The Issue:** Rare Pokémon can appear in the milliseconds between two rapid key presses. Human reaction time is often too slow to stop pressing the key before the map refreshes, resulting in a missed capture opportunity.

---

## ✨ How It Works

This extension does **not** automate gameplay. It acts as a safety brake.

1. **Detection:** It waits for the "Searching..." state to resolve and reads the final text on the screen.
2. **Matching:** It checks the text against a user-defined list of keywords (e.g., "Shiny", "Legendary").
3. **Intervention:** If a match is found, the extension **intercepts and blocks** keyboard input immediately.
4. **Notification:** A popup/alert appears to notify the user.
5. **Resume:** The user manually dismisses the alert to capture the Pokémon and resume playing.

---

## 🎯 Default Keywords

Out of the box, the extension is configured to stop for the following categories:

* **Legendary**
* **Mythical**
* **Ultrabeasts**
* **Paradox**
* **Retro**
* **Shiny**

### ⚙️ Customizing Keywords

You can easily modify which Pokémon trigger the pause by editing the `keywords.json` file included in the extension folder.

```json
{
  "keywords": [
    "Legendary",
    "Mythical",
    "Ultrabeasts",
    "Paradox",
    "Retro",
    "Shiny",
    "Shadow" 
  ]
}
```

Add or remove keywords as you like, then reload the extension.

---

## 🧩 Installation (Chrome)

1. Clone or download this repository
```
git clone https://github.com/SGCODEX/Keyword-Pause-Detector-for-DelugeRPG.git
```
2. Open Chrome and go to:
```
chrome://extensions
```
3. Enable Developer Mode
4. Click Load unpacked
5. Select the project folder
6. Open DelugeRPG and start playing
7. Reload the extension after any code or keyword changes. And close and open the game again too.

---

## 🖼 Screenshots

Below is how the extension appears on the Chrome extensions page:

<img width="316" height="172" alt="Screenshot 2025-12-17 194408" src="https://github.com/user-attachments/assets/401d2e10-1436-4da5-bd50-a24312103747" />

Extension in action:

<img width="700" height="400" alt="Screenshot 2025-12-17 200855" src="https://github.com/user-attachments/assets/111fdbbc-f1c5-47b6-be8f-f2bd3c97957e" />
<img width="700" height="400" alt="Screenshot 2025-12-17 200927" src="https://github.com/user-attachments/assets/13db690b-93e0-47a9-9e86-081f59910ea7" />


---

## ⚠️ Disclaimer & Community Guidelines

This extension:
- Does not automate gameplay
- Does not send inputs to the game
- Does not modify game files or requests
- Only observes visible on-screen text and manages local keyboard input

**If this project is found to be against DelugeRPG’s community guidelines or terms of service, I am completely willing to take it down immediately.**

This project is shared for educational and personal-use purposes only.

---

## 📌 Notes

- No personal data is collected
- No network requests are made
- No user tracking or analytics
- Runs entirely in the browser

---

## 🙌 Final Thoughts

This project helped me understand:

- Browser input handling
- Asynchronous UI state detection
- Real-world Chrome extension behavior

---

## Contribution
We welcome contributions to this project. Feel free to fork the repository, make improvements, and submit pull requests. We value all contributions, whether it's through code, documentation, creating demos or just spreading the word.

---

## License
This project is licensed under the MIT License
