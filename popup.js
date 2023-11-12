document.addEventListener('DOMContentLoaded', function () {
  const historyList = document.getElementById('historyList');
  const clearButton = document.getElementById('clearButton');

  chrome.runtime.sendMessage({ action: 'getHistory' }, function (response) {
    response.history.forEach(function (text, index) {
      const listItem = createListItem(text, index + 1);
      historyList.prepend(listItem);
    });
  });

  clearButton.addEventListener('click', clearHistory);
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

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert(`Copied to clipboard: ${text}`);
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
}

function clearHistory() {
  chrome.runtime.sendMessage({ action: 'clearHistory' }, function () {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear the list in the DOM
  });
}
