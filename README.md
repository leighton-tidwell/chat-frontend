# Front end chat client

As of now, this project is not fully functional. It's original intention was to be made for a friend who wanted a quick plug and play front end component to his chat.

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

The `createChat` function takes multiple arguments:

| Argument        | Type       | Description                                                                                                                                                                                                                                     |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerID`   | `string`   | The ID of the container the chat box will live in.                                                                                                                                                                                              |
| `currentUserID` | `string`   | The ID of the current user logged in.                                                                                                                                                                                                           |
| `sendMessage`   | `function` | The function that will be called when a user attempts to send a message. This function will pass the `threadID` `from` `text` and `timestamp` to a function you provide and expect a return value of the new message ID and current users name. |
| `threads`       | `array`    | An array of objects containing information about the thread, including an array with all of the messages                                                                                                                                        |

See `demo.html` for examples of how to use this.

If you have any suggestions or problems, feel free to make an issue.
