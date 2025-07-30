// Process emoji usages
const lastUsageEmojisMaxSize = 45;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, value, emoji } = message;

    if (type === "EMOJI_USAGE") {
        processEmojiUsage(emoji);
        // sendResponse(Array.from(lastUsagedEmojis));
    }

    if (type === "LAST_USAGED_EMOJIS") {
        // sendResponse(Array.from(lastUsagedEmojis));
        sendResponse(getLastUsagedEmojis());
    }

    if (type === "RANDOM_EMOJI") {
        const randomSectionIndex = Math.floor(Math.random() * emojis.length);
        const randomEmojiIndex = Math.floor(Math.random() * emojis[randomSectionIndex].emojis.length);
        const usedEmoji = emojis[randomSectionIndex].emojis[randomEmojiIndex];
        sendResponse(usedEmoji);
    }
});

async function getLastUsagedEmojis() {
    let lastUsagedEmojis = await chrome.storage.local.get(["lastUsagedEmojisSave"], function(items) {
        console.log("ppp");
        console.log(items.lastUsagedEmojisSave);
        // console.log(items[0].lastUsagedEmojisSave);
    });
    // lastUsagedEmojis = window.localStorage.getItem('lastUsagedEmojisSave');

    if (lastUsagedEmojis === undefined) {
        lastUsagedEmojis = new Set();
    }
    if (lastUsagedEmojis instanceof Set) {
        // do nothing
    } else {
        lastUsagedEmojis = new Set();
    }

    console.log("ddd");
    console.log(lastUsagedEmojis);
    return lastUsagedEmojis;
}

async function processEmojiUsage(emoji) {
    let lastUsagedEmojis = await getLastUsagedEmojis();

    if (lastUsagedEmojis.has(emoji)) {
        lastUsagedEmojis.delete(emoji);
    }
    lastUsagedEmojis.add(emoji);

    if (lastUsagedEmojis.size > lastUsageEmojisMaxSize) {
        const [firstElement] = lastUsagedEmojis;
        lastUsagedEmojis.delete(firstElement);
    }

    await chrome.storage.local.set({ 'lastUsagedEmojisSave': lastUsagedEmojis }, function() {
        // do nothing
        console.log("...saved");
    });
    // window.localStorage.setItem('lastUsagedEmojisSave', lastUsagedEmojis);

    console.log("service_worker lastUsagedEmojis:", lastUsagedEmojis);
}