import { PortfolioActions } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";
import { createReducer, on } from "@ngrx/store";
import { BuckLite, getMatches } from "../../app/buck-lite/buck-helper";
export const portfolioReducer = createReducer(
    initialPortfolioState,
    on(PortfolioActions.loadBuckLites, (state) => ({
        ...state,
        isPending: true
    })),
    on(PortfolioActions.loadBuckLite, (state) => ({
        ...state,
        isPending: true
    })),
    on(PortfolioActions.loadBuckLitesSuccess, (state, action) => {
        let buckLites = JSON.parse(JSON.stringify(action.buckLites));
        buckLites.forEach((buckLite: BuckLite) => {
            buckLite.match = getMatches(buckLite.SN);
        }); 
        return {
        ...state,
        BuckLites: buckLites,
        isPending: false
    }}),
    on(PortfolioActions.loadBuckLiteSuccess, (state, action) => {
        console.log('loadBuckLiteSuccess', action, state);
        let buckLite = JSON.parse(JSON.stringify(action.buckLite));
        if (buckLite){
            buckLite.match = getMatches(buckLite.SN);
        }

        return {
        ...state,
        BuckLite: buckLite,
        isPending: false
    }}),
    on(PortfolioActions.setIsPending, (state, action) => ({
        ...state,
        isPending: action.isPending
    })),
);

export default portfolioReducer;