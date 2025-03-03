import { LoadBuckLites, LoadBuckLite, LoadBuckLitesSuccess, LoadBuckLiteSuccess, SetIsPending } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";

const portfolioReducer = (state = initialPortfolioState, action:any) => {
    console.log('portfolio action', action);
    switch (action.type) {
        case LoadBuckLites:
            return {
                ...state,
                isPending: true
            };
        case LoadBuckLite:
            return {
                ...state,
                isPending: true
            };
        case LoadBuckLitesSuccess:
            return {
                ...state,
                BuckLites: action.payload,
                isPending: false
            };
        case LoadBuckLiteSuccess:
            return {
                ...state,
                BuckLite: action.payload,
                isPending: false
            };
        case SetIsPending:
            return {
                ...state,
                isPending: action.payload
            };
        default:
            return state;
    }
};

export default portfolioReducer;