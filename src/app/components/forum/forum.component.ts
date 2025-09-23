import { Component } from '@angular/core';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { CriarIdeiaService } from '../../services/criar-ideia.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../interfaces/colaborador';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent {
  ideias: CriaIdeia[] = [];
  colaboradores: Colaborador[] = [];

  ideiasFiltradas: CriaIdeia[] = [];
  areasUnicas: string[] = [];
  tiposUnicos: string[] = [];

  filtroArea: string = '';
  filtroTipo: string = '';

  colaboradorMap: Record<string, Colaborador> = {};
  constructor(
    private criarIdeiaService: CriarIdeiaService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.list();
    this.listColaboradores();
  }

  list(): void {
    this.criarIdeiaService.list().subscribe((ideias) => {
      this.ideias = ideias;
      this.ideiasFiltradas = [...ideias]; // inicializa sem filtro
      this.areasUnicas = [...new Set(ideias.map((i) => i.areaAfetada))];
      this.tiposUnicos = [...new Set(ideias.map((i) => i.tipo))];
    });
  }

  listColaboradores(): void {
    this.colaboradorService.list().subscribe((colabs) => {
      this.colaboradores = colabs;
      this.buildColaboradorMap();
    });
  }

  private buildColaboradorMap(): void {
    this.colaboradorMap = this.colaboradores.reduce((acc, c) => {
      acc[String(c.id)] = c;
      return acc;
    }, {} as Record<string, Colaborador>);
  }

  getColaborador(idColaborador: string | number): Colaborador | undefined {
    return this.colaboradorMap[String(idColaborador)];
  }

  aplicarFiltros(): void {
    this.ideiasFiltradas = this.ideias.filter((i) => {
      const matchArea =
        !this.filtroArea ||
        i.areaAfetada.toLowerCase().includes(this.filtroArea.toLowerCase());

      const matchTipo =
        !this.filtroTipo ||
        i.tipo.toLowerCase().includes(this.filtroTipo.toLowerCase());

      return matchArea && matchTipo;
    });
  }

  likedIdeas: Set<string> = new Set();
  sharedIdeas: Set<string> = new Set();
  commentedIdeas: Set<string> = new Set();

  toggleLike(id: string): void {
    const ideia = this.ideias.find((i) => i.id === id);
    if (!ideia) return;

    if (this.likedIdeas.has(id)) {
      ideia.likes = Math.max((ideia.likes || 1) - 1, 0);
      this.likedIdeas.delete(id);
    } else {
      ideia.likes = (ideia.likes || 0) + 1;
      this.likedIdeas.add(id);
    }
    this.criarIdeiaService.updateLikes(id, ideia.likes).subscribe();
  }

  toggleShare(id: string): void {
    const ideia = this.ideias.find((i) => i.id === id);
    if (!ideia) return;

    if (this.sharedIdeas.has(id)) {
      ideia.share = Math.max((ideia.share || 1) - 1, 0);
      this.sharedIdeas.delete(id);
    } else {
      ideia.share = (ideia.share || 0) + 1;
      this.sharedIdeas.add(id);
    }
    this.criarIdeiaService.updateShares(id, ideia.share).subscribe();
  }

  toggleComment(id: string): void {
    const ideia = this.ideias.find((i) => i.id === id);
    if (!ideia) return;

    if (this.commentedIdeas.has(id)) {
      ideia.comments = Math.max((ideia.comments || 1) - 1, 0);
      this.commentedIdeas.delete(id);
    } else {
      ideia.comments = (ideia.comments || 0) + 1;
      this.commentedIdeas.add(id);
    }
    this.criarIdeiaService.updateComments(id, ideia.comments).subscribe();
  }

  isLiked(id: string): boolean {
    return this.likedIdeas.has(id);
  }
  isShared(id: string): boolean {
    return this.sharedIdeas.has(id);
  }
  isCommented(id: string): boolean {
    return this.commentedIdeas.has(id);
  }
}
