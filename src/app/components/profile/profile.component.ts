import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ColaboradorService } from '../../services/colaborador.service';
import { CriarIdeiaService } from '../../services/criar-ideia.service';
import { Colaborador } from '../../interfaces/colaborador';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { TreinamentoCarrossel } from '../../interfaces/treinamento';
import { TreinamentoService } from '../../services/treinamento.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  colaboradorPerfil?: Colaborador;
  ideias: CriaIdeia[] = [];
  loading = true;
  treinamentos: TreinamentoCarrossel[] = [];
  colaboradorId: string | null = null; 
  constructor(
    private colaboradorService: ColaboradorService,
    private criarIdeiaService: CriarIdeiaService,
    private treinamentoService: TreinamentoService
  ) {}

ngOnInit(): void {
  this.colaboradorId = localStorage.getItem('colaboradorId');

  if (!this.colaboradorId) {
    console.log('Nenhum colaborador logado');
    this.loading = false;
    return;
  }

  // Carrega apenas o colaborador logado
  this.colaboradorService.list().subscribe({
    next: (colabs) => {
      const colab = colabs.find(c => c.id === this.colaboradorId);
      if (colab) {
        this.colaboradorPerfil = colab;
      }
      this.loading = false;
    },
    error: () => (this.loading = false)
  });

  // Carrega todas as ideias
  this.criarIdeiaService.list().subscribe({
    next: (ideas) => {
      this.ideias = ideas;
    },
    error: () => (this.loading = false),
  });

  // Carrega todos os treinamentos e filtra pelo colaborador logado
  this.listTreinamentos();
}


  selecionarColaborador(id: string): void {
    const colab = this.colaboradores.find((c) => c.id === id);
    if (colab) {
      this.colaboradorPerfil = colab;
      this.loading = false;
    }
  }
  listTreinamentos(): void {
    this.treinamentoService.list().subscribe((treinamentos) => {
      this.treinamentos = treinamentos;
    });
  }
  getTreinamentosDoColaborador(idColaborador: string): TreinamentoCarrossel[] {
    return this.treinamentos.filter(
      (t) => t.confirmado && t.idColaborador === idColaborador
    );
  }

  getIdeiasDoColaborador(idColaborador: string): CriaIdeia[] {
    return this.ideias.filter((ideia) => ideia.idColaborador === idColaborador);
  }
}
