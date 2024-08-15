import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardComponent], // If we have multiple shared component other than 'CardComponent' it would be added here.
  exports: [CardComponent],
})
export class SharedModule {}
