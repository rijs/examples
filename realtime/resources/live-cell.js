ripple({ name: 'live-cell', body: cell })

function cell(price){
  if (!is.num(price)) return;
  // console.log('cell', arguments)
  price && (this.textContent = price)
}