import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../interfaces/colaborador';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  loading = false;
  sucesso = false;
  erroMsg = '';

  constructor(
    private fb: FormBuilder,
    private colaboradorService: ColaboradorService
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      departamento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      foto: [''],
      tempo: [0, [Validators.required, Validators.min(0)]],
      area: ['', Validators.required],
      cargo: ['', Validators.required],
      unidade: ['', Validators.required],
    });
  }

  cadastrarColaborador(): void {
    if (this.cadastroForm.invalid) return;

    this.loading = true;
    const novoColaborador: Colaborador = this.cadastroForm.value;

    this.colaboradorService.add(novoColaborador).subscribe({
      next: () => {
        this.sucesso = true;
        this.cadastroForm.reset({ pontos: '0', tempo: 0 });
        this.loading = false;
      },
      error: (err) => {
        this.erroMsg = 'Erro ao cadastrar colaborador.';
        console.error(err);
        this.loading = false;
      },
    });
  }
}
