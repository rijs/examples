module.exports = function(node, data){
  ripple.on('change', cb)

  const { send } = ripple
  for (let i = 0; i < 10000; i++)
    send(`x-${i}`, 'pull')
}