import { RouterModule, Routes } from '@angular/router';
import { BuckLiteComponent } from './buck-lite/buck-lite.component';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';
export const routes: Routes = [
    { path: '', component: DefaultPageComponent },
    { path: 'bucklite', component: BuckLiteComponent },
    { path: 'components', component: ComponentsPageComponent },
];

export const routing = RouterModule.forRoot(routes);
