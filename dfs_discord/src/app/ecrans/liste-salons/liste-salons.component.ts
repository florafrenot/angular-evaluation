import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Salon } from '../../models/salon.type';
import { Serveur } from '../../models/serveur.type';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortHeader, MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SalonMessageComponent } from '../salon-message/salon-message.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-liste-salons',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortHeader,
    MatSort,
    MatIconModule,
    MatTooltipModule,
    SalonMessageComponent,
  ],
  templateUrl: './liste-salons.component.html',
  styleUrl: './liste-salons.component.scss'
})
export class ListeSalonsComponent {
  @Input() serveurId = '';

  listeSalon: Salon[] = [];
  listeDesMessages = false;

  messageAffiche = false;
  salonSelectionneId: string | null = null;

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.afficherSalon();
    console.log("here", this.serveurId)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['serveurId'] && this.serveurId) {
      console.log("Changement fait:", this.serveurId);
      this.afficherSalon();
    }
  }
  

  afficherSalon() {
    if (this.serveurId) {
      this.http.get<Salon[]>(`http://localhost:3000/salon/serveur/${this.serveurId}`).subscribe((salons) => {
        this.listeSalon = salons;
      });
    }
  }

}
