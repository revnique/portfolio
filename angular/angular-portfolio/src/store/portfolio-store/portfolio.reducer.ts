import { PortfolioActions } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";

const portfolioReducer = (state = initialPortfolioState, action:any) => {
    console.log('portfolio action', action);
    switch (action.type) {
        case PortfolioActions.loadBuckLitesSuccess:
            return {
                ...state,
                BuckLites: action.payload
            };
        case PortfolioActions.loadBuckLiteSuccess:
            return {
                ...state,
                BuckLite: action.payload
            };
        default:
            return state;
    }
};

export default portfolioReducer;