import { Component, inject } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public firstname: string = '';
  public lastname: string = '';
  public username: string = '';
  public password: string = '';

  private httpService = inject(UserService);
  private route = inject(Router);

  onSubmit() {
    const postData = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
    };

    this.httpService.registerUser(postData).subscribe((res) => {
      console.log(res.message);

      if (res.message == 'success') {
        this.route.navigate(['login']);
      }
    });
  }
}
