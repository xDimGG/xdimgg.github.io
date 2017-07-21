// ==UserScript==
// @name         Remove YouTube End Cards
// @version      1
// @description  Removes the end cards of YouTube videos
// @author       Dim
// @match        *://www.youtube.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @updateURL    https://dim.dimid.co/remove-youtube-end-cards/endcard.user.js
// @run-at       document-start
// @grant        GM_addStyle
// @updateURL    https://dim.codes/remove-youtube-end-cards/endcard.user.js
// ==/UserScript==

GM_addStyle('.remove_card{border:1px solid #CCC;background-color:#FAFAFA;color:#737373;cursor:pointer;font-family:"YouTube Noto",Roboto,arial,sans-serif;padding:4px 8px;border-radius:2px;margin-left:10px;vertical-align:middle;font-size:12px;}');

function disableSPF() {
	if (unsafeWindow._spf_state && unsafeWindow._spf_state.config) {
		unsafeWindow._spf_state.config['navigate-limit'] = 0;
		unsafeWindow._spf_state.config['navigate-part-received-callback'] = function (targetUrl) { location.href = targetUrl; };
	}
	setTimeout(disableSPF, 50);
}

function RemoveCard() {
    $("#watch7-subscription-container").append($('<span class=remove_card>Remove End Cards</span>'));
    $(".remove_card").click(function() {
        $(".ytp-ce-element").remove();
        $(".remove_card").text("End Cards Removed :\)");
    });
}

$(function() {
	RemoveCard();
    disableSPF();
});
