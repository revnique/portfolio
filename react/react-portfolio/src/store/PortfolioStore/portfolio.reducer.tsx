import { LoadBuckLites, LoadBuckLite, LoadBuckLitesSuccess, LoadBuckLiteSuccess, SetIsPending } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";
import { BuckLite } from "../../BuckLite/buck-helper";
import { getMatches } from "../../BuckLite/buck-helper";

const portfolioReducer = (state = initialPortfolioState, action:any) => {
    console.log('portfolio action', action);
    switch (action.type) {
        case LoadBuckLites:
            return {
                ...state,
                isPending: true
            };
        case LoadBuckLite:
            let buckLite = action.payload;
            buckLite.match = getMatches(buckLite.SN);
            return {
                ...state,
                isPending: true
            };
        case LoadBuckLitesSuccess:
            let buckLites = action.payload;
            buckLites.forEach((buckLite: BuckLite) => {
                buckLite.match = getMatches(buckLite.SN);
            }); 
            return {
                ...state,
                BuckLites: buckLites,
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