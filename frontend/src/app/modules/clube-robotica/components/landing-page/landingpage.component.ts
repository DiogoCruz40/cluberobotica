import { Component,OnInit, ViewChild} from '@angular/core';
import { Pedidoimpressao3dModalComponent } from '../pedidoimpressao3d-modal/pedidoimpressao3d-modal.component';

@Component({
  selector: 'landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingPageComponent implements OnInit {
  @ViewChild('pedidoimpressao3d')
  pedidoimpressao3dasmodal:Pedidoimpressao3dModalComponent;

  constructor()
  {}
  ngOnInit(): void {
   
  }
  openpedidoimpressao3d()
  {
    this.pedidoimpressao3dasmodal.openModalImpressao3d();
  }
}
