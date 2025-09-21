import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card';
import { CardComponent } from '../card/card.component';
import { CardHorizontalComponent } from '../card-horizontal/card-horizontal.component';
import { SideContainerComponent } from '../side-container/side-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    SideContainerComponent,
    CardHorizontalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
