import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortHeader, MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-utilisateurs',
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
  ],
  templateUrl: './liste-utilisateurs.component.html',
  styleUrl: './liste-utilisateurs.component.scss'
})
export class ListeUtilisateursComponent {

  dataSource: any;
  displayedColumns: string[] = ['position', 'email', 'pseudo', 'actions'];
  http: HttpClient = inject(HttpClient);
  serveurId: string | null = null;
  // utilisateurEstProprietaire = false;
  
  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.listeUtilisateursServeur();
  }

  listeUtilisateursServeur() {
    this.serveurId = this.route.snapshot.paramMap.get('serveurId'); 
    this.http.get<any[]>(`http://localhost:3000/serveur/${this.serveurId}/utilisateurs`)
      .subscribe((data: any[]) => {
        this.dataSource = data.map((utilisateur, index) => ({
          position: index + 1,
          email: utilisateur.email
        }));
      });
  }
  

  bloquerUtilisateur() {
    console.log('ok')
  }
}
