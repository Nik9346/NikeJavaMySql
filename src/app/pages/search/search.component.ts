import { Component } from '@angular/core';
import { IShoes } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent {
  shoes: IShoes[] = []
  searchShoes: IShoes[] = []
  isLoggedIn: boolean
  user: string


  constructor(private shoesService: ShoesService, private activatedRouter: ActivatedRoute, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
    }
    // Funzione utilizzata per la ricerca delle scarpe passando il nome inserito nel campo ricerca
    this.shoesService.getShoes().subscribe((response) => {
      this.shoes = response
      this.activatedRouter.params.subscribe((params) => {
        const searchParams = params.searchText
        this.shoes.forEach(element => {
          if (element.nome.toLowerCase().includes(searchParams.toLowerCase())) {
            this.searchShoes.push(element)
          }
        });
      })
    })
  }

  clearSearcheShoesVariable() {
    this.searchShoes = []
  }
  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }
}


