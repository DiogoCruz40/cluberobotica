import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../../models/User';
import { TokenStorageService } from '../../services/token-storage.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 're-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn = false;
  isAdminOmni = false;
  nome?: string;
  items: MenuItem[];
  constructor(private breakpointObserver: BreakpointObserver, private tokenStorageService: TokenStorageService) {
    this.tokenStorageService.userBS.subscribe({
      next: userBS => {
        this.setUser(userBS);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.setUser(this.tokenStorageService.getUser());
    }

    this.items = [
      {
        label: 'Impressão 3D',
        items: [{
          label: 'Lista',
          icon: 'pi pi-list',
          routerLink: './impressao3d'
        },
        {
          label: 'Arquivado',
          icon: 'pi pi-briefcase',
          routerLink: './impressao3d-arquivado'
        }
        ]
      },

    ];
  }

  setUser(user: User): void {
    this.isAdminOmni = user ? user.omnipotente : false;
    this.nome = user?.nome;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
