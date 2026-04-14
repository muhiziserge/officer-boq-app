import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-details-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-details-drawer.component.html',
  styleUrl: './app-details-drawer.component.scss'
})
export class AppDetailsDrawerComponent {
  @Input({ required: true }) application!: Application;
  @Output() close = new EventEmitter<void>();
  @Output() escalate = new EventEmitter<void>();

  moreActionsOpen = false;
}
