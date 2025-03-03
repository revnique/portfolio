import { BuckLite } from "../../BuckLite/buck-helper";

export const initialPortfolioState: PortfolioState = {
    BuckLites: [],
    BuckLite: {} as BuckLite,
    isPending: true
}

export interface PortfolioState {
    BuckLites: BuckLite[];
    BuckLite: BuckLite;
    isPending: boolean;
}



