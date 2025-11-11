// This file will be injected by popup before sending message in case
// the page doesn't already have the content script bound.
// It sets a message listener to perform highlight / reset.

(function() {
  if (window.__pageHighlighterInstalled) return;
  window.__pageHighlighterInstalled = true;

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || !msg.action) {
      sendResponse({ result: 'No action.' });
      return;
    }
    if (msg.action === 'highlight') {
      const paras = Array.from(document.querySelectorAll('p'));
      paras.forEach(p => {
        p.dataset.__origBg = p.style.backgroundColor || '';
        p.style.backgroundColor = 'yellow';
      });
      sendResponse({ result: 'Highlighted ' + paras.length + ' paragraphs.' });
    } else if (msg.action === 'reset') {
      const paras = Array.from(document.querySelectorAll('p'));
      paras.forEach(p => {
        p.style.backgroundColor = p.dataset.__origBg || '';
        delete p.dataset.__origBg;
      });
      sendResponse({ result: 'Reset ' + paras.length + ' paragraphs.' });
    } else {
      sendResponse({ result: 'Unknown action.' });
    }
    // return true not needed since we respond synchronously
  });
})();
