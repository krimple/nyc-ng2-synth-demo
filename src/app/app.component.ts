import { Component } from '@angular/core';
import { PipelineService } from './pipeline/pipeline.service';

@Component({
  selector: 'polysynth-root',
  // templateUrl: './app.component.html',
  template: `
  <div class="topleft container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a routerLink="piano">Keyboard</a>
      </li>
      <li class="nav-item">
        <a routerLink="blues">Blues</a>
      </li>
       <li class="nav-item">
        <a routerLink="minorblues">Minor Blues</a>
      </li>
       <li class="nav-item">
        <a href="#">Ionic</a>
      </li>
       <li class="nav-item">
        <a routerLink="drums">Drum Set</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  constructor(private pipelineService: PipelineService) {

    let self = this;
    pipelineService.begin();
  }
  sendMessage(event) {
    //console.log('sending', event);
  }
}
