# Minimal React

This can be used as a demo for how to use Ripple for the core, sync between nodes, and React for the view layer.

# Run

```
npm i
node index.js
start http://localhost:5000
```

Enter the following to update the list tweets, which will update the UI, on all tabs.

```js
ripple('tweets', ['a', 'b'])
```