const texts = ["Developer", "Programmer", "Coder"];
const typingSpan = document.getElementById("typing");
let textIndex = 0;
let charIndex = 0;
let typingForward = true;

function updateTyping() {
    const currentText = texts[textIndex];
    typingSpan.textContent = currentText.substring(0, charIndex);
    
    // Get the code icon element that follows the typing span
    const codeIcon = document.querySelector("#typing + i.fas.fa-code");
    
    if (codeIcon) {
        // If there's text in the typing span, add a space before the icon
        if (typingSpan.textContent.length > 0) {
            // Check if there's already a text node (space) before the icon
            let hasSpace = false;
            if (codeIcon.previousSibling && codeIcon.previousSibling.nodeType === 3) {
                hasSpace = codeIcon.previousSibling.nodeValue.includes(' ');
            }
            
            if (!hasSpace) {
                // Insert a space before the icon
                codeIcon.parentNode.insertBefore(document.createTextNode(' '), codeIcon);
            }
        } else {
            // If typing span is empty, remove any space before the icon
            if (codeIcon.previousSibling && codeIcon.previousSibling.nodeType === 3) {
                codeIcon.parentNode.removeChild(codeIcon.previousSibling);
            }
        }
    }
}

function type() {
    updateTyping();
    if (typingForward) {
        if (charIndex < texts[textIndex].length) {
            charIndex++;
            setTimeout(type, 120);
        } else {
            typingForward = false;
            setTimeout(type, 1000);
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
            setTimeout(type, 80);
        } else {
            typingForward = true;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 1000);
        }
    }
}

// Make sure DOM is fully loaded before starting the typing animation
document.addEventListener('DOMContentLoaded', function() {
    if (typingSpan) {
        type();
    }
});