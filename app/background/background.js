'use strict';

// messageが送された時のイベント
chrome.runtime.onMessage.addListener(

    function(message, sender, callback) {

        // タブの情報を取得してバッチの表示処理を行う
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {

            if (tabs[0]) {
                var tabId = tabs[0]['id'];
            } else {
                return;
            }

            //タブのバッチを初期化する
            chrome.action.setBadgeText({
                text: '',
                tabId: tabId
            });

            // バッチのデザインの設定
            chrome.action.setBadgeBackgroundColor({ color: '#2565d7' });
            chrome.action.setBadgeTextColor({ color: 'white' });

            // バッチの表示
            if ( message.rssUrls.length == 0 || message.rssUrls.length == null ) {
                chrome.action.setBadgeText({
                    text: '',
                    tabId: tabId
                });
            } else {
                chrome.action.setBadgeText({
                    text: message.rssUrls.length + '',
                    tabId: tabId
                });
            }

            chrome.storage.local.set({[tabId]: message.rssUrls});
        });
    }
);

// タブ切り替え時のイベント
chrome.tabs.onActivated.addListener(function (activeInfo) {

    //保持しているカウントを取り出して表示する
    chrome.storage.local.get(String(activeInfo.tabId),function(urls){
        if ( urls[activeInfo.tabId] ) {
            if ( urls[activeInfo.tabId].length !== 0 ) {
                chrome.action.setBadgeText({
                    text: urls[activeInfo.tabId].length + '',
                    tabId: activeInfo.tabId
                });
            } else {
                chrome.action.setBadgeText({
                    text: '',
                    tabId: activeInfo.tabId
                });
            }
        } else {
            chrome.action.setBadgeText({
                text: '',
                tabId: activeInfo.tabId
            });
        }
    });
});

// タブを閉じたときのイベント
chrome.tabs.onRemoved.addListener(function(tabId, info) {
    chrome.storage.local.remove(String(tabId));
});