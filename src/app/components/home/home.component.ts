import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { SideContainerComponent } from "../side-container/side-container.component";
import { CardHorizontalComponent } from '../card-horizontal/card-horizontal.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, SideContainerComponent, CardHorizontalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
