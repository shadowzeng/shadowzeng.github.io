# RxJS

## Summary

- what is RxJS
- what is Observable
- what is Operator

## What is RxJS

Reactive Extensions (`ReactiveX`) Library for Javascript

### What is ReactiveX

- a set of tools(operators) to operate on sequences of data (synchronous or asynchronous)
- api for asynchronous programming with observable streams
- implementation: `RxJava` / `Rx.NET` / `RxScala` ...

## What is Observable

|    | single  | multiple   |
|----|---------|------------|
|pull| Function| Iterator   |
|push| Promise | Observable |

- push multiple data or event
- push synchronously or asynchronously

### Compare with Promise

Promise

```javascript
function executorFunc(resolve, reject) {
    // Some code...
    resolve(value)
    // Some code...
    reject(error)
}

const promise = new Promise(executorFunc)

promise.then(onFulfilled, onRejected)

function onFulfilled(value) {
    // Do something with value...
}

function onRejected(error) {
    // Do something with error...
}
```

Observable

```javascript
function subscriberFunc(observer) {
    // Some code...
    observer.next(value)
    // If there is an error...
    observer.error(error)
    // If all successful...
    observer.complete()
}

const observable = new Observable(subscriberFunc)

observable.subscribe(nextFunc, errorFunc)

function nextFunc(value) {
    // Do something with value...
}

function errorFunc(error) {
    // Do something with error...
}
```

|                |    Promise    | Observable       |
|----------------|---------------|------------------|
|push value      | single        | multiple         |
|task function   | `executor function` is called eagerly | `subscriber function` is called lazily (when subscribing)|
|handle function | executed asynchronously | executed synchronously|
|cancellable     | can not be cancelled    | can be cancelled (by `unsubscribe`)|

### Samples

```javascript
const observable: Observable<number> =
    new Observable<number>((subscriber: Subscriber) => {
        subscriber.next(1)
        subscriber.next(2)
        subscriber.next(3)
        setTimeout(() => {
            subscriber.next(4)
            subscriber.complete()
        }, 1000)
    })

const subscription: Subscription = observable.subscribe({
    next(value) { console.log(value) },
    error(err) {},
    complete() {},
})

subscription.unsubscribe()
```

- `Observable`: represents the idea of an invokable collection of future
values or events.
- `Observer`: is a collection of callbacks that knows how to listen to values
delivered by the Observable.
- `Subscription`: represents the execution of an Observable, is primarily
useful for cancelling the execution.

## What is Operator

Operators are functions used for creating observable or handling data stream
emited by observable.

Two kinds of operators:

- Creation Operators
- Pipeable Operators

### Creation Operators

#### of

Each argument becomes a next notification.

```javascript
of(1, 2, 3).subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-of)

#### from

Creates an Observable from an Array, an array-like object, a Promise, an
iterable object, or an Observable-like object.

```javascript
from([1, 2, 3]).subscribe(x => console.log(x))
```

#### interval

Emits incremental numbers periodically in time.

```javascript
interval(1000).subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-interval)

#### fromEvent

Creates an Observable from DOM events, or Node.js EventEmitter events or others.

```javascript
fromEvent(document, 'click').subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-fromevent)

### Pipeable Operators

#### map

it passes each source value through a transformation function to get
corresponding output values.

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCE226a0b025ddda12a556a0cc57c62ce17/71568)

```javascript
of(1, 2, 3).pipe(map(x => x * x)).subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-map)

#### filter

it only emits a value from the source if it passes a criterion function.

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCEb78fa8000579d6dd3869037a08032cce/71569)

```javascript
fromEvent(document, 'click')
    .pipe(filter(ev => ev.target.tagName === 'DIV'))
    .subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-filter)

### Some operators

#### concat

Concatenates multiple Observables together by sequentially emitting their
values, one Observable after the other.

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCEc9d66b2a1b570e6384e195611c8b2316/71572)

```javascript
const timer1 = interval(1000).pipe(take(10))
const timer2 = interval(2000).pipe(take(6))
const timer3 = interval(500).pipe(take(10))

const result = concat(timer1, timer2, timer3)
result.subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-concat)

#### merge

Flattens multiple Observables together by blending their values into one
Observable.

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCE45239f0754997c034d702fd69c57aed4/71571)

```javascript
const timer1 = interval(1000).pipe(take(5))
const timer2 = interval(2000).pipe(take(3))
const timer3 = interval(500).pipe(take(5))
const concurrent = 2
const merged = merge(timer1, timer2, timer3, concurrent)
merged.subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-merge)

#### concatAll

Flattens an Observable-of-Observables by putting one inner Observable after
the other.

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCEa95872f27fdcab0bcd67d8a72283fd0d/71573)

```javascript
const clicks = fromEvent(document, 'click')
const higherOrder = clicks.pipe(
  map(ev => interval(1000).pipe(take(4))),
)
const firstOrder = higherOrder.pipe(concatAll())
firstOrder.subscribe(x => console.log(x))
```

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-concatall)

#### mergeAll

Flattens an Observable-of-Observables.

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCEf7b328518d1278a64b08b7f1b38613e2/71574)

[Try in stackblitz](https://stackblitz.com/edit/rxjs-sample-mergeall)

## Subject

- extends observable
- can multicast to many observers

![image](https://note.youdao.com/yws/public/resource/6c1149b159902aaa609bd73cebe8c767/xmlnote/WEBRESOURCEaa75ecf7483574bf4920f19912ec7be1/71221)

```javascript
const subject = new Subject<number>()

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
})
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
})

subject.next(1)
subject.next(2)

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

### BehaviorSubject

It stores the latest value emitted to its consumers, and whenever a new
Observer subscribes, it will immediately receive the "current value" from the
BehaviorSubject.

```javascript
const subject = new BehaviorSubject(0) // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
})

subject.next(1)
subject.next(2)

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
})

subject.next(3)

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

### ReplaySubject

A ReplaySubject records multiple values from the Observable execution and
replays them to new subscribers.

```javascript
const subject = new ReplaySubject(3) // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
})

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
})

subject.next(5)

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```

### AsyncSubject

only the last value of the Observable execution is sent to its observers, and
only when the execution completes.

```javascript
const subject = new AsyncSubject()

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
})

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
})

subject.next(5)
subject.complete()

// Logs:
// observerA: 5
// observerB: 5
```
