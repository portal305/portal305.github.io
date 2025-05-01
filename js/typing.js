const text = "Developer";
const typingSpan = document.getElementById("typing");
const codeIcon = document.querySelector("#typing + i.fas.fa-code");
let idx = 0;
let typingForward = true;

function updateTyping() {
    typingSpan.textContent = text.slice(0, idx);
    if (codeIcon) {
        if (typingSpan.textContent.length > 0) {
            if (codeIcon.previousSibling && codeIcon.previousSibling.nodeType !== 3) {
                codeIcon.parentNode.insertBefore(document.createTextNode(' '), codeIcon);
            }
        } else {
            if (codeIcon.previousSibling && codeIcon.previousSibling.nodeType === 3) {
                codeIcon.parentNode.removeChild(codeIcon.previousSibling);
            }
        }
    }
}

function type() {
    updateTyping();
    if (typingForward) {
        if (idx < text.length) {
            idx++;
            setTimeout(type, 120);
        } else {
            typingForward = false;
            setTimeout(type, 1000);
        }
    } else {
        if (idx > 0) {
            idx--;
            setTimeout(type, 80);
        } else {
            typingForward = true;
            setTimeout(type, 1000);
        }
    }
}
type();