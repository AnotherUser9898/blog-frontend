import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { type GetAllPosts } from '../user.model';
import { PanelModule } from 'primeng/panel';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PanelModule, RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public posts?: GetAllPosts[];

  public userService = inject(UserService);

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  ngOnInit(): void {
    this.userService.getAllPosts().subscribe((res) => {
      this.posts = res.posts;
      this.posts.sort((a, b) => Number(a.id) - Number(b.id));
      console.log(res.message);
    });
  }

}
