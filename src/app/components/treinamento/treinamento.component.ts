import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreinamentoCarrossel } from '../../interfaces/treinamento';
import { TreinamentoService } from '../../services/treinamento.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-treinamento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './treinamento.component.html',
  styleUrls: ['./treinamento.component.css'],
})
export class TreinamentoComponent {
  treinamentos: TreinamentoCarrossel[] = [];
  cards: Card[] = [];
  colaboradorId: string | null = null; 

  constructor(
    private treinamentoService: TreinamentoService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    
    this.colaboradorId = localStorage.getItem('colaboradorId');
    if (this.colaboradorId) {
      console.log('ID do colaborador logado:', this.colaboradorId);
    } else {
      console.log('Nenhum colaborador logado');
    }

    this.listTreinamentos();
    this.listCard();
  }

  listTreinamentos(): void {
    this.treinamentoService.list().subscribe((treinamentos) => {
      // inicializa o campo "confirmado" como false se não existir
      this.treinamentos = treinamentos.map((t) => ({
        ...t,
        confirmado: t.confirmado || false,
      }));
    });
  }

  confirmarPresenca(treinamento: TreinamentoCarrossel) {
    if (!this.colaboradorId) return;

    treinamento.confirmado = true;
    treinamento.idColaborador = this.colaboradorId;

    this.treinamentoService.update(treinamento.id, treinamento).subscribe({
      next: () => {
        console.log(
          `Treinamento ${treinamento.titulo} confirmado para ${this.colaboradorId}`
        );
      },
      error: (err) => console.error(err),
    });
  }

  listCard(): void {
    this.cardService.list().subscribe((cards) => {
      this.cards = cards;
    });
  }
}
