import { Component, inject, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkActive,
  RouterLink,
  Router,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-author-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './author-dashboard.component.html',
  styleUrl: './author-dashboard.component.css',
})
export class AuthorDashboardComponent implements OnInit {
  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.route.navigate(['login']);
      console.log('Please login');
      return;
    }
    this.route.navigate(['myblogs'], { relativeTo: this.activatedRoute });
  }
}
