import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes:any[] = [];
  loading:boolean = true;

  constructor( private _heroesService:HeroesService ) {
    this._heroesService.getHeroes()
    .subscribe( data => {
      this.heroes = data;
      this.loading = false;
      // setTimeout( () => {
      //   this.loading = false;
      //   this.heroes = data;
      // }, 3000);
    });
  }

  ngOnInit() {
  }

  borraHeroe( key$:string ) {
    this._heroesService.borraHeroe( key$ )
    .subscribe( respuesta => {
      if (respuesta ) {
        // console.error(respuesta);
      } else {
          // todo bien
          delete this.heroes[key$];
        }
    });
  }

}