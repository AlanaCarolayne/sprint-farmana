import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Colaborador } from '../../interfaces/colaborador';
import { ColaboradorService } from '../../services/colaborador.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css',
})
export class RankingComponent {
  colaborador: Colaborador[] = [];

  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.list();
  }
 list(): void {
  this.colaboradorService.list().subscribe((colaborador) => {
    this.colaborador = colaborador.sort((a, b) => +b.pontos - +a.pontos);
  });
}

}
