import { take, map, delay, mergeAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// https://www.learnrxjs.io/learn-rxjs/operators/combination/mergeall

// const srcInterval = interval(1500).pipe(take(5)); //output: 15 = 3*5
const srcInterval = interval(1500).pipe(take(3)); // output: 9 = 3*3

/*
  interval is emitting a value every 0.5s.  This value is then being mapped to interval that
  is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
  many inner observables to subscribe to at a time.  The rest of the observables are stored
  in a backlog waiting to be subscribe.
*/
const example = srcInterval
  .pipe(
    map((val) => srcInterval.pipe(delay(1000), take(3))),
    mergeAll(2)
  )
  .subscribe((val) => console.log(val));
/*
  The subscription is completed once the operator emits all values.
*/
