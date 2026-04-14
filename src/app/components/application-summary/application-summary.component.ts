import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-summary.component.html',
  styleUrl: './application-summary.component.scss'
})
export class ApplicationSummaryComponent {
  @Input({ required: true }) application!: Application;
  @Input() expanded = false;
  @Output() toggleExpand = new EventEmitter<void>();
}
