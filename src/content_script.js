import React from "react";
import ReactDOM from "react-dom";
import MyEmojiPicker from "./MyEmojiPickerTranspiled.js";
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const lastUsageEmojisMaxSize = 45;

// chrome.storage.local.clear();

async function getLastUsagedEmojisCategory() {
    let emojis = Array.from((await getLastUsagedEmojis()))
            .map((v) => JSON.parse(v))
            .reverse();
    let lastUsagedEmojisCategory = {
        title: "Frequently used",
        emojis: emojis
    };

    // console.log("ROOT lastUsagedEmojisCategory:");
    // console.log(lastUsagedEmojisCategory);

    return lastUsagedEmojisCategory;
}

async function getLastUsagedEmojis() {
    let lastUsagedEmojis;

    let cache = await chrome.storage.local.get(["lastUsagedEmojisSave"]);
    if (cache.lastUsagedEmojisSave) {
        lastUsagedEmojis = new Set(JSON.parse(cache.lastUsagedEmojisSave));
    }

    if (lastUsagedEmojis === undefined) {
        lastUsagedEmojis = new Set();
    }
    if (lastUsagedEmojis instanceof Set) {
        // do nothing
    } else {
        lastUsagedEmojis = new Set();
    }

    return lastUsagedEmojis;
}

async function processEmojiUsage(emoji, code) {
    let emojiItem = JSON.stringify({ emoji: emoji, code: code });

    let lastUsagedEmojis = await getLastUsagedEmojis();

    if (lastUsagedEmojis.has(emojiItem)) {
        lastUsagedEmojis.delete(emojiItem);
    }
    lastUsagedEmojis.add(emojiItem);

    if (lastUsagedEmojis.size > lastUsageEmojisMaxSize) {
        const [firstElement] = lastUsagedEmojis;
        lastUsagedEmojis.delete(firstElement);
    }

    // console.log("Used emojis after pick:");
    // console.log(lastUsagedEmojis);

    await chrome.storage.local.set({ 'lastUsagedEmojisSave': JSON.stringify(Array.from(lastUsagedEmojis)) });
}

// Logic for existing edit blocks
const editorBlockList = document.getElementsByClassName("js-vue-markdown-field");
[...editorBlockList].forEach((editorBlock) => {
    prepareEditorBlock(editorBlock);
});

// Logic for new dynamic edit blocks (NEW)
let observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        for (let addedNote of mutation.addedNodes) {
            if (addedNote instanceof Element) {
                let editBlocks = addedNote.getElementsByClassName("js-vue-markdown-field");
                if (editBlocks.length > 0) {
                    [...editBlocks].forEach((editorBlock) => {
                        prepareEditorBlock(editorBlock);
                    });
                }
            }
        }
    }
});
observer.observe(document, { childList: true, subtree: true });

// Fetch style
var link = document.createElement("link");
link.href = chrome.runtime.getURL("MyEmojiPickerTranspiled.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

async function prepareEditorBlock(editorBlock) {
    // Create emoji button
    const emojiButton = document.createElement("button");
    emojiButton.type = "button";
    emojiButton.className = "btn gl-mr-2 gl-ml-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon";
    emojiButton.setAttribute("data-md-command", "");
    emojiButton.setAttribute("data-md-block", "");
    emojiButton.setAttribute("data-track-action", "execute_toolbar_control");
    emojiButton.setAttribute("data-track-label", "markdown_editor");

    const emojiDiv = document.createElement("div");
    emojiDiv.appendChild(emojiButton);

    const svgButtonImg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgButtonImg.classList.add("gl-button-icon");
    svgButtonImg.classList.add("gl-icon");
    svgButtonImg.classList.add("s16");
    const svgButtomImgImg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgButtomImgImg.setAttribute("href", "https://gitlab.com/assets/icons-8791a66659d025e0a4c801978c79a1fbd82db1d27d85f044a35728ea7cf0ae80.svg#slight-smile");
    svgButtonImg.appendChild(svgButtomImgImg);
    emojiButton.appendChild(svgButtonImg);

    const toolBarDiv = editorBlock.querySelector('[data-testid="md-header-toolbar"]');
    const mainButtons = toolBarDiv.childNodes[0];

    mainButtons.appendChild(emojiDiv);

    // Hide emoji button on preview click
    const previewButton = editorBlock.querySelector('[data-testid="preview-toggle"]');
    previewButton.addEventListener("click", () => {
        if (previewButton.value === "preview") {
            emojiDiv.style.display = 'none';
        } else {
            emojiDiv.style.display = 'block';
        }
    });

    async function pickEmoji(emoji, code) {
        insertEmojiTag({
            textArea: editorBlock.querySelector('[data-testid="comment-field"]'),
            tag: code,
            cursorOffset: 0
        });

        await processEmojiUsage(emoji, code);

        picker.style.display = 'none';
    }

    // Emoji picker
    const picker = document.createElement("div");
    ReactDOM.render(
        React.createElement(
            MyEmojiPicker, 
            { 
                pickEmoji: pickEmoji, 
                getLastUsagedEmojis: getLastUsagedEmojisCategory, 
                initActiveGroup: await getLastUsagedEmojisCategory(), 
                initActiveGroupIndex: -1 
            }
        ), 
        picker
    );
    picker.style.display = 'none';
    emojiDiv.appendChild(picker);

    // Logic for emoji button
    emojiButton.addEventListener("click", () => {

        if (picker.style.display === 'none') {
            picker.style.display = 'block';
        } else {
            picker.style.display = 'none';
        }
    });

    // Hide emoji picker
    document.addEventListener('click', function (event) {
        if (!emojiDiv.contains(event.target)) {
            picker.style.display = 'none';
        }
    });
}

async function insertEmojiTag({
    textArea,
    tag,
    cursorOffset,
}) {
    // console.log("insertEmojiTag:");
    // console.log(textArea);

    if (!tag.startsWith(':') || !tag.endsWith(':')) {
        console.log('Not emoji tag');
        return;
    }

    insertText(textArea, tag + " ");

    return moveCursor({
        textArea,
        tag: tag,
        cursorOffset,
        positionBetweenTags: 0,
    });
}

const insertText = (target, text) => {
    const { selectionStart, selectionEnd, value } = target;
    const textBefore = value.substring(0, selectionStart);
    const textAfter = value.substring(selectionEnd, value.length);
    const insertedText = text instanceof Function ? text(textBefore, textAfter) : text;

    console.log("insertText:");
    console.log(value);
    console.log(target);

    // if (!execInsertText(insertedText)) {
        const newText = textBefore + insertedText + textAfter;

        // eslint-disable-next-line no-param-reassign
        target.value = newText;

        // eslint-disable-next-line no-param-reassign
        target.selectionStart = selectionStart + insertedText.length;

        // eslint-disable-next-line no-param-reassign
        target.selectionEnd = selectionStart + insertedText.length;

        console.log("insertText inner:");
        console.log(newText);
        console.log(target);
    // }

    // Trigger autosave
    target.dispatchEvent(new Event('input'));

    // Trigger autosize
    const event = document.createEvent('Event');
    event.initEvent('autosize:update', true, false);
    target.dispatchEvent(event);
};

function execInsertText(text) {
    if (text !== '') {
        console.log("exec inertText");
        console.log(text);
        return document.execCommand('insertText', false, text);
    }

    // Nothing to do :)
    return true;
}

function moveCursor({
    textArea,
    tag,
    cursorOffset,
    positionBetweenTags,
}) {
    let pos;

    if (textArea && !textArea.setSelectionRange) {
        return;
    }

    if (textArea.selectionStart === textArea.selectionEnd) {
        if (positionBetweenTags) {
            pos = textArea.selectionStart - tag.length;
        } else {
            pos = textArea.selectionStart;
        }

        if (cursorOffset) {
            pos -= cursorOffset;
        }

        return textArea.setSelectionRange(pos, pos);
    }
}