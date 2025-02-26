import { RouterModule, Routes } from '@angular/router';
import { BuckLiteComponent } from './buck-lite/buck-lite.component';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'bucklite', component: BuckLiteComponent },
    { path: 'components', component: ComponentsPageComponent },
];

export const routing = RouterModule.forRoot(routes);
