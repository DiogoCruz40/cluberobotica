import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ClubeRoboticaAdminComponent } from './clube-robotica-admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';
import { Impressao3dComponent } from './components/impressao3d/impressao3d.component';


export const routes: Routes = [
  {
    path: '',
    component: ClubeRoboticaAdminComponent,
    children: [
      {
        path: '',
        component: PerfilComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'iniciar-sessao',
        component: LoginComponent,
     
      },
      {
        path: 'registar',
        component: RegisterComponent,
     
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'gestao-admins',
        component: ManageAdminsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'impressao3d',
        component: Impressao3dComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo:""
      },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubeRoboticaRoutingAdminModule { }
