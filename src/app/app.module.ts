import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PositionalService } from './services/positional.service';
import { RollService } from './services/roll.service';
import { TurnService } from './services/turn.service';
import { UiMoveService } from './services/uimove.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [RollService, TurnService, PositionalService, UiMoveService],
  bootstrap: [AppComponent],
})
export class AppModule {}
