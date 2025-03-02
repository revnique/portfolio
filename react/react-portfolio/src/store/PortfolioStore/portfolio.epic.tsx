import { ofType } from 'redux-observable';
import { Observable, mergeMap } from 'rxjs';
import { fetchBuckLite, fetchBuckLites } from '../../services/PortfolioService';
import { LoadBuckLites, LoadBuckLite } from './portfolio.actions';

export const loadBuckLitesEpic = (action$: Observable<any>) => action$.pipe(
    ofType(LoadBuckLites),
    mergeMap(async () => {
        const result = await fetchBuckLites();
        return { type: 'LOAD_BUCKLITES_SUCCESS', payload: result };
    })
);

export const loadBuckLiteEpic = (action$: Observable<any>) => action$.pipe(
    ofType(LoadBuckLite),
    mergeMap(async (action) => {
        const result = await fetchBuckLite(action.payload);
        return { type: 'LOAD_BUCKLITE_SUCCESS', payload: result };
    })
);
