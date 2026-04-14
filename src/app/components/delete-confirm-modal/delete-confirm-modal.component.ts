import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.scss'
})
export class DeleteConfirmModalComponent {
  @Input({ required: true }) itemName!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
