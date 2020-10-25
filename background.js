var browser = chrome;
var allTabs = [];

function getTabs(callback){
    browser.tabs.query({currentWindow: true}, function(tabs){
        callback(tabs);
    });
}

function saveBookmarks(name, tabs){
    browser.storage.sync.set({"test": "123"}, function(){
        console.log("Value is set");
    });
}

function getBookmarks(){
    bookmarks = localStorage.getItem("test");
    return bookmarks
    //browser.storage.sync.get(["multi_bookmarks"], function(bookmarks){
    //    callback(bookmarks)
    //});
}

function addBookmarksToHTML(bookmarks){
    for(i = 0; i< bookmarks.length; i++){
        //var bookmarkArea = document.getElementById("Bookmark-Area");
        var button = document.createElement("BUTTON");
        var buttonText = document.createTextNode(bookmarks[i].bookmark_name);
        button.appendChild(buttonText);
        //bookmarkArea.appendChild(button);
    }
}

function createBookmark(){
    getTabs(function(tabs){allTabs = tabs});
    save("test", allTabs);
}