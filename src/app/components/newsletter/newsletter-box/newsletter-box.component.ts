import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewsletterItem } from '../../../interfaces/newsletter';
import { Colaborador } from '../../../interfaces/colaborador';
import { ColaboradorService } from '../../../services/colaborador.service';

@Component({
  selector: 'app-newsletter-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter-box.component.html',
  styleUrls: ['./newsletter-box.component.css'],
})
export class NewsletterBoxComponent {
  @Input() item!: NewsletterItem;

  colaboradores: Colaborador[] = [];   // ✅ nome no plural para clareza
  
  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.colaboradorService
      .list()
      .subscribe((colabs) => (this.colaboradores = colabs));
  }

  getNomeColaborador(id: string): string {
    const c = this.colaboradores.find(cola => cola.id === id);
    return c ? c.nome : '';
  }
}
