export interface DesafioDoMes {
  id: string;
  titulo: string;
  descricao: string;
  itens: string[];
  imagem: string;
  tipo: 'desafioDoMes';
}
export interface IdeiaImplementada {
  titulo: string;
  problema: string;
  solucao: string;
  colaborador: string;
  imagem: string;
  tipo: 'ideiaImplementada';
}

export type NewsletterItem = DesafioDoMes | IdeiaImplementada;
