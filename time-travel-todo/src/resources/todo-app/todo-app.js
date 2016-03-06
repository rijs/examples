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

  o('todo-item', visible, null, 'todo-footer')
    .each(ripple.draw)

  function addItem() {
    if (window.event.which != 13 || !this.value) return;

    push({
      item: this.value
    , completed: false
    })(items)

    this.value = ''
  }
}