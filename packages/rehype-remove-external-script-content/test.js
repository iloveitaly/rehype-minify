import test from 'tape'
import {rehype} from 'rehype'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import min from './index.js'

test('rehype-remove-external-script-content', (t) => {
  t.deepEqual(
    rehype()
      .use(min)
      .runSync(u('root', [h('script', 'alert(true)')])),
    u('root', [h('script', 'alert(true)')])
  )

  t.deepEqual(
    rehype()
      .use(min)
      .runSync(u('root', [h('script', {src: 'index.js'}, 'alert(true)')])),
    u('root', [h('script', {src: 'index.js'})])
  )

  t.deepEqual(
    rehype()
      .use(min)
      .runSync(
        u('root', [
          h('script', {type: 'fooscript', src: 'index.js'}, 'alert(true)')
        ])
      ),
    u('root', [
      h('script', {type: 'fooscript', src: 'index.js'}, 'alert(true)')
    ])
  )

  t.end()
})
