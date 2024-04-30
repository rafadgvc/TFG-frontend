import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'questions-frontend';
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  this.authSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
  });
}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.updateAuthStatus(false);
      this.router.navigate(['/login']);
    });
  }
}
