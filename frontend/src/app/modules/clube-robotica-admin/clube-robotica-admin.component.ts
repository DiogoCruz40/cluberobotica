import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contains } from 'jquery';
import { User } from './models/User';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 're-clube-robotica-admin',
  templateUrl: './clube-robotica-admin.component.html',
  styleUrls: ['./clube-robotica-admin.component.scss']
})
export class ClubeRoboticaAdminComponent implements OnInit {

  isLoggedIn = false;
  isAdminOmni = false;
  nome?: string;

  constructor(private tokenStorageService: TokenStorageService,private router:Router) {

    if (!this.router.url.includes('/admin')) {
      window.location.replace('admin');
    }
    
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


  }

  setUser(user: User): void {
  
    this.isAdminOmni = user ? user.omnipotente : false;
    this.nome = user?.nome;
  }


}
