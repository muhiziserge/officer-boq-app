import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from '../../models/application.model';
import { BoqItem, PanelMode } from '../../models/boq-item.model';
import { ApplicationSummaryComponent } from '../application-summary/application-summary.component';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { DiscardConfirmModalComponent } from '../discard-confirm-modal/discard-confirm-modal.component';

@Component({
  selector: 'app-escalate-drawer',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ApplicationSummaryComponent, DeleteConfirmModalComponent, DiscardConfirmModalComponent
  ],
  templateUrl: './escalate-drawer.component.html',
  styleUrl: './escalate-drawer.component.scss'
})
export class EscalateDrawerComponent {
  @Input({ required: true }) application!: Application;
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  // Panel state
  panelMode = signal<PanelMode>('escalate');
  summaryExpanded = signal(false);

  // BOQ state
  boqItems = signal<BoqItem[]>([]);
  editingItem = signal<BoqItem | null>(null);
  deletingItem = signal<BoqItem | null>(null);

  // Modal state
  showDeleteModal = signal(false);
  showDiscardModal = signal(false);

  // Technician field
  technicianPlumber = '';

  // Item form
  itemForm: FormGroup = this.fb.group({
    name:             ['', Validators.required],
    description:      ['', Validators.required],
    unit:             ['', Validators.required],
    quantity:         [null, [Validators.required, Validators.min(1)]],
    responsibleParty: ['', Validators.required],
  });

  responsiblePartyOptions = ['WASAC', 'Private contractor', 'Municipality', 'Government'];

  // Computed
  isAddMode = computed(() => this.panelMode() === 'add-item');
  isEditMode = computed(() => this.panelMode() === 'edit-item');
  isDetailsMode = computed(() => this.panelMode() === 'application-details');
  hasItems = computed(() => this.boqItems().length > 0);

  // --- Panel mode actions ---
  openAddItem() {
    this.itemForm.reset();
    this.panelMode.set('add-item');
  }

  cancelItemForm() {
    if (this.isEditMode() && this.itemForm.dirty) {
      this.showDiscardModal.set(true);
    } else {
      this.panelMode.set('escalate');
      this.itemForm.reset();
      this.editingItem.set(null);
    }
  }

  submitAddItem() {
    if (this.itemForm.invalid) { this.itemForm.markAllAsTouched(); return; }
    const v = this.itemForm.value;
    const newItem: BoqItem = {
      id: Date.now().toString(),
      name: v.name,
      description: v.description,
      unit: v.unit,
      quantity: v.quantity,
      responsibleParty: v.responsibleParty,
    };
    this.boqItems.update(items => [...items, newItem]);
    this.itemForm.reset();
    this.panelMode.set('escalate');
  }

  // --- Edit ---
  startEdit(item: BoqItem) {
    this.editingItem.set(item);
    this.itemForm.patchValue({
      name: item.name,
      description: item.description,
      unit: item.unit,
      quantity: item.quantity,
      responsibleParty: item.responsibleParty,
    });
    this.itemForm.markAsPristine();
    this.panelMode.set('edit-item');
  }

  saveEdit() {
    if (this.itemForm.invalid) { this.itemForm.markAllAsTouched(); return; }
    const v = this.itemForm.value;
    this.boqItems.update(items =>
      items.map(i => i.id === this.editingItem()!.id
        ? { ...i, name: v.name, description: v.description, unit: v.unit, quantity: v.quantity, responsibleParty: v.responsibleParty }
        : i
      )
    );
    this.editingItem.set(null);
    this.panelMode.set('escalate');
  }

  // --- Delete ---
  requestDelete(item: BoqItem) {
    this.deletingItem.set(item);
    this.showDeleteModal.set(true);
  }

  confirmDelete() {
    this.boqItems.update(items => items.filter(i => i.id !== this.deletingItem()!.id));
    this.deletingItem.set(null);
    this.showDeleteModal.set(false);
    if (this.isEditMode()) { this.panelMode.set('escalate'); }
  }

  cancelDelete() {
    this.deletingItem.set(null);
    this.showDeleteModal.set(false);
  }

  // --- Discard changes ---
  confirmDiscard() {
    this.showDiscardModal.set(false);
    this.itemForm.reset();
    this.editingItem.set(null);
    this.panelMode.set('escalate');
  }

  cancelDiscard() {
    this.showDiscardModal.set(false);
  }

  // --- Application details ---
  toggleSummary() {
    this.summaryExpanded.update(v => !v);
  }

  // --- Main actions ---
  onEscalate() {
    console.log('Escalate', { technician: this.technicianPlumber, items: this.boqItems() });
  }

  onClose() {
    this.close.emit();
  }
}
