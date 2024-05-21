import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.sass'
})
export class BreadcrumbsComponent {
  @Input() color: string
  @Input() category: string

}
