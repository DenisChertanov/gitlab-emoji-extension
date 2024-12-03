// Upload emojis
let emojis;
fetch(chrome.runtime.getURL("emojis.json"))
    .then(response => response.json())
    .then(data => {
        emojis = data;
    });

// Process emoji usages
const lastUsageEmojisMaxSize = 4;
let lastUsagedEmojis = new Set();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, value, emoji } = message;

    if (type === "EMOJI_USAGE") {
        processEmojiUsage(emoji);
        sendResponse(Array.from(lastUsagedEmojis));
    }

    if (type === "LAST_USAGED_EMOJIS") {
        sendResponse(Array.from(lastUsagedEmojis));
    }

    if (type === "RANDOM_EMOJI") {
        const randomSectionIndex = Math.floor(Math.random() * emojis.length);
        const randomEmojiIndex = Math.floor(Math.random() * emojis[randomSectionIndex].emojis.length);
        const usedEmoji = emojis[randomSectionIndex].emojis[randomEmojiIndex];
        sendResponse(usedEmoji);
    }
});

function processEmojiUsage(emoji) {
    if (lastUsagedEmojis.has(emoji)) {
        lastUsagedEmojis.delete(emoji);
    }
    lastUsagedEmojis.add(emoji);

    if (lastUsagedEmojis.size > lastUsageEmojisMaxSize) {
        const [firstElement] = lastUsagedEmojis;
        lastUsagedEmojis.delete(firstElement);
    }

    console.log("service_worker lastUsagedEmojis:", lastUsagedEmojis);
}

