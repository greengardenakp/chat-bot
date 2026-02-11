const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let userMsg = input.value.trim();
    if (userMsg === "") return;

    // Show user message
    chatBox.innerHTML += <div class="user-msg">👤 ${userMsg}</div>;
    input.value = "";

    // Send message to backend
    fetch("/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "msg=" + encodeURIComponent(userMsg)
    })
    .then(response => response.text())
    .then(botReply => {
        chatBox.innerHTML += <div class="bot-msg">🤖 ${botReply}</div>;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});
