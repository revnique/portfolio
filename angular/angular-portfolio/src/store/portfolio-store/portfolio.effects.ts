import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PortfolioActions } from './portfolio.actions';
import { PortfolioService } from '../../services/portfolio.service';

@Injectable()
export class PortfolioEffects {
    constructor(
        private actions$: Actions,
        private portfolioService: PortfolioService
    ) { }

    loadBuckLites$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.loadBuckLites),
        mergeMap(() => this.portfolioService.fetchBuckLites().then(buckLites => PortfolioActions.loadBuckLitesSuccess({ buckLites }))
        ))
    );

    loadBuckLite$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.loadBuckLite),
        mergeMap((action) => this.portfolioService.fetchBuckLite(action.SN).then(buckLite => PortfolioActions.loadBuckLiteSuccess({ buckLite }))
        ))
    );
}