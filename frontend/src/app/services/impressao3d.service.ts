import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Impressao3d } from '../modules/clube-robotica/models/impressao3d';
import { APIClientService } from './apiclient.service';


const IMPRESSAO3D_API = 'api/impressao3d';

@Injectable({
  providedIn: 'root'
})
export class Impressao3dService {

  constructor(private apiClient: APIClientService) { }


  private dataTransferSubject = new Subject<string>()
  dataTransferObservable = this.dataTransferSubject.asObservable();

  push(str: string) {
    this.dataTransferSubject.next(str);
  }

  getImpressao3dList(): Promise<any> {
    return this.apiClient.get(IMPRESSAO3D_API);
}
  submitimpressao3d(impressao3d: Impressao3d): Promise<any> {
    const formData = new FormData();
    Object.keys(impressao3d).forEach(key => {
        if (key != 'ficheiro3d') formData.append(key, impressao3d[key])
    });
    formData.append('ficheiro3d', impressao3d.ficheiro3d)
    return this.apiClient.post(IMPRESSAO3D_API + '/submissao', formData, {}, true);
}

}
