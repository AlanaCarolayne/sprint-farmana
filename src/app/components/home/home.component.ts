import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { SideContainerComponent } from "../side-container/side-container.component";

@Component({
  selector: 'app-home',
  imports: [CardComponent, SideContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
