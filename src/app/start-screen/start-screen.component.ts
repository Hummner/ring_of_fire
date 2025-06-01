import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Firestore, collection, collectionData, onSnapshot, addDoc, doc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
firestore!: Firestore;

  constructor(private router: Router) { 
    this.firestore = inject(Firestore);
  }

  newGame() {
    //start game
    let game = new Game();
    this.addGame(game)

    
  }


  addGame(game:Game) {

    addDoc(this.getGamesCollectionRef(), game.toJson()).then((gameInfo) => {
      this.router.navigateByUrl("/game/" + gameInfo.id);
      
    })
  }

  getGamesCollectionRef() {
    return collection(this.firestore, "games");
  }







}


