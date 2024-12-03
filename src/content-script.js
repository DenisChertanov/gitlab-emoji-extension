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

function prepareEditorBlock(editorBlock) {
    // Create emoji button

    const emojiButton = document.createElement("button");
    emojiButton.type = "button";
    emojiButton.className = "btn gl-mr-3 btn-default btn-sm gl-button btn-default-tertiary btn-icon";

    const svgButtonImg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgButtonImg.setAttribute("data-testid", "smile-icon");
    svgButtonImg.classList.add("gl-button-icon");
    svgButtonImg.classList.add("gl-icon");
    svgButtonImg.classList.add("s16");
    svgButtonImg.setAttribute("data-testid", "smile-icon");
    svgButtonImg.setAttribute("role", "img");
    svgButtonImg.setAttribute("aria-hiden", "true");
    const svgButtomImgImg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgButtomImgImg.setAttribute("href", "https://gitlab.services.mts.ru/assets/icons-85d93222827a1ed673b1e26461ae6f00a6fa0cece63b29a2dff3cb8f74f65829.svg#slight-smile");
    svgButtonImg.appendChild(svgButtomImgImg);
    emojiButton.appendChild(svgButtonImg);

    const toolBarDiv = editorBlock.querySelector('[data-testid="md-header-toolbar"]');
    toolBarDiv.appendChild(emojiButton);

    // Hide emoji button on preview click
    const previewButton = editorBlock.querySelector('[data-testid="preview-toggle"]');
    previewButton.addEventListener("click", () => {
        if (previewButton.value === "preview") {
            emojiButton.classList.add("gl-display-none!");
        } else {
            emojiButton.classList.remove("gl-display-none!");
        }
    });

    // Logic for emoji button
    emojiButton.addEventListener("click", () => {
        insertEmojiTag({
            textArea: editorBlock.querySelector("textarea"),
            tag: ':shrug:',
            cursorOffset: 0
        });
    });
}

function test() {
    const emojis = ["shrug", "apple", "orange", "tomato", "smile", "funny", "cat", "dog", "potato"];

    const randomIndex = Math.floor(Math.random() * emojis.length);
    const usedEmoji = emojis[randomIndex];
    console.log("content-script use emoji:", usedEmoji);

    let message = {type: "EMOJI_USAGE", emoji: usedEmoji};
    chrome.runtime.sendMessage(message, (response) => {
        console.log("content-script receive response:", response);
    });
}

function insertEmojiTag({
    textArea,
    tag,
    cursorOffset,
}) {
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

function execInsertText(text) {
    if (text === '') return document.execCommand('delete');

    return document.execCommand('insertText', false, text);
}

const insertText = (target, text) => {
    const { selectionStart, selectionEnd, value } = target;
    const textBefore = value.substring(0, selectionStart);
    const textAfter = value.substring(selectionEnd, value.length);
    const insertedText = text instanceof Function ? text(textBefore, textAfter) : text;

    if (!execInsertText(insertedText)) {
        const newText = textBefore + insertedText + textAfter;

        // eslint-disable-next-line no-param-reassign
        target.value = newText;

        // eslint-disable-next-line no-param-reassign
        target.selectionStart = selectionStart + insertedText.length;

        // eslint-disable-next-line no-param-reassign
        target.selectionEnd = selectionStart + insertedText.length;
    }

    // Trigger autosave
    target.dispatchEvent(new Event('input'));

    // Trigger autosize
    const event = document.createEvent('Event');
    event.initEvent('autosize:update', true, false);
    target.dispatchEvent(event);
};


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