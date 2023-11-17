import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './shared/types/Languages';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'myApp';
    langauges = Languages;

    i18n = inject(TranslateService);

    constructor() {
        this.i18n.setDefaultLang('en');
    }

    onChangeLanguage(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.i18n.use(value);
    }
}
