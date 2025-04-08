import { Component, inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fullpost',
  imports: [DatePipe],
  templateUrl: './fullpost.component.html',
  styleUrl: './fullpost.component.css',
})
export class FullpostComponent implements OnInit {
  @Input({ required: true }) id!: number;

  private httpService = inject(UserService);

  title: string = '';
  content: string = '';
  authorFullname: string = '';
  updatedAt!: Date;

  ngOnInit(): void {
    this.httpService.getPostById(this.id).subscribe((res) => {
      console.log(res.message);
      if (res.message == 'success') {
        this.title = res.post.title;
        this.content = res.post.content;
        this.authorFullname =
          res.post.author.firstname + ' ' + res.post.author.lastname;
        this.updatedAt = res.post.updatedAt;
      }
    });
  }
}
