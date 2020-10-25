var allTabs = [];
var browser = chrome;

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('test');
    link.addEventListener('click', function() {
        getTabs(function(tabs){
            allTabs = tabs;
        });
    });
});

function getTabs(callback){
    browser.tabs.query({currentWindow: true}, function(tabs){
        callback(tabs);
    });
}

function createBookmark(bookmarkName, tabs){
    browser.storage.sync.set({
        "multi_bookmarks": 
        [{
            "bookmark_name": bookmarkName,
            "tabs": tabs
        }]
    }, function(){});
}

function getBookmarks(callback){
    browser.storage.get(["multi_bookmarks"], function(bookmarks){
        bookmarkData = JSON.parse(bookmarks)
        callback(bookmarkData)
    });
}

function addBookmarksToHTML(bookmarkData){
    for(i = 0; i< bookmarkData.length; i++){
        var bookmarkArea = document.getElementById("Bookmark-Area");
        var button = document.createElement("BUTTON");
        var buttonText = document.createTextNode(bookmarkData[i].bookmark_name);
        button.appendChild(buttonText);
        bookmarkArea.appendChild(button);
    }
}

