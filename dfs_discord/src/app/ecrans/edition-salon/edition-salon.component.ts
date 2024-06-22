import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortHeader, MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Salon } from '../../models/salon.type';

@Component({
  selector: 'app-edition-salon',
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
  templateUrl: './edition-salon.component.html',
  styleUrl: './edition-salon.component.scss'
})
export class EditionSalonComponent {
  
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  route: ActivatedRoute = inject(ActivatedRoute);


  dataSource: any;
  
  serveurId: string | null = null;

  @ViewChild(MatSort) sort?: MatSort;



  ngOnInit() {
    //Je récupère lid du serveur via le paramètre de l'url
    this.serveurId = this.route.snapshot.paramMap.get('serveurId');
    console.log("ID du serveur récupéré:", this.serveurId);

    const jwt = localStorage.getItem('jwt');
  
    if (jwt) {
      this.http
        .get<Salon[]>(`http://localhost:3000/salon/serveur/${this.serveurId}`)
        .subscribe((listeSalon) => {
          this.dataSource = new MatTableDataSource(listeSalon);
  
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        });
    }
  }

  formulaire: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(150)]],
    urlImage: ['', [Validators.required]],
  });

  onAjoutSalon() {
    console.log("serveur id", this.serveurId);
    if (this.formulaire.valid && this.serveurId) {
      this.http
        .post(`http://localhost:3000/salon/${this.serveurId}/creer`, this.formulaire.value)
        .subscribe((nouveauSalon) => {
          this.snackBar.open('Le salon a bien été ajouté', undefined, {
            duration: 3000,
          });

          this.router.navigateByUrl('/principal');
        });
    }
  }
}
