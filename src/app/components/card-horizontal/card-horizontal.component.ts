import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-horizontal',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-horizontal.component.html',
  styleUrl: './card-horizontal.component.css'
})
export class CardHorizontalComponent {
  @Input() item!:Card;
}
