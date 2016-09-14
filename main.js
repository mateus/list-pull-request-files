var clipboard = new Clipboard('.btn');
var button = document.querySelector('.btn');

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var re = /https:\/\/github.com\/[A-Za-z0-9\-\._]+\/[A-Za-z0-9\-\._]+\/pull\/[A-Za-z0-9\-\._]+\/files/g;
    if(url.match(re)) {
      document.getElementById("container-success").classList.add("show");
    } else {
      document.getElementById("container-error").classList.add("show");
    }
});

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    if (button.textContent.indexOf('(Copied)') === -1) {
      button.textContent = button.textContent + ' (Copied)';
    }

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
