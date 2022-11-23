import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileService } from 'src/app/services/file.service';
import { Impressao3dService } from 'src/app/services/impressao3d.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Impressao3d } from '../../models/impressao3d';
import { PoliticaPrivacidadeAsModalComponent } from '../politica-privacidade/politica-privacidade-as-modal/politica-privacidade-as-modal.component';

@Component({
  selector: 're-pedidoimpressao3d-modal',
  templateUrl: './pedidoimpressao3d-modal.component.html',
  styleUrls: ['./pedidoimpressao3d-modal.component.scss']
})
export class Pedidoimpressao3dModalComponent implements OnInit {
  modalImpressao3dform = false;
  isSuccessful = false;
  errorMessage = '';
  Impressao3dForm: FormGroup;
  submittedImpressao = false;
  opcoespagamento = ['Caixa','MBway'];
  impressao3d: Impressao3d = new Impressao3d();
  @ViewChild('politicaPrivacidade')
  politicaPrivacidadeAsModal: PoliticaPrivacidadeAsModalComponent;
  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(
    private messageService: MessageService,
    private fileService: FileService,
    private impressao3dformservice: Impressao3dService,
  ) {}

  ngOnInit(): void {
    this.Impressao3dForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      telemovel: new FormControl(null, Validators.required),
      metodopagamento: new FormControl(null, Validators.required),
      termos: new FormControl(null, Validators.requiredTrue),
      ficheiro3d: new FormControl(null, null),
      observacoes: new FormControl(null, null),
    });
  }
  getAnexo(id: string) {
    this.fileService.getFile(id);
  }

  openModalImpressao3d(): void {
    this.impressao3d = new Impressao3d();
    this.modalImpressao3dform = true;
  }

  closeModalImpressao3d() {
    this.modalImpressao3dform = false;
    this.Impressao3dForm.reset();
    this.submittedImpressao = false;
  }

  openTermos(): void {
    this.politicaPrivacidadeAsModal.open();
  }

 
   
  guardarModalImpressao3d(): void {
    this.submittedImpressao = true;
    this.Impressao3dForm.markAllAsTouched();
    this.messageService.clear();
    if (this.Impressao3dForm.valid) {

      if (!this.impressao3d.ficheiro3d) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'O ficheiro em formato .stl é de caráter obrigatório.',
        });
        return;
      }
      this.impressao3dformservice.submitimpressao3d(this.impressao3d).then(data => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'O seu pedido de impressão 3d foi enviado. Verifique o seu email.', });
        this.impressao3d = new Impressao3d();
        this.closeModalImpressao3d();
        this.impressao3dformservice.push("Just do it!");

      }).catch(error => {
        if (error.message) {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: error.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Houve um problema ao enviar o seu pedido de impressão 3d. Por favor contacto-nos a partir dos contactos disponíveis.' });
        }
      }).finally(() => this.submittedImpressao = false);
    }
  }




  handleFileInput(event:any): void {
    this.impressao3d.ficheiro3d = event.target.files.item(0);
    event.target.value = null;
  }

  removeFile() {
    this.impressao3d.ficheiro3d = null;
    this.fileUpload.nativeElement.files = null;
  }
}
