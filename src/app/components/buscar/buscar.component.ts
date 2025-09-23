import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Colaborador } from '../../interfaces/colaborador';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CriarIdeiaService } from '../../services/criar-ideia.service';
import { ColaboradorService } from '../../services/colaborador.service';
declare var bootstrap: any;
@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit, OnChanges {
  @Input() colaboradores: Colaborador[] = [];
  @Input() ideias: CriaIdeia[] = [];

  searchText: string = '';
  searchType: 'ideia' | 'colaborador' = 'ideia';
  filterArea: string = '';
  filterCargo: string = '';

  resultadosIdeias: CriaIdeia[] = [];
  resultadosColaboradores: Colaborador[] = [];
  modalData: any = null;
  modalTipo: 'ideia' | 'colaborador' = 'ideia';
  infoModal: any;
  constructor(
    private criarIdeiaService: CriarIdeiaService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.listColaboradores();
    this.listIdeias();

    const modalElement = document.getElementById('infoModal');
    this.infoModal = new bootstrap.Modal(modalElement, {
      keyboard: false,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colaboradores'] || changes['ideias']) {
      this.aplicarFiltros();
    }
  }

  listIdeias(): void {
    this.criarIdeiaService.list().subscribe((ideias) => {
      this.ideias = ideias;
      this.aplicarFiltros();
    });
  }

  listColaboradores(): void {
    this.colaboradorService.list().subscribe((colabs) => {
      this.colaboradores = colabs;
      this.aplicarFiltros();
    });
  }
  abrirModal(tipo: 'ideia' | 'colaborador', data: any): void {
    this.modalTipo = tipo;
    this.modalData = data;
    this.infoModal.show();
  }
  get areasUnicas(): string[] {
    return [...new Set(this.colaboradores.map((c) => c.area).filter(Boolean))];
  }

  get cargosUnicos(): string[] {
    return [...new Set(this.colaboradores.map((c) => c.cargo).filter(Boolean))];
  }

  aplicarFiltros(): void {
    if (this.searchType === 'ideia') {
      this.filtrarIdeias();
      this.resultadosColaboradores = [];
    } else {
      this.filtrarColaboradores();
      this.resultadosIdeias = [];
    }
  }

  private filtrarIdeias(): void {
    this.resultadosIdeias = this.ideias
      .map((ideia) => {
        const colaborador = this.colaboradores.find(
          (c) => c.id === ideia.idColaborador
        );
        return {
          ...ideia,
          colaboradorNome: colaborador?.nome || 'Desconhecido',
          colaboradorArea: colaborador?.area || 'Não informada',
          colaboradorCargo: colaborador?.cargo || 'Não informada',
        };
      })
      .filter((ideia) => {
        const matchTexto =
          !this.searchText ||
          (ideia.titulo
            ?.toLowerCase()
            .includes(this.searchText.toLowerCase()) ??
            false) ||
          (ideia.descricao
            ?.toLowerCase()
            .includes(this.searchText.toLowerCase()) ??
            false);

        const matchArea =
          !this.filterArea || ideia.colaboradorArea === this.filterArea;
        const matchCargo =
          !this.filterCargo || ideia.colaboradorCargo === this.filterCargo;

        return matchTexto && matchArea && matchCargo;
      });
  }

  private filtrarColaboradores(): void {
    this.resultadosColaboradores = this.colaboradores.filter((colab) => {
      const matchTexto =
        !this.searchText ||
        colab.nome?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        colab.email?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        colab.area?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        colab.cargo?.toLowerCase().includes(this.searchText.toLowerCase());
      const matchArea = !this.filterArea || colab.area === this.filterArea;
      const matchCargo = !this.filterCargo || colab.cargo === this.filterCargo;
      return matchTexto && matchArea && matchCargo;
    });
  }
}
