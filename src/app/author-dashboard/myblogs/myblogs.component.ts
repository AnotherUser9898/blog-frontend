import { Component, inject } from '@angular/core';
import { type Post } from '../../user.model';
import { OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-myblogs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './myblogs.component.html',
  styleUrl: './myblogs.component.css',
})
export class MyblogsComponent implements OnInit {
  blogs?: Post[];

  private httpService = inject(UserService);
  private route = inject(Router);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.route.navigate(['login']);
      console.log('Please login');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.httpService.getAllPostsByUserId(headers).subscribe((res) => {
      console.log(res.posts);
      this.blogs = res.posts;
      this.blogs.sort((a, b) => Number(a.id) - Number(b.id));
      console.log(res.message);
    });
  }
}
