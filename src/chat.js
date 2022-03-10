class Chat {
  threads = [];
  containerID = [];
  currentUserID = null;
  selectedThread = null;
  sendMessage = () => {};

  constructor({
    containerID = "container",
    threads = [],
    currentUserID = 1,
    sendMessage = () => {},
  }) {
    this.containerID = containerID;
    this.threads = threads;
    this.currentUserID = currentUserID;
    this.sendMessage = sendMessage;
    this.render();
  }

  render() {
    this.createUserInterface();
    this.threads.forEach((thread, i) => {
      this.renderThread({
        id: thread.id,
        name: thread.name,
        messages: thread.messages,
        index: i,
      });
    });
  }

  createUserInterface() {
    const containingElement = document.getElementById(this.containerID);
    containingElement.innerHTML = `
    <div class="chat-container">
      <div class="chat-threads">
      </div>
      <div class="chat-conversation">
        <div class="chat-conversation-header">
          <div class="chat-conversation-title">
          </div>
        </div>
        <div class="chat-conversation-messages">
        </div>
        <div class="chat-conversation-input">
          <input type="text" id="message" />
          <button id="send-message">Send</button>
        </div>
      </div>
    </div>
    `;
  }

  renderThread({ id, name, messages, index }) {
    const containingElement = document.querySelector(".chat-threads");
    const newThread = document.createElement("div");
    newThread.innerHTML += `
    <div id="${id}" class="chat-thread">
      <div class="chat-thread-header">
        <div class="chat-thread-title">
          ${name}
        </div>
        <div class="chat-thread-last-message">
          ${messages[messages.length - 1].text}
        </div>
      </div>
    </div>
    `;
    containingElement.appendChild(newThread);

    if (index === 0) this.selectThread({ id, name, messages });

    newThread.addEventListener("click", () => {
      this.selectThread({ id, name });
    });
  }

  selectThread({ id, name }) {
    const messages = this.threads.find((thread) => thread.id === id).messages;

    if (this.selectThread !== null) {
      const previousSelectedThread = document.querySelector(
        ".chat-thread.selected"
      );
      previousSelectedThread?.classList.remove("selected");
    }

    this.selectedThread = document
      .querySelector(".chat-threads")
      .querySelector(`#${id}`);
    this.selectedThread.classList.add("selected");

    this.renderConversation({ id, name, messages });

    const sendButton = document.querySelector("#send-message");
    const message = document.querySelector("#message");

    message.removeEventListener("keypress", this.enterHandler);
    sendButton.removeEventListener("click", this.clickHandler);

    this.enterHandler = (e) => {
      if (e.key === "Enter") {
        this.processMessage({
          threadID: id,
          from: this.currentUserID,
          text: message.value,
          timestamp: new Date().getTime(),
        });
      }
    };

    this.clickHandler = () => {
      this.processMessage({
        threadID: id,
        from: this.currentUserID,
        text: message.value,
        timestamp: new Date().getTime(),
      });
    };

    message.addEventListener("keypress", this.enterHandler);
    sendButton.addEventListener("click", this.clickHandler);
  }

  processMessage({ threadID, from, text, timestamp }) {
    const message = document.querySelector("#message");
    this.sendMessage({
      threadID,
      from,
      text,
      timestamp,
    })
      .then((messageId, name) => {
        this.addMessage({
          id: messageId,
          name,
          threadID,
          from,
          text,
          timestamp,
        });

        message.value = "";
      })
      .catch((error) => console.error(error));
  }

  renderConversation({ id, name, messages }) {
    const conversationTitle = document.querySelector(
      ".chat-conversation-title"
    );
    conversationTitle.innerHTML = name;

    const chatElement = document.querySelector(".chat-conversation-messages");
    chatElement.innerHTML = "";

    messages.forEach(({ id, from, name, text, timestamp }) => {
      this.renderMessage({ id, from, name, text, timestamp });
    });
  }

  renderMessage({ id, from, name, text, timestamp }) {
    const containingElement = document.querySelector(
      ".chat-conversation-messages"
    );

    const newMessage = document.createElement("div");
    newMessage.innerHTML += `
      <div class="chat-message ${
        this.currentUserID == from ? "sent" : "recieved"
      }">
        <div class="chat-message-text ${
          this.currentUserID == from ? "sent" : "recieved"
        }">
          ${text}
        </div>
        <div class="chat-message-timestamp">
          ${new Date(timestamp).toLocaleString()}
      </div>
      `;

    containingElement.appendChild(newMessage);
  }

  addMessage({ id, threadID, name, from, text, timestamp }) {
    this.threads = this.threads.map((thread) => {
      if (thread.id === threadID) {
        thread.messages = [
          ...thread.messages,
          {
            id,
            name,
            from,
            text,
            timestamp,
          },
        ];

        this.renderMessage({ id, name, from, text, timestamp });
      }

      return thread;
    });

    const messagesContainer = document.querySelector(
      ".chat-conversation-messages"
    );
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
