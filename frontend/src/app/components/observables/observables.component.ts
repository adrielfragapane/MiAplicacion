import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { interval, timer, concat} from 'rxjs';
import { fromEvent, of, pipe, range } from 'rxjs';

import { filter , map, tap, mapTo, share, take } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

  obs : any;
  
  constructor() { }

  ngOnInit(): void {

    this.obs = Observable.create( function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });

  /* interval: crea un observable que se ejecuta cada XXXX ms y devuelve un contador */

    const contador = interval(2000);

    contador.subscribe((n) => {
      //console.log(n);
    })

  /* timer: crea un observable que se ejecuta luego de XXXX ms */

    const delay = timer(1000);

    delay.subscribe(() => {
      
      console.log('Me ejecuto luego de 1000 ms');
    })

  /* fromEvent: crea un observable que se ejecuta cuando se produce un evento */
    
    const click = fromEvent(document.documentElement,'click');

    click.subscribe((e) => {
      console.log('Se hizo click');
    })

    const mouseover = fromEvent(document.getElementsByClassName('btn'),'mouseover');

    mouseover.subscribe((e: MouseEvent) => {
      console.log(`Se hizo click en ${e.clientX} y ${e.clientY}`);
    })

  /* of: crea una lista observable */

    const numbers = of(1,2,3,4,5);

  /* pipe: concatena operadores de observables */

    const alcuadrado = pipe(
      filter((n: number) => n % 2 == 0),
      map((n: number) => n * n)
    )

    alcuadrado(numbers).subscribe( (n) => {
      console.log(n);
    })

  /*El operador de tap de RxJS mirará el valor Observable y hará algo con ese valor. 
  En otras palabras, después de una solicitud de API exitosa, el operador tap() hará 
  la función que desee que realice con la respuesta. ... Si desea lanzar un error o quiere 
  llamar a alguna función si recibe un error, puede hacerlo aquí. */

    const positions = click.pipe(
      tap( ev=> console.log('Procesado: ' + ev),
      err => console.log(err),
      () => console.log('Completado'))
      );

      positions.subscribe( pos => console.log(pos));


  /*share: se utiliza para definir que un observable que posee varias suscripciones,
  no realice la operación multiples veces*/
  
    const timer2 = timer(1000);

    const obs2 = timer2.pipe(
      tap(() => console.log('TAP ON')),
      mapTo('END OBS')
    );

  /* las dos suscripciones generan el valor TAP ON */

    const subs01 = obs2.subscribe(val => console.log(val));
    const subs02 = obs2.subscribe(val => console.log(val));

    const obsShared = obs2.pipe(share());

    console.log('SHARE ON');
 
  /* solo se produce imprime una vez el valor TAP ON 
  */
    const subs03 = obsShared.subscribe(val => console.log(val));
    const subs04 = obsShared.subscribe(val => console.log(val));

  /* take: reproduce un observable n veces*/

  const interval2 = interval(1000).pipe(take(4));

  /* range: genera un rango entre dos numeros */

  const rango = range(1,10);

  /* concat: concatena dos observables */

  const result = concat(interval2,rango);

  result.subscribe(x => console.log(x));
}

  pruebaObservable1() {
    console.log('just before subscribe');
    this.obs.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log('just after subscribe');
  }


  




}
