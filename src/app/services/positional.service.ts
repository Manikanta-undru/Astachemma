import { Injectable, Output, EventEmitter } from '@angular/core';
import { TurnService } from './turn.service';
import { UiMoveService } from './uimove.service';

@Injectable()
export class PositionalService {
  public PATH_RED = [
    '01',
    '53',
    '54',
    '55',
    '45',
    '35',
    '25',
    '15',
    '14',
    '13',
    '12',
    '11',
    '21',
    '31',
    '41',
    '51',
    '52',
    '42',
    '32',
    '22',
    '23',
    '24',
    '34',
    '44',
    '43',
    '33',
  ];
  public PATH_BLUE = [
    '00',
    '13',
    '12',
    '11',
    '21',
    '31',
    '41',
    '51',
    '52',
    '53',
    '54',
    '55',
    '45',
    '35',
    '25',
    '15',
    '14',
    '24',
    '34',
    '44',
    '43',
    '42',
    '32',
    '22',
    '23',
    '33',
  ];
  public currentPositionRed = [0, 0, 0, 0];
  public currentPositionBlue = [0, 0, 0, 0];
  public pawnCordinatesRed = [
    this.PATH_RED[this.currentPositionRed[0]],
    this.PATH_RED[this.currentPositionRed[1]],
    this.PATH_RED[this.currentPositionRed[2]],
    this.PATH_RED[this.currentPositionRed[3]],
  ];
  public pawnCordinatesBlue = [
    this.PATH_BLUE[this.currentPositionBlue[0]],
    this.PATH_BLUE[this.currentPositionBlue[1]],
    this.PATH_BLUE[this.currentPositionBlue[2]],
    this.PATH_BLUE[this.currentPositionBlue[3]],
  ];
  public rollNumber = 0;
  constructor(private turnService: TurnService) {}
  //move
  move(rollNumber: number, id: string) {
    console.log(rollNumber, id);

    if (rollNumber != 0 && id != null) {
      this.rollNumber = rollNumber;
      //check the current player
      if (this.turnService.currentPlayer == 'red') {
        //code for red
        if (
          this.currentPositionRed[0] ||
          this.currentPositionRed[0] ||
          this.currentPositionRed[0] ||
          this.currentPositionRed[0] ||
          this.rollNumber == 4 ||
          this.rollNumber == 8
        ) {
          if (id == '01' && (rollNumber == 4 || rollNumber == 8)) {
            let pawnsAtPos: number[] = [];
            this.currentPositionRed.map((pawn, i) => {
              if (this.PATH_RED[pawn] == id) {
                pawnsAtPos.push(i);
              }
            });
            if (pawnsAtPos.length > 0) {
              this.currentPositionRed[pawnsAtPos[0]] = +1;
              this.turnService.onRoll(rollNumber);
              this.rollNumber = 0;
            }
          } else if (id !== '01') {
            //for every other id and every other roll
            let pawnsAtPos: number[] = [];
            this.currentPositionRed.map((pawn, i) => {
              if (this.PATH_RED[pawn] == id) {
                pawnsAtPos.push(i);
              }
            });
            if (pawnsAtPos.length > 0) {
              console.log(this.currentPositionRed[pawnsAtPos[0]]);
              this.currentPositionRed[pawnsAtPos[0]] += rollNumber;
              this.turnService.onRoll(rollNumber);
              this.rollNumber = 0;

              //   if(this.PATH_RED[this.currentPositionRed[pawnsAtPos[0]]]== this.PATH_BLUE[this.currentPositionBlue[0]]){}
              this.currentPositionBlue.map((pawn, i) => {
                if (
                  this.PATH_BLUE[pawn] ==
                  this.PATH_RED[this.currentPositionRed[pawnsAtPos[0]]]
                ) {
                  this.currentPositionBlue[i] = 0;
                  return;
                }
              });
            }
          }
        } else {
          this.turnService.currentPlayer = 'blue';
          this.rollNumber = 0;
        }
      } else {
        //code for blue player

        if (
          this.currentPositionBlue[0] ||
          this.currentPositionBlue[0] ||
          this.currentPositionBlue[0] ||
          this.currentPositionBlue[0] ||
          this.rollNumber == 4 ||
          this.rollNumber == 8
        ) {
          if (id == '00' && (rollNumber == 4 || rollNumber == 8)) {
            let pawnsAtPos: number[] = [];
            this.currentPositionBlue.map((pawn, i) => {
              if (this.PATH_BLUE[pawn] == id) {
                pawnsAtPos.push(i);
              }
            });
            if (pawnsAtPos.length > 0) {
              this.currentPositionBlue[pawnsAtPos[0]] = +1;
              this.turnService.onRoll(rollNumber);
              this.rollNumber = 0;
            }
          } else if (id !== '00') {
            //for every other id and every other roll
            let pawnsAtPos: number[] = [];
            this.currentPositionBlue.map((pawn, i) => {
              if (this.PATH_BLUE[pawn] == id) {
                pawnsAtPos.push(i);
              }
            });
            if (pawnsAtPos.length > 0) {
              console.log(this.currentPositionBlue[pawnsAtPos[0]]);
              this.currentPositionBlue[pawnsAtPos[0]] += rollNumber;
              this.turnService.onRoll(rollNumber);
              this.rollNumber = 0;
              this.currentPositionBlue.map((pawn, i) => {
                if (
                  this.PATH_RED[pawn] ==
                  this.PATH_BLUE[this.currentPositionBlue[pawnsAtPos[0]]]
                ) {
                  this.currentPositionRed[i] = 0;
                  return;
                }
              });
            }
          }
        } else {
          this.turnService.currentPlayer = 'red';
          this.rollNumber = 0;
        }
      }
    }
  }

  getNewCordinatesRed(): string[] {
    return [
      this.PATH_RED[this.currentPositionRed[0]],
      this.PATH_RED[this.currentPositionRed[1]],
      this.PATH_RED[this.currentPositionRed[2]],
      this.PATH_RED[this.currentPositionRed[3]],
    ];
  }
  getNewCordinatedBlue(): string[] {
    return [
      this.PATH_BLUE[this.currentPositionBlue[0]],
      this.PATH_BLUE[this.currentPositionBlue[1]],
      this.PATH_BLUE[this.currentPositionBlue[2]],
      this.PATH_BLUE[this.currentPositionBlue[3]],
    ];
  }
  resetRoll() {
    return this.rollNumber;
  }
}
