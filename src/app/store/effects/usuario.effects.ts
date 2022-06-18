import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {UsuarioService} from "../../services/usuario.service";
import {of} from "rxjs";

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private  usuarioService: UsuarioService
  ){}


  //Los tap sirve para ver como va fluyendo, cuando se usa se puede ver lo que lleva en cada momento

  cargaUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType( cargarUsuario ),
      tap( data => console.log('effect tap', data)),
      mergeMap(
        ( action ) => this.usuarioService.getUsersById( action.id )
          .pipe(
            tap( data => console.log('getUSer effect', data)),
            map( user => cargarUsuarioSuccess({usuario: user}) ),
            catchError( err => of( cargarUsuarioError({payload: err})) )
          )
      )
    )
  );


}


