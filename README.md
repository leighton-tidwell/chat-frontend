# Front end chat client

This project's original intention was to be made for a friend who wanted a quick plug and play front end component to his chat.

# How to initialize

```html
<link rel="stylesheet" href="src/chat.css" />
<script type="text/javascript" src="src/chat.js" defer></script>
<script type="text/javascript">
  window.addEventListener("DOMContentLoaded", () => {
    const chat = new Chat({});
  });
</script>
```

The `Chat` constructor takes multiple arguments:

| Argument        | Type       | Description                                                                                                                                                                                                                                     |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerID`   | `string`   | The ID of the container the chat box will live in.                                                                                                                                                                                              |
| `currentUserID` | `string`   | The ID of the current user logged in.                                                                                                                                                                                                           |
| `sendMessage`   | `function` | The function that will be called when a user attempts to send a message. This function will pass the `threadID` `from` `text` and `timestamp` to a function you provide and expect a return value of the new message ID and current users name. |
| `threads`       | `array`    | An array of objects containing information about the thread, including an array with all of the messages                                                                                                                                        |

See `index.html` for examples of how to use this.

# Styling

The CSS sheet for the basic styles applied are in `chat.css` and can be used as is, or modified to your liking.

# Demo

You can see a demo [https://leighton-tidwell.github.io/chat-frontend/](**here**).

# Contribution

If you have any suggestions or problems, feel free to make an issue.
