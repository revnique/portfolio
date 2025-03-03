import { BuckLite } from "../../app/buck-lite/buck-helper";

export const initialPortfolioState: PortfolioState = {
    isPending: true,
    BuckLites: [],
    BuckLite: {} as BuckLite
}

export interface PortfolioState {
    isPending: boolean;
    BuckLites: BuckLite[];
    BuckLite: BuckLite;
}




