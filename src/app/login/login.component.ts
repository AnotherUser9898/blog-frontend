import { Component, inject } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';

  public userService = inject(UserService);
  private route = inject(Router);

  onSubmit() {
    const postData = {
      username: this.username,
      password: this.password,
    };

    this.userService.loginUser(postData).subscribe((res) => {
      if (res.message == 'success') {
        localStorage.setItem('token', res.token);
        this.userService.userLoggedIn.set(true);
        console.log(res.message);
        this.route.navigate(['author-dashboard']);
      }
    });
  }
}
