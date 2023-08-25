const socket = io();
const cardHolder = document.querySelector(".card");
const user = cardHolder.getAttribute("id");
const chatBox = document.getElementById("chatBox");

socket.emit("newUser", user);

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user, message: chatBox.value });

      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  const log = document.getElementById("messageLogs");

  let messages = [];

  data.forEach((message) => {
    messages.push({ user: message.user, message: message.message });
  });

  log.innerHTML = messages
    .map((message) => `${message.user}: ${message.message}</br>`)
    .join("");
});
