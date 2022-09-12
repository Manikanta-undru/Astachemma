import { Component } from '@angular/core';
import { PositionalService } from './services/positional.service';
import { RollService } from './services/roll.service';
import { TurnService } from './services/turn.service';
import { UiMoveService } from './services/uimove.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public rollNumber = 0;
  public currentPlayer = 'red';
  public rollDisabled = false;
  public blue_positions: string[] = ['00', '00', '00', '00'];
  public red_positions = ['01', '01', '01', '01'];
  constructor(
    public rollService: RollService,
    public turnService: TurnService,
    public positionalService: PositionalService,
    public uiMoveService: UiMoveService
  ) {}

  shellArray = ['../assets/shell.png', '../assets/shell-reverse.png'];
  shell1 = '../assets/shell-reverse.png';
  shell2 = '../assets/shell-reverse.png';
  shell3 = '../assets/shell-reverse.png';
  shell4 = '../assets/shell-reverse.png';
  title = 'AstaChemma';
  onClickBox(e: any) {
    console.log(e.target.getAttribute('id'));

    this.positionalService.move(this.rollNumber, e.target.getAttribute('id'));
    this.rollNumber = this.positionalService.resetRoll();
    this.blue_positions = this.positionalService.getNewCordinatedBlue();
    this.red_positions = this.positionalService.getNewCordinatesRed();
    this.currentPlayer = this.turnService.currentPlayer; // get the next player
    this.rollDisabled = false; // enable the roll again
  }
  onClickRoll() {
    this.rollDisabled = true;
    const rollShells = this.rollService.roll();
    let interval = setInterval(() => {
      this.shell1 = this.shellArray[Math.floor(Math.random() * 2)];
      this.shell2 = this.shellArray[Math.floor(Math.random() * 2)];
      this.shell3 = this.shellArray[Math.floor(Math.random() * 2)];
      this.shell4 = this.shellArray[Math.floor(Math.random() * 2)];
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      this.shell1 = this.shellArray[rollShells[0]];
      this.shell2 = this.shellArray[rollShells[1]];
      this.shell3 = this.shellArray[rollShells[2]];
      this.shell4 = this.shellArray[rollShells[3]];
      this.rollNumber = rollShells[4];
      //get the current player
      if (this.turnService.currentPlayer == 'red') {
        if (
          !(
            this.red_positions[0] !== '01' ||
            this.red_positions[0] !== '01' ||
            this.red_positions[0] !== '01' ||
            this.red_positions[0] !== '01' ||
            this.rollNumber === 4 ||
            this.rollNumber === 8
          )
        ) {
          this.turnService.currentPlayer = 'blue';

          this.currentPlayer = 'blue';
          this.rollNumber = 0;
          this.rollDisabled = false;
        }
      } else if (this.turnService.currentPlayer == 'blue') {
        if (
          !(
            this.blue_positions[0] !== '00' ||
            this.blue_positions[0] !== '00' ||
            this.blue_positions[0] !== '00' ||
            this.blue_positions[0] !== '00' ||
            this.rollNumber === 4 ||
            this.rollNumber === 8
          )
        ) {
          this.turnService.currentPlayer = 'red';
          this.currentPlayer = 'red';
          this.rollNumber = 0;
          this.rollDisabled = false;
        }
      }
    }, 2000);
  }
}
