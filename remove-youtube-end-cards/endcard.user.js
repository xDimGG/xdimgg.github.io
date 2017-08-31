// ==UserScript==
// @author       Dim
// @description  Removes the end cards of YouTube videos
// @name         Remove YouTube End Cards
// @namespace    https://dim.codes
// @version      1.2.1
// @icon         https://www.youtube.com/yts/img/favicon_96-vfldSA3ca.png
// @match        https://www.youtube.com/*
// @updateURL    https://dim.codes/remove-youtube-end-cards/endcard.user.js
// @run-at       document-start
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

function disableSPF() {
  if (unsafeWindow._spf_state && unsafeWindow._spf_state.config) {
    unsafeWindow._spf_state.config['navigate-limit'] = 0;
    unsafeWindow._spf_state.config['navigate-part-received-callback'] = function (targetUrl) { location.href = targetUrl; };
  }
  setTimeout(disableSPF, 50);
}

function installUnsafewindowPolyfill() {
  if (typeof unsafeWindow === 'undefined') {
    if (typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function') unsafeWindow = XPCNativeWrapper.unwrap(window);
    else if (window.wrappedJSObject) unsafeWindow = window.wrappedJSObject;
  }
}

function removeCard() {
  setTimeout(function() {
    if (document.getElementsByTagName('ytd-subscribe-button-renderer').length || document.querySelector('ytd-button-renderer.ytd-video-secondary-info-renderer') || document.getElementById('watch7-subscription-container')) {
      var endCardRemover = document.createElement('span');
      endCardRemover.appendChild(document.createTextNode('Remove End Cards'));
      endCardRemover.id = 'remove_card';
      var sub = document.getElementsByTagName('ytd-subscribe-button-renderer')[0] ? document.getElementsByTagName('ytd-subscribe-button-renderer')[0] : document.querySelector('ytd-button-renderer.ytd-video-secondary-info-renderer');
      if (sub) {
        GM_addStyle('#remove_card{user-select:none;margin:auto 4px;font-weight:500;text-transform:uppercase;letter-spacing:.007px;;background-color:hsl(0, 0%, 93.3%);color:hsla(0, 0%, 6.7%, .6);cursor:pointer;padding:10px 16px;border-radius:2px;vertical-align:middle;font-size:1.4rem}');
        sub.insertBefore(endCardRemover, sub.firstChild);
      } else {
        GM_addStyle('#remove_card{user-select:none;border:1px solid #CCC;background-color:#FAFAFA;color:#737373;cursor:pointer;padding:4px 8px;border-radius:2px;margin-left:10px;vertical-align:middle;font-size:12px}');
        document.getElementById('watch7-subscription-container').appendChild(endCardRemover);
      }
      endCardRemover.onclick = function() {
        var cards = document.getElementsByClassName('ytp-ce-element');
        while(cards[0]) {
          cards[0].parentNode.removeChild(cards[0]);
        }
        endCardRemover.innerText = 'End Cards Removed';
      };
    } else {
      removeCard();
    }
  }, 100);
}

disableSPF();
installUnsafewindowPolyfill();
if (location.pathname === '/watch') document.addEventListener('DOMContentLoaded', removeCard);
