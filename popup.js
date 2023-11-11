document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({ action: 'getHistory' }, function (response) {
    const historyList = document.getElementById('historyList');
    response.history.forEach(function (text) {
      const listItem = document.createElement('li');
      listItem.textContent = text;
      historyList.appendChild(listItem);
    });
  });
});
