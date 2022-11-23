import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, ElementRef, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, Subscription } from 'rxjs';
import { Pedidoimpressao3dModalComponent } from 'src/app/modules/clube-robotica/components/pedidoimpressao3d-modal/pedidoimpressao3d-modal.component';
import { Impressao3d } from 'src/app/modules/clube-robotica/models/impressao3d';

import { FileService } from 'src/app/services/file.service';
import { Impressao3dService } from 'src/app/services/impressao3d.service';

import { UtilsService } from 'src/app/services/utils.service';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-impressao3d',
  templateUrl: './impressao3d.component.html',
  styleUrls: ['./impressao3d.component.scss']
})
export class Impressao3dComponent implements OnInit {
  modalImpressao3d = false;
  adminSelected: User;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  impressao3dList: Impressao3d[] = [];
  impressao3dForm: FormGroup;
  submittedImpressao = false;
  subscriber: Subscription;
  impressao3d: Impressao3d = new Impressao3d();

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @HostBinding("style.--var-tamanho") tamanhoAtual: string;
  @ViewChild('myDivResposta', { static: false }) myDivResposta: ElementRef;
  @ViewChild('pedidoimpressao3d')
  pedidoimpressao3dasmodal:Pedidoimpressao3dModalComponent;
  constructor(
    private messageService: MessageService,
    private utilsService: UtilsService,
    private fileService: FileService,
    private confirmationService: ConfirmationService,
    private impressao3dservice: Impressao3dService,
  ) { }

  ngOnInit(): void {
    this.getOfertasEmprego();

    this.subscriber = this.impressao3dservice.dataTransferObservable.subscribe(str => {
      this.getOfertasEmprego();
    });

  }
  
  ngOnDestroy(): void
  {
    this.subscriber.unsubscribe();
  }
  
  openpedidoimpressao3d()
  {
    this.pedidoimpressao3dasmodal.openModalImpressao3d();
  }

  getAnexo(id: string) {
    this.fileService.getFile(id);
  }

  onLerMais(i) {
    let elem: Element = document.getElementById('myDivResposta' + i)
    this.impressao3dList[i].tamanho = elem.scrollHeight + 25 + 'px';
    if (!this.impressao3dList[i].lerMais) {
      this.impressao3dList[i].tamanho = null;
    }
    this.impressao3dList[i].lerMais = !this.impressao3dList[i].lerMais
  }

  getOfertasEmprego() {
    this.impressao3dservice.getImpressao3dList().then(data => {
      if (data) {
        this.impressao3dList = data;
        this.impressao3dList.forEach(impressao => {
          if (impressao.observacoes)
            impressao.observacoesAMostrar = this.utilsService.linkify(impressao.observacoes)
          impressao.lerMais = true
        });
      }
    }).catch(error => this.messageService.add({ severity: 'error', summary: 'Erro!', detail: error.message }));

  }

 
}
