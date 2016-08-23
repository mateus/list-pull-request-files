var clipboard = new Clipboard('.btn');
var button = document.querySelector('.btn');

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var re = /https:\/\/github.com\/\w+\/\w+\/pull\/\w+\/files/g;
    if(url.match(re)) {
      document.getElementById("container-success").classList += "show";
    } else {
      document.getElementById("container-error").classList += "show";
    }
});

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    button.textContent = button.textContent + ' (Copied)';

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
