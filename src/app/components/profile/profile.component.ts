import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ColaboradorService } from '../../services/colaborador.service';
import { CriarIdeiaService } from '../../services/criar-ideia.service';
import { Colaborador } from '../../interfaces/colaborador';
import { CriaIdeia } from '../../interfaces/cria-ideia';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  colaboradores: Colaborador[] = [];
  colaboradorPerfil?: Colaborador;
  ideias: CriaIdeia[] = [];
  loading = true;

  constructor(
    private colaboradorService: ColaboradorService,
    private criarIdeiaService: CriarIdeiaService
  ) {}

  ngOnInit(): void {
    this.listColaboradores();
    this.listIdeias();
  }

  // Carregar colaboradores
  listColaboradores(): void {
    this.colaboradorService.list().subscribe((colaboradores) => {
      this.colaboradores = colaboradores;
      this.selecionarColaboradorAleatorio();
      this.loading = false;
    });
  }

  // Carregar ideias
  listIdeias(): void {
    this.criarIdeiaService.list().subscribe((ideias) => {
      this.ideias = ideias;
    });
  }

  // Seleciona um colaborador aleatório
  selecionarColaboradorAleatorio(): void {
    if (this.colaboradores.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.colaboradores.length);
      this.colaboradorPerfil = this.colaboradores[indiceAleatorio];
    }
  }

  // Filtra ideias do colaborador
  getIdeiasDoColaborador(idColaborador: string): CriaIdeia[] {
    return this.ideias.filter((ideia) => ideia.idColaborador === idColaborador);
  }
}
