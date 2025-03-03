import { PortfolioActions } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";
import { createReducer, on } from "@ngrx/store";

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
    on(PortfolioActions.loadBuckLitesSuccess, (state, action) => ({
        ...state,
        BuckLites: action.buckLites,
        isPending: false
    })),
    on(PortfolioActions.loadBuckLiteSuccess, (state, action) => ({
        ...state,
        BuckLite: action.buckLite,
        isPending: false
    })),
    on(PortfolioActions.setIsPending, (state, action) => ({
        ...state,
        isPending: action.isPending
    })),
);

export default portfolioReducer;