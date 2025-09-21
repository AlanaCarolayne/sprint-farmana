import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardTreinamentoComponent } from "../card-treinamento/card-treinamento.component";

@Component({
  selector: 'app-side-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardTreinamentoComponent],
  templateUrl: './side-container.component.html',
  styleUrl: './side-container.component.css',
})
export class SideContainerComponent {
  cards: Card[] = [];

  constructor(private cardService: CardService) {}
  ngOnInit() {
    this.listCard();
  }
    listCard(): void {
    this.cardService.list().subscribe((cards) => {
      this.cards = cards;
    });
  }
}
