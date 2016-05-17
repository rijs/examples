export default function todo({ items, filter }){
  const o = once(this)
      , { current } = filter
      , visible = 
          current == 'Completed' ? items.filter(by('completed', true))
        : current == 'Active'    ? items.filter(by('completed', false))
                                 : items

  o('input', 1)
    .property('placeholder', 'What needs to be done?')
    .attr('type', 'text')
    .on('keypress', addItem)

  o('todo-footer', { items, filter })

  o('todo-item', changed(visible), null, 'todo-footer')

  function addItem() {
    if (window.event.which != 13 || !this.value) return;

    push({
      item: this.value
    , completed: false
    })(items)

    this.value = ''
  }

  function changed(items) {
    var { change } = o.node()
      , key

    return  change.length !== 1       ? items
         : !change[0]                 ? items
         :  change[0][0]  !== 'items' ? items
         : !isFinite(key = change[0][1].key.split('.').shift()) ? items
         : items.map(({ completed, item }) => ({ completed, item, key }))
  } 
}