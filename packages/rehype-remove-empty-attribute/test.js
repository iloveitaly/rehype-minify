import test from 'tape'
import {rehype} from 'rehype'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import min from './index.js'

test('rehype-remove-duplicate-attribute-values', (t) => {
  t.deepEqual(
    rehype()
      .use(min)
      .runSync(
        u('root', [h('label', {htmlFor: '', id: '', allowTransparency: ''})])
      ),
    u('root', [
      {
        type: 'element',
        tagName: 'label',
        properties: {allowTransparency: '', htmlFor: null, id: null},
        children: []
      }
    ])
  )

  t.deepEqual(
    rehype()
      .use(min)
      .runSync(u('root', [{type: 'element', tagName: 'label', children: []}])),
    u('root', [{type: 'element', tagName: 'label', children: []}])
  )

  t.end()
})
