$(function() {
    // background.jsにメッセージを送信
    chrome.runtime.sendMessage({rssUrls: rssUrlGet()});
});


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

    return rssUrls;

}


// 相対パスを絶対パスに変換
function absolutePath(path) {
    var e = document.createElement('a');
    e.href = path;
    return e.href;
}
