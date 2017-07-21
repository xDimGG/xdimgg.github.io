// ==UserScript==
// @author       Dim
// @description  Removes the end cards of YouTube videos
// @name         Remove YouTube End Cards
// @namespace    https://dim.codes
// @version      1.1
// @icon         https://www.youtube.com/yts/img/favicon_96-vfldSA3ca.png
// @match        https://www.youtube.com/watch*
// @updateURL    https://dim.codes/remove-youtube-end-cards/endcard.user.js
// @run-at       document-start
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

GM_addStyle('#remove_card{border:1px solid #CCC;background-color:#FAFAFA;color:#737373;cursor:pointer;padding:4px 8px;border-radius:2px;margin-left:10px;vertical-align:middle;font-size:12px}');

Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for(var i = this.length - 1; i >= 0; i--) {
		if(this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
};

function disableSPF() {
	if (unsafeWindow._spf_state && unsafeWindow._spf_state.config) {
		unsafeWindow._spf_state.config['navigate-limit'] = 0;
		unsafeWindow._spf_state.config['navigate-part-received-callback'] = function (targetUrl) { location.href = targetUrl; };
	}
	setTimeout(disableSPF, 50);
}

function removeCard() {
  document.getElementById('watch7-subscription-container').innerHTML += '<span id=remove_card>Remove End Cards</span>';
  document.getElementById('remove_card').onclick = function() {
    document.getElementsByClassName('ytp-ce-element').remove();
    document.getElementById('remove_card').innerHTML = 'End Cards Removed';
  };
}

disableSPF();

document.addEventListener('DOMContentLoaded', removeCard);
