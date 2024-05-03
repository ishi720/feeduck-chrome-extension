'use strict';

/**
 * DOMのロード完了時に実行される関数。
 * 現在のページに含まれるRSSおよびAtomフィードのURLを取得し、background.jsにメッセージを送信する。
 */
$(function() {
    // background.jsにメッセージを送信
    chrome.runtime.sendMessage({rssUrls: rssUrlGet()});
});

/**
 * ページ内のRSSおよびAtomフィードのURLを取得する
 * @returns {string[]} - 取得したRSS・AtomフィードのURLの配列
 */
function rssUrlGet() {
    var rssUrls = [];
    $("link[type='application/rss+xml']").each(function(k,e){
        var href = $(e).attr('href');
        rssUrls.push( absolutePath(href) );
    });
    $("link[type='application/atom+xml']").each(function(k,e){
        var href = $(e).attr('href');
        rssUrls.push( absolutePath(href) );
    });
    //重複の削除
    rssUrls = rssUrls.filter( function(element, index) {
        return rssUrls.indexOf(element) === index;
    });
    return rssUrls;
}

/**
 * 指定された相対パスを絶対パスに変換する
 * @param {string} path 相対パス
 * @returns {string} 変換された絶対パス
 */
function absolutePath(path) {
    var e = document.createElement('a');
    e.href = path;
    return e.href;
}
