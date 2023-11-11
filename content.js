document.addEventListener('copy', function (e) {
  const text = window.getSelection().toString();
  if (text) {
    chrome.runtime.sendMessage({ action: 'addHistory', text: text });
  }
});
