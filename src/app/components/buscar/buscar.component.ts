import { Component, Input, OnInit } from '@angular/core';
import { Colaborador } from '../../interfaces/colaborador';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule], // precisa importar FormsModule para ngModel
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  @Input() colaboradores: Colaborador[] = [];
  @Input() ideias: CriaIdeia[] = [];

  searchText: string = '';
  searchType: 'ideia' | 'colaborador' = 'ideia';
  filterArea: string = '';
  filterCargo: string = '';

  resultadosFiltrados: any[] = [];

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  get areasUnicas(): string[] {
    return [...new Set(this.colaboradores.map(c => c.area).filter(Boolean))];
  }

  get cargosUnicos(): string[] {
    return [...new Set(this.colaboradores.map(c => c.cargo).filter(Boolean))];
  }

  aplicarFiltros(): void {
    if (this.searchType === 'ideia') {
      this.filtrarIdeias();
    } else {
      this.filtrarColaboradores();
    }
  }

  private filtrarIdeias(): void {
    this.resultadosFiltrados = this.ideias.filter(ideia => {
      const colaborador = this.colaboradores.find(c => c.id === ideia.idColaborador);

      const matchTexto =
        !this.searchText ||
        (ideia.descricao && ideia.descricao.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (ideia.titulo && ideia.titulo.toLowerCase().includes(this.searchText.toLowerCase()));

      const matchArea = !this.filterArea || colaborador?.area === this.filterArea;
      const matchCargo = !this.filterCargo || colaborador?.cargo === this.filterCargo;

      return matchTexto && matchArea && matchCargo;
    });
  }

  private filtrarColaboradores(): void {
    this.resultadosFiltrados = this.colaboradores.filter(colab => {
      const matchTexto =
        !this.searchText ||
        (colab.nome && colab.nome.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (colab.email && colab.email.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (colab.area && colab.area.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (colab.cargo && colab.cargo.toLowerCase().includes(this.searchText.toLowerCase()));

      const matchArea = !this.filterArea || colab.area === this.filterArea;
      const matchCargo = !this.filterCargo || colab.cargo === this.filterCargo;

      return matchTexto && matchArea && matchCargo;
    });
  }
}
