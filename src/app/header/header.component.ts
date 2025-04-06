import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public userService = inject(UserService);
  private route = inject(Router);

  onLogout() {
    this.userService.logout();
    this.route.navigate(['/']);
  }
}
