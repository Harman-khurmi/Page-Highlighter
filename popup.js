// popup.js: runs in the popup context
const highlightBtn = document.getElementById('highlightBtn');
const resetBtn = document.getElementById('resetBtn');
const remember = document.getElementById('remember');
const status = document.getElementById('status');

function setStatus(msg) {
  status.textContent = msg;
}

async function sendMessageToActiveTab(message) {
  // finds active tab in current window and sends a message to its content script
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs || !tabs.length) {
    setStatus('No active tab found.');
    return;
  }
  const tabId = tabs[0].id;
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['contentScriptHelper.js'] // ensure helper is injected (see note)
    });
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        // content script not injected / page may be extension-ineligible
        setStatus('Could not reach page: ' + chrome.runtime.lastError.message);
      } else {
        setStatus(response?.result || 'Done');
      }
    });
  } catch (err) {
    setStatus('Error: ' + err.message);
  }
}

highlightBtn.addEventListener('click', async () => {
  if (remember.checked) {
    chrome.storage.local.set({ lastAction: 'highlight' });
  } else {
    chrome.storage.local.remove('lastAction');
  }
  await sendMessageToActiveTab({ action: 'highlight' });
});

resetBtn.addEventListener('click', async () => {
  if (remember.checked) {
    chrome.storage.local.set({ lastAction: 'reset' });
  } else {
    chrome.storage.local.remove('lastAction');
  }
  await sendMessageToActiveTab({ action: 'reset' });
});

// load remembered setting
chrome.storage.local.get(['lastAction']).then((res) => {
  if (res.lastAction) {
    remember.checked = true;
    setStatus('Last action: ' + res.lastAction);
  }
});
