document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({ action: 'getHistory' }, function (response) {
    const historyList = document.getElementById('historyList');
    response.history.forEach(function (text, index) {
      const listItem = createListItem(text, index + 1);
      historyList.prepend(listItem);
    });
  });

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function () {
    clearHistory();
  });
});

function createListItem(text, index) {
  const listItem = document.createElement('li');
  const copyButton = document.createElement('button');

  // Set emoji as innerHTML for the copy button
  copyButton.innerHTML = '📋';
  copyButton.addEventListener('click', function () {
    copyToClipboard(text);
  });

  listItem.appendChild(copyButton);
  listItem.appendChild(document.createTextNode(` ${text}`)); // Add the text content

  return listItem;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    alert(`Copied to clipboard: ${text}`);
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  } finally {
    document.body.removeChild(textarea);
  }
}

function clearHistory() {
  chrome.runtime.sendMessage({ action: 'clearHistory' }, function () {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';// Clear the list in the DOM
  });
}
