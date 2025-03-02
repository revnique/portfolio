import { BuckLite } from "../../app/buck-lite/buck-helper";

export const initialPortfolioState: PortfolioState = {
    BuckLites: [],
    BuckLite: {} as BuckLite
}

export interface PortfolioState {
    BuckLites: BuckLite[];
    BuckLite: BuckLite;
}



