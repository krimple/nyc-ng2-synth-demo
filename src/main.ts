import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

let ctxName = 'theAudioContext';

// hackity hack - get audio context outside of an Angular module
window[ctxName] = new (window['AudioContext'] || window['webkitAudioContext'])();

// hackity hackity hack - make iOS happy by resuming the audio context on touch
// see https://gist.github.com/laziel/7aefabe99ee57b16081c

if (window[ctxName] && window[ctxName].state === 'suspended') {
    var resume = () => {
        window[ctxName].resume();
    };

    setTimeout(() => {
        if (window[ctxName].state === 'running') {
            document.body.removeEventListener('touchend', resume, false);
        }
    }, 0);


    document.body.addEventListener('touchend', resume, false);
}

// prevent right click
window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

// end hackity hackity hack

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
