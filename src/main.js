import Cycle from '@cycle/core'
import {h, makeDOMDriver} from '@cycle/dom'
import styles from './main.css'

function intent(DOM) {
  return Cycle.Rx.Observable.merge(
    DOM.select('.decrement').events('click').map(ev => -1),
    DOM.select('.increment').events('click').map(ev => +1)
  )
}

function model(action$) {
  return action$.startWith(0).scan((acc,x) => acc + x)
}

function counterElement(count) {
  return h(`p.${styles.counter}`, `Counter: ${count}`)
}

function buttonElement(label, classes) {
  return h(`button.${classes.join('.')}`, label)
}

function view(state$) {
  let buttonStyleClass = styles.button
  return {
    DOM: state$.map(count =>
        h('div', [
          counterElement(count),
          h(`div.${styles.actions}`, [
            buttonElement('Decrement', ['decrement', buttonStyleClass]),
            buttonElement('Increment', ['increment', buttonStyleClass]),
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
