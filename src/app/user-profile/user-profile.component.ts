import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap, take } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  constructor(
    private readonly userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.user$
      .pipe(
        switchMap((users) => {
          if (users.length === 0) {
            return this.userService.getUsers();
          }
          return of(users);
        }),
        take(1)
      )
      .subscribe((users) => {
        const user = users.find((user) => user.id.value === id);
        if (user) {
          this.user = user;
        }
      });
  }
}
