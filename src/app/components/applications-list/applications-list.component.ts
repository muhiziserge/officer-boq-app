import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application } from '../../models/application.model';
import { AppDetailsDrawerComponent } from '../app-details-drawer/app-details-drawer.component';
import { EscalateDrawerComponent } from '../escalate-drawer/escalate-drawer.component';

type DrawerMode = 'details' | 'escalate' | null;

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AppDetailsDrawerComponent, EscalateDrawerComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss'
})
export class ApplicationsListComponent {
  searchQuery = 'A54567899';
  selectedOffice = 'Office: Kigali';
  selectedService = 'Any Service';
  fromDate = '';
  toDate = '';
  currentPage = 1;
  totalPages = 10;

  drawerMode = signal<DrawerMode>(null);
  selectedApplication = signal<Application | null>(null);

  applications: Application[] = [
    {
      id: 'A54567899', service: 'Water connection request', applicant: 'Muhire James',
      dateSubmitted: '12 Nov, 12:30', office: 'Gasabo', processingDeadline: '28 Nov, 12:30',
      isOverdue: true, status: 'pending_processing',
      details: {
        personalDetails: { nationalId: '119907001221123', name: 'Olivia Ishimwe' },
        residenceDetails: { district: 'District', sector: 'Kagarama' },
        birthInformation: { countryOfBirth: 'Nigeria', cityOfBirth: 'Lagos', dateOfBirth: '05/10/1998' },
        passportDetails: { passportType: 'Ordinary passport', passportValidity: '5 years', purposeOfTravel: 'Conference', destinationCountry: 'Nigeria', destinationCity: 'Lagos' },
        attachments: [{ name: 'Equivalance.PDF', size: '8 MB' }, { name: 'Equivalance.PDF', size: '8 MB' }, { name: 'Equivalance.PDF', size: '8 MB' }]
      }
    },
    {
      id: 'A54567899', service: 'Water connection request', applicant: 'Muhire James',
      dateSubmitted: '12 Nov, 10:10', office: 'Nyarugenge', processingDeadline: '28 Nov, 12:30',
      isOverdue: true, status: 'pending_processing', details: undefined
    },
    {
      id: 'A54567899', service: 'Water connection request', applicant: 'Muhire James',
      dateSubmitted: '11 Nov, 12:11', office: 'Gasabo', processingDeadline: '28 Nov, 12:30',
      isOverdue: true, status: 'pending_processing', details: undefined
    },
    {
      id: 'A54567899', service: 'Water connection request', applicant: 'Muhire James',
      dateSubmitted: '10 Nov, 14:25', office: 'Nyarugenge', processingDeadline: '28 Nov, 12:30',
      isOverdue: false, status: 'pending_processing', details: undefined
    },
    {
      id: 'A54567899', service: 'Water connection request', applicant: 'Muhire James',
      dateSubmitted: '10 Nov, 9:12', office: 'Gasabo', processingDeadline: '28 Nov, 12:30',
      isOverdue: false, status: 'pending_processing', details: undefined
    },
  ];

  // Step 1: Review → open details drawer
  openDetails(app: Application) {
    this.selectedApplication.set(app);
    this.drawerMode.set('details');
  }

  // Step 2: Escalate from details → switch to escalate drawer
  openEscalate() {
    this.drawerMode.set('escalate');
  }

  closeDrawer() {
    this.drawerMode.set(null);
    this.selectedApplication.set(null);
  }

  onSearch() { /* wire to API */ }

  get prevDisabled() { return this.currentPage <= 1; }
  get nextDisabled() { return this.currentPage >= this.totalPages; }
  prevPage() { if (!this.prevDisabled) this.currentPage--; }
  nextPage() { if (!this.nextDisabled) this.currentPage++; }
}
