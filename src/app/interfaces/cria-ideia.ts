export interface CriaIdeia {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  areaAfetada: string;
  tipo: string;
  dataHora?: string;
  recursos: string;
  idColaborador: string;
  likes: number;
  share: number;
  comments: number;
}
