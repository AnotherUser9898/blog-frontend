import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, InputTextModule, EditorComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [
    {
      provide: TINYMCE_SCRIPT_SRC,
      useValue: 'tinymce/tinymce.min.js',
    },
  ],
})
export class EditComponent implements OnInit {
  @Input({ required: true }) id!: number;

  title: string = '';
  content: string = '';

  private httpService = inject(UserService);
  private route = inject(Router);

  init: EditorComponent['init'] = {
    plugins: 'lists link table code help wordcount',
    base_url: '/tinymce', // Root for resources
    suffix: '.min',
  };

  ngOnInit(): void {
    this.httpService.getPostById(this.id).subscribe((res) => {
      console.log(res.message);
      if (res.message == 'success') {
        this.title = res.post.title;
        this.content = res.post.content;
      }
    });
  }

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
    };

    this.httpService.editPost(headers, postData, this.id).subscribe((res) => {
      console.log(res.message);
      if (res.message == 'success') {
        console.log('post updated');
      }
    });
  }
}
