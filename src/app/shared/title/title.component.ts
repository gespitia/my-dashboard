import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-3xl mb-5" >{{title}} - {{withShawdown}}</h1>
  `,
  styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input({required: true}) title!:string;
  @Input({transform: booleanAttribute}) withShawdown:boolean = false;
}
