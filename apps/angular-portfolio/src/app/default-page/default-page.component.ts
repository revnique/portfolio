import { Component } from '@angular/core';
import { faHandPointUp, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-default-page',
  imports: [FontAwesomeModule],
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.scss'
})
export class DefaultPageComponent {
  faHandPointUp = faHandPointUp;
  faExternalLink = faExternalLink;
}
