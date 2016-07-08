import { Component } from '@angular/core';
import ComponentHtml from './app.component.html';

@Component({
    selector: 'aprende-app',
    templateUrl: ComponentHtml
})
export class AppComponent {
    hello = 'Hello World';
}