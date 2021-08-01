//タブの情報を取得
chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {

    //現在のタブIDを取得
    var tabId = tabs[0]['id'];

    //現在のタブIDの情報のみ表示
    if ( localStorage[tabId] ) {
        if ( JSON.parse(localStorage[tabId]).length !== 0 ) {

            //RSSが見つかりませんでしたの表示を削除する
            $('#rss_url_list').empty();

            //URLを表示する
            $.each( JSON.parse(localStorage[tabId]), function(i, url) {
                $('#rss_url_list').append('<div class="row rss_url_list"><input class="col form-control" type="text" value="'+ url +'" readonly><button data-link="'+ url +'" class="col-2 btn btn-primary LinkOpenBtn">開く</button></div>');
            });
        }
    }
});

// ボタンがクリックされたときのイベント
//document.querySelector('.clearCacheBtn').addEventListener('click', clearCacheBtn);

// 読み込み完了後の処理
window.addEventListener('load', load, false);
function load(e) {
    var timer = setInterval(jsLoaded, 1000);
    function jsLoaded() {
        if (document.querySelector('.rss_url_list') != null) {
            // setInterval()解除
            clearInterval(timer);

            // フォーカスが当たったときに全選択にする
            $('.rss_url_list input').focus(function(){
                $(this).select();
            });

            // 開くボタンクリック時のイベント
            document.querySelectorAll('.LinkOpenBtn').forEach(function (button) {
                button.addEventListener('click', LinkOpen);
            });
        }
    }
}


function LinkOpen() {
    window.open(this.getAttribute('data-link'));
}



// キャッシュのクリア
// function clearCacheBtn(){
//     localStorage.clear();
// }
