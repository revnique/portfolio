import { createReducer, on } from '@ngrx/store';
import { RootActions } from './root.actions';
import { initialRootState } from './root.state';

export const rootReducer = createReducer(
    initialRootState,
    on(RootActions.toggleSideBar, (state) => {
        return {
            ...state,
            sidebarState: {
                ...state.sidebarState,
                sidebarIsOpen: !state.sidebarState.sidebarIsOpen
            }
        }
    }),
);

export default rootReducer;