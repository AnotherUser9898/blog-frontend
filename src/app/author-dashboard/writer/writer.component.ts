import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-writer',
  imports: [
    InputTextModule,
    FormsModule,
    EditorComponent,
    TextareaModule,
    Toast,
    ButtonModule,
  ],
  templateUrl: './writer.component.html',
  styleUrl: './writer.component.css',
  providers: [
    MessageService,
    {
      provide: TINYMCE_SCRIPT_SRC,
      useValue: 'tinymce/tinymce.min.js',
    },
  ],
})
export class WriterComponent {
  init: EditorComponent['init'] = {
    plugins: 'lists link table code help wordcount',
    base_url: '/tinymce', // Root for resources
    suffix: '.min',
  };

  private httpService = inject(UserService);
  private route = inject(Router);
  private messageService = inject(MessageService);

  title: string = '';
  content: string = '';
  description: string = '';

  onSubmit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.route.navigate(['login']);
      console.log('Please login');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const postData = {
      title: this.title,
      content: this.content,
      description: this.description,
    };

    this.httpService.createPost(headers, postData).subscribe((res) => {
      console.log(res.message);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post Created',
      });
    });
  }
}
