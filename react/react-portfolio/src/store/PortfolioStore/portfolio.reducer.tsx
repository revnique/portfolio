import { LoadBuckLites, LoadBuckLite } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";

const portfolioReducer = (state = initialPortfolioState, action:any) => {
    switch (action.type) {
        case LoadBuckLites:
            return {
                ...state,
                BuckLites: action.payload
            };
        case LoadBuckLite:
            return {
                ...state,
                BuckLite: action.payload
            };
        default:
            return state;
    }
};

export default portfolioReducer;