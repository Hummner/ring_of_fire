import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { MatCardModule } from '@angular/material/card';
import { inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Firestore, collection, collectionData, onSnapshot, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatSlideToggleModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  firestore!: Firestore;
  gamesArray: [] = [];
  gameURL!: string;
  game!: Game;
  unsubGame: any;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.firestore = inject(Firestore);
  };

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => { this.gameURL = params['id'] })
    this.unsubGame = this.subgame();




  }

  getGameRef() {
    return doc(collection(this.firestore, "games"), this.gameURL);
  }


  newGame() {
    this.game = new Game();
    // console.log(this.game);

  }



  subgame() {
    return onSnapshot(this.getGameRef(), (list) => {
      let newGame = list.data();
      if (newGame) {

        this.game.currentPlayer = newGame['currentPlayer'];
        this.game.stack = newGame['stack'];
        this.game.playedCards = newGame['playedCards'];
        this.game.players = newGame['players'];
        this.game.currentCard = newGame["currentCard"],
          this.game.pickCardAnimation = newGame["pickCardAnimation"]

      }




    })
  }

  saveGame() {
    updateDoc(this.getGameRef(), this.game.toJson())
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
      this.saveGame();

    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.saveGame();
      }, 1000);
    }
  }

}
