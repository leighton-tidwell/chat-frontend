# Front end chat client

As of now, this project is not fully functional. It's original intention was to be made for a friend who wanted a quick plug and play front end component to his chat.

# How to initialize

```html
<link rel="stylesheet" href="src/chat.css" />
<script type="text/javascript" src="src/chat.js" defer></script>
<script type="text/javascript">
  window.addEventListener("DOMContentLoaded", () => {
    createChat({});
  });
</script>
```

The `createChat` function takes multiple arguments:

- `containerID (STRING)` The ID of your container
- `threads[]` An array of the threads that will show up in the chat. See `demo.html` for examples of how to use this.

If you have any suggestions or problems, feel free to make an issue.
