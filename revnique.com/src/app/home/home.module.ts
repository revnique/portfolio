import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RevService } from "../services/rev.service";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home.component";
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
@NgModule({
    declarations: [
        HomeComponent,
        ProjectComponent,
        ProjectDetailComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        HttpClientModule
    ],
    providers: [RevService]
})
export class HomeModule { }
