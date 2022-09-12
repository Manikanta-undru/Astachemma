import { Injectable } from '@angular/core';
import { TurnService } from './turn.service';

@Injectable()
export class RollService {
  public playerTurn = 0;
  public shellTotal = 0;
  constructor(private turnService: TurnService) {}
  roll() {
    const shell1 = Math.floor(Math.random() * 2);
    const shell2 = Math.floor(Math.random() * 2);
    const shell3 = Math.floor(Math.random() * 2);
    const shell4 = Math.floor(Math.random() * 2);
    this.shellTotal = shell1 + shell2 + shell3 + shell4;

    return [
      shell1,
      shell2,
      shell3,
      shell4,

      this.shellTotal == 0 ? 8 : this.shellTotal,
    ];
  }
}
