import { createActionGroup, createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyProps } from '@ngrx/store';
import { RootState } from './root.state';

export const RootActions = createActionGroup({
    source: 'Root',
    events: {
        toggleSideBar: emptyProps(),
        toggleSideBarSuccess: emptyProps(),
    },
});

const getRootState = createFeatureSelector<RootState>('root');

export const selectRootState = createSelector(
    getRootState,
    state => state
);

