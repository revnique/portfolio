import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { RootActions } from './root.actions';

@Injectable()
export class RootEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    toggleSideBar$ = createEffect(() => this.actions$.pipe(
        ofType(RootActions.toggleSideBar),
        map(() => RootActions.toggleSideBarSuccess())
    ));
}