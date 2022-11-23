import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landingpage.component';
import { ClubeRoboticaComponent } from './clube-robotica.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ClubeRoboticaComponent,
    children: [
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: LandingPageComponent,
          },
        ],
        
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubeRoboticaRoutingModule {}
