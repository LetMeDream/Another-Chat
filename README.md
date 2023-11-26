# Another-Chat
Simple React/Vite/Tailwind app, using SocketIO in order to implement a basic chat functionality and whatnot.

## Running the App

In order to run the app, follow these instructions for each part:

### Server

1. Open a terminal.
2. Navigate to the `server` folder:
3. Run
```
  cd server
  npm run dev
```

### Front 
1. Open a terminal.
2. Navigate to the `server` folder:
3. Run
```
  cd server
  npm run dev
```

### Important Note
If you are running a local dev server, you will encounter issues related to insecure origins in Chrome (since mediaNavigator permissions require an https connection), so you will have
to activate the 'unsafely-treat-insecure-origin-as-secure' option.

Open Chrome and go to the following link:

chrome://flags/#unsafely-treat-insecure-origin-as-secure

Enable the 'unsafely-treat-insecure-origin-as-secure' option.

Restart Chrome.
