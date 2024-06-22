import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, SimpleChange, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortHeader, MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Message } from '../../models/message.type';
import { Utilisateur } from '../../models/utilisateur';
import { MatIcon } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-salon-message',
  standalone: true,
  imports: [
    MatInputModule,
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
    MatIcon,
    MatDividerModule,
    NgClass
  ],
  templateUrl: './salon-message.component.html',
  styleUrl: './salon-message.component.scss'
})

export class SalonMessageComponent {
  @Input() salonId: string | null = null;

  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  route: ActivatedRoute = inject(ActivatedRoute);

  utilisateurId: string | null = null;

  listeMessages: any[] = [];


  //formulaire pour envoyer un message
  formulaire: FormGroup = this.formBuilder.group({
    contenu: ['', [Validators.required, Validators.minLength(1)]],
  });

  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {
    this.salonId = this.route.snapshot.paramMap.get('salonId');
    console.log("ID du salon récupéré:", this.salonId);

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.http
        .get<Message[]>(`http://localhost:3000/message/${this.salonId}`).subscribe((message => {
          this.listeMessages = message;
        }))
    }
    this.getUserById();
  }

  onAjoutMessage() {
    // console.log("Valeur du formulaire:", this.formulaire.value);
    // console.log("L'id du salon est: ", this.salonId);
    // console.log("L'id de l'utilisateur est: ", this.utilisateurId);

    if (this.formulaire.valid && this.salonId && this.utilisateurId) {
      const message = {
        contenu: this.formulaire.value.contenu,
        utilisateurId: this.utilisateurId,
        salonId: this.salonId
      };
      // console.log(message);

      this.http.post<Message>(`http://localhost:3000/message/${this.salonId}`, message).subscribe(
        (nouveauMessage) => {
          this.snackBar.open('Le message a bien été ajouté', undefined, {
            duration: 3000,
          });
          this.listeMessages.push(nouveauMessage);
          this.formulaire.reset();
        },
        error => {
          console.error('Erreur lors de l\'ajout du message:', error);
        }
      );
    }
  }

  // récupérer l'id de l'utilisateur en cours
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

  isBlue(utilisateurId: number): boolean {
    return utilisateurId % 2 === 0; 
  }


  
}
