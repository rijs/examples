export default function debug({ versions }) {
  const o = once(this)
      , label = d => d.name + ' (' + d.index + ')' 
      , details = d => str(ripple.resources[d.name].body.log[d.index].value.toJS())

  o('a', versions)
    .text((d, i) => i)
    .on('click.rollback', (d, i) => ripple.version(i))
    ('span', d => d)
      .attr('details', details)
      .text(label)

  ripple.on('change.debugger', name => name !== 'versions' && ripple('versions', ripple.version.log))
  if (!versions.length) ripple.on.change.debugger()
}