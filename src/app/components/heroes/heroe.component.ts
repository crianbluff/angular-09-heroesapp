import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  public heroe:Heroe = {
    nombre: '',
    casa: 'Marvel',
    bio: ''
  };

  nuevo:boolean = false;
  id:string;

  constructor( private _heroesService:HeroesService, private router:Router, private activatedRoute:ActivatedRoute ) {
    this.activatedRoute.params
    .subscribe( parametros => {
      this.id = parametros['id'];

      if ( this.id !== 'nuevo' ) {
        this._heroesService.getHeroe( this.id )
        .subscribe( heroe => this.heroe = heroe );
      }
    });
  }

  ngOnInit() {
  }

  guardar() {
    // console.log(this.heroe);

    if ( this.id == 'nuevo' ) {
      // insertando
      this._heroesService.nuevoHeroe( this.heroe )
      .subscribe( data=> {
        this.router.navigate( [ '/heroe', data.name ] );
      }, error => console.log(error) );
    } else {
        // actualizando
        this._heroesService.actualizarHeroe( this.heroe, this.id )
      .subscribe( data=> {
        // console.log(data);
      }, error => console.log(error) );
      }
  }

  agregarNuevo( forma:NgForm ) {
    this.router.navigate( [ '/heroe', 'nuevo' ] );
    forma.reset({
      casa: 'Marvel'
    });
  }

}