import {combineReducers} from "redux";
import { initialRootState } from "./root.state";
import { ToggleSideBarSuccess } from "./root.actions";
import portfolioReducer from "./PortfolioStore/portfolio.reducer";

const reducer = (state = initialRootState, action:any) => {
    console.log('root action', action);
    switch (action.type) {
        case ToggleSideBarSuccess:
            return {
                ...state,
                sidebarState: {
                    ...state.sidebarState,
                    sidebarIsOpen: !state.sidebarState.sidebarIsOpen
                }
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({ reducer, portfolioReducer });

export default rootReducer
