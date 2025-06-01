export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = -1;
  public currentCard: any = '';
  public pickCardAnimation = false;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push("ace_" + i);
      this.stack.push("clubs_" + i);
      this.stack.push("hearts_" + i);
      this.stack.push("diamonds_" + i)
    }

    shuffle(this.stack);
  }

  toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      currentCard: this.currentCard,
      pickCardAnimation: this.pickCardAnimation
    }
  }
}


function shuffle(array: any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
