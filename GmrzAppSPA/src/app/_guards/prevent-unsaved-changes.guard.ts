import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PlayerEditComponent } from '../players/player-edit/player-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<PlayerEditComponent> {
  canDeactivate(component: PlayerEditComponent) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to leave? Any unsaved changes will be lost!'
      );
    }
    return true;
  }
}
