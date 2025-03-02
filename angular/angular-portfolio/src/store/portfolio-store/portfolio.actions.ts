import { createActionGroup, props } from '@ngrx/store';
import { BuckLite } from '../../app/buck-lite/buck-helper';
import { emptyProps } from '@ngrx/store';

export const PortfolioActions = createActionGroup({
    source: 'Portfolio',
    events: {
        loadBuckLites: emptyProps(),
        loadBuckLitesSuccess: props<{ buckLites: BuckLite[] }>(),
        loadBuckLite: props<{ SN: string }>(),
        loadBuckLiteSuccess: props<{ buckLite: BuckLite }>(),
    },
});