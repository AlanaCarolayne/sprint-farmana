import { Component } from '@angular/core';
import { CriaIdeia } from '../../interfaces/cria-ideia';
import { CriarIdeiaService } from '../../services/criar-ideia.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent {
  ideias: CriaIdeia[] = [];

  constructor(private criarIdeiaService: CriarIdeiaService) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.criarIdeiaService.list().subscribe((ideias) => (this.ideias = ideias));
  }

// Controle de ações clicadas
likedIdeas: Set<string> = new Set();
sharedIdeas: Set<string> = new Set();
commentedIdeas: Set<string> = new Set();

// Toggle de Like
toggleLike(id: string): void {
  const ideia = this.ideias.find(i => i.id === id);
  if (!ideia) return;

  if (this.likedIdeas.has(id)) {
    // Já curtiu → remove
    ideia.likes = Math.max((ideia.likes || 1) - 1, 0);
    this.likedIdeas.delete(id);
  } else {
    // Ainda não curtiu → adiciona
    ideia.likes = (ideia.likes || 0) + 1;
    this.likedIdeas.add(id);
  }

  // Atualiza no backend
  this.criarIdeiaService.updateLikes(id, ideia.likes).subscribe({
    next: () => console.log('Like atualizado no backend'),
    error: err => console.error('Erro ao atualizar like', err)
  });
}

// Toggle de Share
toggleShare(id: string): void {
  const ideia = this.ideias.find(i => i.id === id);
  if (!ideia) return;

  if (this.sharedIdeas.has(id)) {
    ideia.share = Math.max((ideia.share || 1) - 1, 0);
    this.sharedIdeas.delete(id);
  } else {
    ideia.share = (ideia.share || 0) + 1;
    this.sharedIdeas.add(id);
  }

  this.criarIdeiaService.updateShares(id, ideia.share).subscribe({
    next: () => console.log('Share atualizado no backend'),
    error: err => console.error('Erro ao atualizar share', err)
  });
}

// Toggle de Comentário
toggleComment(id: string): void {
  const ideia = this.ideias.find(i => i.id === id);
  if (!ideia) return;

  if (this.commentedIdeas.has(id)) {
    ideia.comments = Math.max((ideia.comments || 1) - 1, 0);
    this.commentedIdeas.delete(id);
  } else {
    ideia.comments = (ideia.comments || 0) + 1;
    this.commentedIdeas.add(id);
  }

  this.criarIdeiaService.updateComments(id, ideia.comments).subscribe({
    next: () => console.log('Comment atualizado no backend'),
    error: err => console.error('Erro ao atualizar comment', err)
  });
}

// Funções de verificação para aplicar classe
isLiked(id: string): boolean { return this.likedIdeas.has(id); }
isShared(id: string): boolean { return this.sharedIdeas.has(id); }
isCommented(id: string): boolean { return this.commentedIdeas.has(id); }

}
