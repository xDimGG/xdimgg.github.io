var info;

if ((window.opr && opr.addons) || window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
  info = {
    url: 'https://addons.opera.com/en/extensions/details/tampermonkey-beta/',
    name: 'Opera'
  }
} else if (typeof InstallTrigger !== 'undefined') {
  info = {
    url: 'https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/',
    name: 'Firefox'
  }
} else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) {
  info = {
    url: 'https://tampermonkey.net/?browser=safari',
    name: 'Safari'
  }
} else if (!(false || document.documentMode) && window.StyleMedia) {
  info = {
    url: 'https://www.microsoft.com/store/apps/9NBLGGH5162S',
    name: 'MS Edge'
  }
} else if (window.chrome && window.chrome.webstore) {
  info = {
    url: 'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
    name: 'Chrome'
  }
}

var ul = document.getElementsByTagName('ul')[0];

if (info) ul.innerHTML = '<a href="'+info.url+'" target="_blank"><li>Install Tampermonkey For '+info.name+'</li></a><a href="endcard.user.js"><li>Install Script</li></a>'
else ul.innerHTML = '<li>Your Browser Doesn\'t Support Tampermonkey</li>';