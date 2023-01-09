import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginPageComponent } from './admin-layout/login-page/login-page.component';
import { DashboardPageComponent } from './admin-layout/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './admin-layout/create-page/create-page.component';
import { EditPageComponent } from './admin-layout/edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./admin-shared/services/auth.guard";
import { SearchPipe } from "./admin-shared/search.pipe";
import { AlertComponent } from './admin-layout/alert/alert.component';
import { AlertService } from "./admin-shared/services/alert.service";
import { ModalComponent } from './admin-layout/modal/modal.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule, 
        RouterModule.forChild([
        {path: '', component: AdminLayoutComponent, children: [
            {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
            {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
            {path: 'note/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
        ]}
    ])],
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPipe,
        AlertComponent,
        ModalComponent
    ],
    exports: [RouterModule],
    providers: [AuthGuard, AlertService]
    
})

export class AdminModule {}