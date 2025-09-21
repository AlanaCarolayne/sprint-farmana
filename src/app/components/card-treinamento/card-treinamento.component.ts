import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-card-treinamento',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-treinamento.component.html',
  styleUrl: './card-treinamento.component.css'
})
export class CardTreinamentoComponent {
 @Input() item!:Card;
}
