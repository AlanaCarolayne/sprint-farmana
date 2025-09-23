import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { CriarIdeiaService } from '../../services/criar-ideia.service';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../interfaces/colaborador';

@Component({
  selector: 'app-criar-ideia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-ideia.component.html',
  styleUrls: ['./criar-ideia.component.css'],
})
export class CriarIdeiaComponent implements OnInit {
  ideias: CriaIdeia[] = [];
  ideiaForm: FormGroup = new FormGroup({});
  colaboradorPerfil?: Colaborador;

  constructor(
    private fb: FormBuilder,
    private criarIdeiaService: CriarIdeiaService,
    private colaboradorService: ColaboradorService
  ) {
    this.ideiaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: [''],
      areaAfetada: ['', Validators.required],
      tipo: ['', Validators.required],
      recursos: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadColaboradorLogado();
    this.listIdeias();
  }

  // Carrega o colaborador logado usando o ID do localStorage
  loadColaboradorLogado(): void {
    const colaboradorId = localStorage.getItem('colaboradorId');
    if (colaboradorId) {
      this.colaboradorService.getById(colaboradorId).subscribe((col) => {
        this.colaboradorPerfil = col;
      });
    }
  }

  // Lista ideias
  listIdeias(): void {
    this.criarIdeiaService.list().subscribe((ideias) => {
      this.ideias = ideias;
    });
  }

  // Adiciona nova ideia
  add(): void {
    if (!this.ideiaForm.valid || !this.colaboradorPerfil) return;

    const formData = this.ideiaForm.value;

    const ideia: CriaIdeia = {
      id: this.generateRandomString(5),
      titulo: formData.titulo,
      descricao: formData.descricao,
      imagem: formData.imagem || undefined,
      areaAfetada: formData.areaAfetada,
      tipo: formData.tipo,
      dataHora: new Date().toISOString(),
      recursos: formData.recursos,
      idColaborador: this.colaboradorPerfil.id,
      likes: 0,
      share: 0,
      comments: 0,
    };

    this.criarIdeiaService.add(ideia).subscribe(() => {
      this.ideiaForm.reset();
      this.listIdeias(); // Atualiza a lista
    });
  }

  update(id: string): void {
    const ideia = this.ideias.find((i) => i.id === id);
    if (ideia) {
      this.ideiaForm.patchValue(ideia);
      this.criarIdeiaService.update(this.ideiaForm.value).subscribe(() => {
        this.listIdeias();
        this.ideiaForm.reset();
      });
    }
  }

  delete(id: string): void {
    this.criarIdeiaService.delete(id).subscribe(() => {
      this.listIdeias();
    });
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
