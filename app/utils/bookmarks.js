export const getBookmarks = async function(id) {
    return await new Promise(resolve => {
        chrome.bookmarks.getChildren(id, (children) => {
            resolve(children);
        });
    }, reject => {
        reject([]);
    });
}
export const removeBookmark = async function(id) {
  return await new Promise(resolve => {
      chrome.bookmarks.remove(id, (children) => {
          resolve(children);
      });
  }, reject => {
      reject([]);
  });
}
