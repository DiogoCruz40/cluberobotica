import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/clube-robotica/clube-robotica.module').then(module => module.ClubeRoboticaModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/clube-robotica-admin/clube-robotica-admin.module').then(module => module.ClubeRoboticaAdminModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
