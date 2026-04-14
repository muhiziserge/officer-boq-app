import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discard-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discard-confirm-modal.component.html',
  styleUrl: './discard-confirm-modal.component.scss'
})
export class DiscardConfirmModalComponent {
  @Input({ required: true }) itemName!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
