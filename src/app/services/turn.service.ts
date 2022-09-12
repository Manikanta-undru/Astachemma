import { Injectable } from '@angular/core';

@Injectable()
export class TurnService {
  public currentPlayer = 'red';
  constructor() {}
  onRoll(rollNumber: number) {
    if (rollNumber == 4 || rollNumber == 8) {
      this.currentPlayer = this.currentPlayer;
    } else {
      if (this.currentPlayer == 'red') {
        this.currentPlayer = 'blue';
      } else {
        this.currentPlayer = 'red';
      }
    }
  }
}
