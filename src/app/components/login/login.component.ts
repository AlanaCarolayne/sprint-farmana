import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../interfaces/colaborador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  erroMsg: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private colaboradorService: ColaboradorService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  entrar(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { nome, email } = this.loginForm.value;

    console.log(email, nome);
    this.colaboradorService.list().subscribe({
      next: (colaboradores: Colaborador[]) => {
        const colaborador = colaboradores.find(
          (c) =>
            c.nome.toLowerCase() === nome.toLowerCase() &&
            c.email.toLowerCase() === email.toLowerCase()
        );

        if (colaborador) {
          localStorage.setItem('colaboradorId', colaborador.id);

          this.router.navigate(['/perfil']);
        } else {
          this.erroMsg = 'Colaborador não encontrado. Verifique os dados.';
        }
        this.loading = false;
      },
      error: () => {
        this.erroMsg = 'Erro ao buscar colaboradores.';
        this.loading = false;
      },
    });
  }
}
