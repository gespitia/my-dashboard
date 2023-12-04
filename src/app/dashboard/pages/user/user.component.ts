import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap, tap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="titleLabel()"></app-title>

    @if(user()){
    <section>
      <img [alt]="user()!.first_name" [srcset]="user()!.avatar" />

      <div>
        <h3>{{ user()!.first_name }} {{ user()!.last_name }}</h3>
        <p>{{ user()!.email }}</p>
      </div>
    </section>
    }@else {
    <p>Cargando información...</p>
    }
  `,
})
export default class UserComponent {
  public userService = inject(UsersService);
  public route = inject(ActivatedRoute);

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario: ${this.user()?.first_name} ${
        this.user()?.last_name
      }`;
    }
    return 'Información de usuario:';
  });
  // constructor(){
  //   this.route.params.subscribe(params=>{
  //     console.log(params)
  //   })
  // }
}
