require('rijs')({ dir: __dirname })
.on('ready')
.each(d => {
  console.log("ripple.resources", ripple.resources)
  console.log("ripple.resources", 'app-hn.css.js' in ripple.resources)
  console.log("ripple.resources", 'app-hn.css' in ripple.resources)
  console.log("ripple.resources", 'app-hn' in ripple.resources)
})