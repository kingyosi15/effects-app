import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {UsuarioService} from "../../services/usuario.service";
import {of} from "rxjs";

@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private  usuarioService: UsuarioService
  ){}


  //Los tap sirve para ver como va fluyendo, cuando se usa se puede ver lo que lleva en cada momento

  cargaUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType( cargarUsuarios ),
      tap( data => console.log('effect tap', data)),
      mergeMap(
        () => this.usuarioService.getUsers()
          .pipe(
            tap( data => console.log('getUSer effect', data)),
            map( users => cargarUsuariosSuccess({usuarios: users}) ),
            catchError( err => of( cargarUsuariosError({payload: err})) )
          )
      )
    )
  );


}


