var allTabs = [];
var userBookmarks = [];
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
        userBookmarks = bookmarks;
        console.log(userBookmarks)
    });
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
        var bookmarkArea = document.getElementById("Bookmark-Area");

        var bookmarkButton = document.createElement("BUTTON");
        var bookmarkButtonText = document.createTextNode(bookmarks[i].bookmarkName);
        bookmarkButton.id = bookmarks[i].bookmarkName;
        bookmarkButton.appendChild(bookmarkButtonText);

        bookmarkButton.addEventListener('click', function() {bookmarkClick(bookmarks, bookmarkButton.id)})

        bookmarkArea.appendChild(bookmarkButton);
    }
}


function bookmarkClick(bookmarks, id){
    var tabs = [];

    for(i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].bookmarkName == id){
            tabs = bookmarks[i].tabs
            
            for(i =0; i < tabs.length; i++){
                chrome.tabs.create({url: tabs[i].url});
            }

            break;
        }
    }    
}

