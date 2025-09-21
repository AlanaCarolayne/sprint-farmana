import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForumComponent } from './components/forum/forum.component';
import { CriarIdeiaComponent } from './components/criar-ideia/criar-ideia.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { TreinamentoComponent } from './components/treinamento/treinamento.component';
import { BuscarComponent } from './components/buscar/buscar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'newsletter', component: NewsletterComponent },
  {path: 'buscar', component: BuscarComponent},
  { path: 'outras-ideias', component: ForumComponent },
  { path: 'criar-ideias', component: CriarIdeiaComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'treinamentos', component: TreinamentoComponent },
];
