import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private userService = inject(UserService);

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.userLoggedIn.set(true);
    }
  }
}
