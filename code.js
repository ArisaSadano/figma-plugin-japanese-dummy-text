// This plugin will open a modal to prompt the user to enter a number, and
// it will then generate that many texts on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    const nodes = [];
    const selection = figma.currentPage.selection[0];
    // 選択レイヤーがテキストかどうかを判定
    if (selection && selection.type === "TEXT") {
        figma.loadFontAsync({
            family: selection.fontName.family,
            style: selection.fontName.style
        }).then(() => {
            let text = selection.characters;
            if (msg.type === 'manual') {
                for (let i = 0; i < msg.count; i++) {
                    if (msg.word) {
                        text = `${text}${i + 1}word `;
                        // console.log(selection);
                    }
                    else if (msg.sentence) {
                        text = `${text}${i + 1}sentence `;
                    }
                    else if (msg.paragraph) {
                        text = `${text}${i + 1}paragraph `;
                    }
                }
            }
            else if (msg.type === 'auto') {
                text = 'Auto generate';
            }
            selection.characters = text;
        });
    }
    else {
        console.log('error!');
    }
    // 文字を入れるたびに、box内か外かを判定、はみでたらストップする？大きさを図る？
};
