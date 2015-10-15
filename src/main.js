import Cycle from '@cycle/core'
import {h, makeDOMDriver} from '@cycle/dom'
import styles from './main.css'

function toDOMSelector(name) {
  return `.${name.split(' ').join('.')}`
}

function intent(DOM) {
  return Cycle.Rx.Observable.merge(
    DOM.select(toDOMSelector(styles.decrement)).events('click').map(ev => -1),
    DOM.select(toDOMSelector(styles.increment)).events('click').map(ev => +1)
  )
}

function model(action$) {
  return action$.startWith(0).scan((acc,x) => acc + x)
}

function view(state$) {
  return {
    DOM: state$.map(count =>
        h('div', [
          h('p', {className: styles.counter}, `Counter: ${count}`),
          h('div', [
            h('button', {className: styles.decrement}, 'Decrement'),
            h('button', {className: styles.increment}, 'Increment')
          ])
        ])
      )
  }
}

function main({DOM}) {
  return view(model(intent(DOM)))
}

Cycle.run(main, {
  DOM: makeDOMDriver('#main-container')
})
