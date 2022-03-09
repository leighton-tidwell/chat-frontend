const createChat = ({ containerID = "container", threads = [] }) => {
  createUserInterface({ container: containerID });

  threads.forEach((thread, i) => {
    createThread({
      id: thread.id,
      name: thread.name,
      messages: thread.messages,
      index: i,
    });
  });
};

const createUserInterface = ({ container }) => {
  const containingElement = document.getElementById(container);
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
        </div>
      </div>
    </div>
    `;
};

const createThread = ({ id, name, messages, index }) => {
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

  if (index === 0) selectThread({ id, name, messages });

  newThread.addEventListener("click", () => {
    selectThread({ id, name, messages });
  });
};

const selectThread = ({ id, name, messages }) => {
  const previousSelectedThread = document.querySelector(
    ".chat-thread.selected"
  );
  previousSelectedThread?.classList.remove("selected");

  const selectedThread = document
    .querySelector(".chat-threads")
    .querySelector(`#${id}`);
  selectedThread.classList.add("selected");

  showConversation({ id, name, messages });
};

const showConversation = ({ id, name, messages }) => {
  const conversationTitle = document.querySelector(".chat-conversation-title");
  conversationTitle.innerHTML = name;

  const chatElement = document.querySelector(".chat-conversation-messages");
  chatElement.innerHTML = "";

  messages.forEach(({ id, from, text, timestamp }) => {
    createMessage({ id, name, from, text, timestamp });
  });
};

const createMessage = ({ id, name, from, text, timestamp }) => {
  const containingElement = document.querySelector(
    ".chat-conversation-messages"
  );

  const newMessage = document.createElement("div");
  newMessage.innerHTML += `
    <div class="chat-message ${name == from ? "recieved" : "sent"} ">
      <div class="chat-message-text">
        ${text}
      </div>
    </div>
    `;

  containingElement.appendChild(newMessage);
};
