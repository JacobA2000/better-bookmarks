var allTabs = [];
var browser = chrome;

document.addEventListener('DOMContentLoaded', function() {
    var createBookmarkButton = document.getElementById('test');
    createBookmarkButton.addEventListener('click', function() {
        getTabs(function(tabs){
            allTabs = tabs;
        })
        saveBookmarks("test", allTabs);
    });

    getBookmarks(function(bookmarks){
        addBookmarksToHTML(bookmarks);
    }) 

});

function getTabs(callback){
    browser.tabs.query({currentWindow: true}, function(tabs){
        callback(tabs);
    });
}

function saveBookmarks(name, tabs){
    browser.storage.sync.set({"bookmarks": [
        {
            "bookmarkName": name,
            "tabs": tabs
        }
    ]}, function(){});
}

function getBookmarks(callback){
    browser.storage.sync.get(['bookmarks'], function(bookmarks){
        callback(bookmarks["bookmarks"])
    });
}

function addBookmarksToHTML(bookmarks){
    for(i = 0; i < bookmarks.length; i++){
        console.log(i);
        var bookmarkArea = document.getElementById("Bookmark-Area");
        var button = document.createElement("BUTTON");
        var buttonText = document.createTextNode(bookmarks[i].bookmarkName);
        button.appendChild(buttonText);
        bookmarkArea.appendChild(button);
    }
}

