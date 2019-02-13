import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesURL:string = 'https://heroesapp-9523a.firebaseio.com/heroes.json';
  heroeURL:string = 'https://heroesapp-9523a.firebaseio.com/heroes/';

  constructor( private http:Http ) { }

  nuevoHeroe( heroe:Heroe ) {
    
    const body = JSON.stringify( heroe );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.heroesURL, body, { headers: headers } )
    .map( res => {
      // console.log( res.json() );
      return res.json();
    });

  }

  actualizarHeroe( heroe:Heroe, key$:string ) {
    
    const body = JSON.stringify( heroe );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.put( url, body, { headers: headers } )
    .map( res => {
      // console.log( res.json() );
      return res.json();
    });

  }

  getHeroe( key$:string ) {
    const url = `${this.heroeURL}/${ key$ }.json`;
    return this.http.get( url )
    .map( res => res.json() );
  }

  getHeroes() {
    return this.http.get( this.heroesURL )
    .map( res => res.json() );
  }

  borraHeroe( key$:string ) {
    const url = `${this.heroeURL}/${ key$ }.json`;
    return this.http.delete( url )
    .map( res => res.json() );
  }
}