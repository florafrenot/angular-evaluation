import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ListeSalonsComponent } from '../liste-salons/liste-salons.component';
import { SalonMessageComponent } from '../salon-message/salon-message.component';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltipModule, ListeSalonsComponent, NgIf, SalonMessageComponent, MatButtonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

}
