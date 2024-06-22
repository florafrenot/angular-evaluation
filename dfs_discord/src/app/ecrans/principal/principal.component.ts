import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Serveur } from '../../models/serveur.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListeSalonsComponent } from '../liste-salons/liste-salons.component';
import { NgIf } from '@angular/common';
import { SalonMessageComponent } from '../salon-message/salon-message.component';
import { Utilisateur } from '../../models/utilisateur';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltipModule, ListeSalonsComponent, NgIf, SalonMessageComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {

  http: HttpClient = inject(HttpClient);
  listeServeur: Serveur[] = [];

  salonAffichage = false;
  selectionneServeurId: string | null = null;
  utilisateurId: string | null = null;



  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Serveur[]>('http://localhost:3000/serveur/possede')
        .subscribe((listeServeur) => (this.listeServeur = listeServeur));
    }
    this.getUserById();
  }

  afficherSalons(serveurId: string) {
    this.salonAffichage = true;
    this.selectionneServeurId = serveurId;
  }

  getUserById() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      });

      this.http.get<Utilisateur>('http://localhost:3000/utilisateur', { headers })
        .subscribe(
          (data) => {
            if (data && data._id) {
              this.utilisateurId = data._id;
            } else {
              console.error('Réponse utilisateur invalide:', data);
            }
          },
          error => {
            console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
          }
        );
    } else {
      console.error('Token JWT introuvable.');
    }
  }
}
