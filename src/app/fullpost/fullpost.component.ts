import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fullpost',
  imports: [],
  templateUrl: './fullpost.component.html',
  styleUrl: './fullpost.component.css',
})
export class FullpostComponent implements OnInit {
  @Input({ required: true }) id!: number;

  private httpService = inject(UserService);

  title: string = '';
  content: string = '';

  ngOnInit(): void {
    this.httpService.getPostById(this.id).subscribe((res) => {
      console.log(res.message);
      if (res.message == 'success') {
        this.title = res.post.title;
        this.content = res.post.content;
      }
    });
  }
}
