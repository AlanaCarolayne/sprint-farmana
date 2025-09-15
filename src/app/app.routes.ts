import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForumComponent } from './components/forum/forum.component';
import { CriarIdeiaComponent } from './components/criar-ideia/criar-ideia.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    // {path: 'novidades', component: NovidadesComponent},
    // {path: 'perfil', component: PerfilComponent},
    // {path: 'buscar', component: BuscarComponent},
    {path: 'outras-ideias', component: ForumComponent},
    {path: 'criar-ideias', component: CriarIdeiaComponent},
    // {path: 'ranking-ideias', component: RankingComponent},

];
