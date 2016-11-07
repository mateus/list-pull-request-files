function shitty_pluralize(str, size){
  if(size > 1) return str + 's';
  return str;
}

function scrapePage(document) {
  text = '';
  statusArr = document.querySelectorAll('.diffbar-item.toc-select .select-menu-item .octicon');
  resultObj = {};

  document.querySelectorAll('#files .file-info a').forEach(function(i, index){
     var status = statusArr[index].classList[1].split('-')[2]

     if(!(status in resultObj))
        resultObj[status] = []

     resultObj[status].push(i.textContent.trim())
  });

  Object.keys(resultObj).forEach(function(key, index){
    text += '**' + key.charAt(0).toUpperCase() + key.slice(1) + ' - ' + resultObj[key].length + ' ' + shitty_pluralize('file', resultObj[key].length) + '**';
    text += '<br/>';
    for(var k = 0; k < resultObj[key].length; k++)
      text += '- ' + resultObj[key][k] + '<br>';
    if(Object.keys(resultObj).length - 1 != index){
      text += '<br/>';
    }
  });

  return text;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: scrapePage(document)
});
