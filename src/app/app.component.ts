import { Component } from '@angular/core';
import { PipelineService } from './pipeline/pipeline.service';

@Component({
  selector: 'polysynth-root',
  // templateUrl: './app.component.html',
  template: `
    <polysynth-control-panel (onsettingchange)="sendMessage($event)"></polysynth-control-panel>
    <polysynth-keyboard (onnote)="sendMessage($event)"></polysynth-keyboard>
  `
})
export class AppComponent {
  constructor(private pipelineService: PipelineService) {

    let self = this;
    pipelineService.begin();
  }
  sendMessage(event) {
    console.log('sending', event);
  }
}
