import { Component } from '@angular/core';
import { NewsletterBoxComponent } from "./newsletter-box/newsletter-box.component";
import { NewsletterItem } from '../../interfaces/newsletter';
import { NewsletterService } from '../../services/newsletter.service';
import { Colaborador } from '../../interfaces/colaborador';
import { ColaboradorService } from '../../services/colaborador.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
  imports: [NewsletterBoxComponent]
})
export class NewsletterComponent {
  noticia: NewsletterItem[] = [];
  colaborador: Colaborador[] = [];
  colaboradorDestaque?: Colaborador;   

  constructor(
    private noticiaService: NewsletterService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.list();
    this.listColaborador();
  }

  list(): void {
    this.noticiaService.list().subscribe((noticias) => (this.noticia = noticias));
  }

  listColaborador(): void {
    this.colaboradorService.list().subscribe((colaboradores) => {
      this.colaborador = colaboradores;

      if (colaboradores.length > 0) {

        const randomIndex = Math.floor(Math.random() * colaboradores.length);
        this.colaboradorDestaque = colaboradores[randomIndex];
      }
    });
  }
}
