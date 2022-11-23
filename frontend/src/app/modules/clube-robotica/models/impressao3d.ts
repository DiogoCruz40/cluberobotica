export class Impressao3d {
    idImpressao: string;
    nome: string;
    email: string;
    telemovel: number;
    observacoes: string;
    observacoesAMostrar: string;
    metodopagamento: string;
    ficheiro3d: File;
    tamanho: string;
    lerMais = true;
    estado:string;
    anexos: any[];
  constructor() {
    this.anexos = [];
    this.lerMais = true;
  }
}
