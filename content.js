// UserAgentの取得
let ua = window.navigator.userAgent.toLowerCase();
// 実行するコマンド情報を格納する変数の初期化
let executeCommand = '';

// osによって実行するコマンド内容を変える
if (ua.indexOf("mac os x") !== -1){
    // mac 開発者ツールショートカットコマンド設定（Command + option + i）
    executeCommand = new KeyboardEvent('keydown', {
        keyCode : 73,    // iキー
        altKey  : true,  // optキー
        shiftKey: false, // shiftキー
        metaKey : true,  // Commandキー
        key     : "i",   // iキー
    });
} else if (ua.indexOf("windows nt") !== -1) {
    // windows 開発者ツールショートカットコマンド設定（F12）
    executeCommand = new KeyboardEvent('keydown', {
        keyCode : 123,   // F12キー
        altKey  : false, // altキー
        shiftKey: false, // shiftキー
        key     : "F12", // F12キー
    });
}

// Chrome拡張機能のアイコン押下で発火するイベント
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "Action" && executeCommand != '') {
        // executeCommandを実行
        document.dispatchEvent(executeCommand);
    }
});

// // Chrome拡張機能のアイコン押下で発火するイベント
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     // 今開いているウィンドウの全てのタブ（tabが各々のタブ）
//     chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},(tabs) => {
//         if (request == "Action" && executeCommand != '') {
//             // executeCommandを実行
//             document.dispatchEvent(executeCommand);
//         }
//     });
// });
