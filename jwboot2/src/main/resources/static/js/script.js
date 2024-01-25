function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message !== "") {
        const chatMessages = document.getElementById("chat-messages");
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);

        // Clear the input field
        messageInput.value = "";
    }
}