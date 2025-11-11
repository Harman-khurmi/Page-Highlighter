# Page Highlighter (Demo) — Chrome Extension (Manifest V3)

A simple Chrome extension built using **Manifest V3**, demonstrating:
- Popup UI interaction
- Script injection using the `chrome.scripting` API
- Communication between popup and content script
- Using `chrome.storage.local` to remember user settings

This extension lets users **highlight all paragraphs (`<p>`) on a webpage** or **reset them** back to normal with a single click.

---

## 🚀 Features
- Toolbar icon with popup UI
- Highlight paragraphs on any webpage
- Reset highlights easily
- Option to “Remember last action”
- Uses latest **Manifest V3 APIs**
- Clean, modular structure — ideal for beginners learning Chrome extension development

---

## 🧠 Concepts Covered
This project covers essential Chrome Extension concepts:
1. **Manifest V3 basics**
   - Declaring name, permissions, actions, etc.
2. **Popup**
   - HTML/CSS/JS UI displayed when clicking the toolbar icon.
3. **Content Scripts**
   - JS injected into webpages to modify their DOM.
4. **Messaging**
   - Popup ↔ Content Script communication using `chrome.tabs.sendMessage`.
5. **Dynamic Script Injection**
   - Injecting content scripts programmatically with `chrome.scripting.executeScript`.
6. **Storage**
   - Saving user preferences in `chrome.storage.local`.

---

## 🧩 Project Structure

