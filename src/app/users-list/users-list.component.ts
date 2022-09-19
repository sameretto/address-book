import { Component, OnInit } from '@angular/core';
import { of, switchMap, take } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
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
        this.users = users;
        this.userService.updateUserSource(users);
      });
  }
}
