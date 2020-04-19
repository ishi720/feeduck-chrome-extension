'use strict';

// messageが送された時のイベント
chrome.runtime.onMessage.addListener(

    function(message, sender, callback) {

        // タブの情報を取得してバッチの表示処理を行う
        chrome.tabs.getSelected(null, function(tabs) {

            //タブのバッチを初期化する
            chrome.browserAction.setBadgeText({
                text: '',
                tabId: tabs.id
            });

            // バッチの表示
            if ( message.rssUrls.length == 0 || message.rssUrls.length == null ) {
                chrome.browserAction.setBadgeText({
                    text: '',
                    tabId: tabs.id
                });
            } else {
                chrome.browserAction.setBadgeText({
                    text: message.rssUrls.length + '',
                    tabId: tabs.id
                });
            }

            localStorage[tabs.id] = JSON.stringify(message.rssUrls);
        });
    }
);

// タブ切り替え時のイベント
chrome.tabs.onActivated.addListener(function (activeInfo) {

    //保持しているカウントを取り出して表示する
    if ( localStorage[activeInfo.tabId] ) {
        if ( JSON.parse(localStorage[activeInfo.tabId]).length !== 0 ) {
            chrome.browserAction.setBadgeText({
                text: JSON.parse(localStorage[activeInfo.tabId]).length + '',
                tabId: activeInfo.tabId
            });
        } else {
            chrome.browserAction.setBadgeText({
                text: '',
                tabId: activeInfo.tabId
            });
        }
    } else {
        chrome.browserAction.setBadgeText({
            text: '',
            tabId: activeInfo.tabId
        });
    }
});