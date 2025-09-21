

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() item!:Card;
}
