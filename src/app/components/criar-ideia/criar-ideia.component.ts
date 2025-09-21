import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { CriarIdeiaService } from '../../services/criar-ideia.service';

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

  constructor(
    private fb: FormBuilder,
    private criarIdeiaService: CriarIdeiaService
  ) {
    this.ideiaForm = this.fb.group({
      id: [''],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: [''],
      areaAfetada: ['', Validators.required],
      tipo: ['', Validators.required],
      dataHora: [''],
      recursos: ['', Validators.required],
      idColaborador: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.list();
  }

  // 🔹 Listar ideias
  list(): void {
    this.criarIdeiaService.list().subscribe((ideias) => (this.ideias = ideias));
  }

  // 🔹 Adicionar nova ideia
  add(): void {
    if (this.ideiaForm.valid) {
      const formData = this.ideiaForm.value;
      const ideia: CriaIdeia = {
        id: this.generateRandomString(5),
        titulo: formData.titulo,
        descricao: formData.descricao,
        imagem: formData.imagem || undefined,
        areaAfetada: formData.areaAfetada,
        tipo: formData.tipo,
        dataHora: new Date().toISOString(), // set current date/time as ISO string
        recursos: formData.recursos,
        idColaborador: formData.idColaborador,
        likes: 0,
        share: 0,
        comments:0
      };
      this.criarIdeiaService.add(ideia).subscribe(() => {
        this.ideiaForm.reset();
      });
    }
  }

  update(id: string): void {
    const ideia = this.ideias.find((i) => i.id === id);
    if (ideia) {
      this.ideiaForm.patchValue(ideia);
      this.criarIdeiaService.update(this.ideiaForm.value).subscribe(() => {
        this.list();
        this.ideiaForm.reset();
      });
    }
  }


  delete(id: string): void {
    this.criarIdeiaService.delete(id).subscribe(() => {
      this.list();
    });
  }
  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
