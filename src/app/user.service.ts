import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User, UserResponse } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userApi = 'https://randomuser.me/api/?seed=nuvalence';
  private userSource = new BehaviorSubject<User[]>([]);
  user$ = this.userSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<UserResponse>(this.userApi + '&results=10')
      .pipe(map((data) => data.results));
  };

  updateUserSource(value:User[]): void{
    this.userSource.next(value)
  }
}
