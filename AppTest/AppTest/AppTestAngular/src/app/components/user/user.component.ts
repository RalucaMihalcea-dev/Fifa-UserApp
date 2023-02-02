import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../dialog/dialog.component';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'Users Dashboard';
  users: Array<User> | undefined;
  filteredUsers: Array<User> | undefined;
  createForm: FormGroup;
  filterForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
    });

    this.filterForm = this.formBuilder.group({
      minAge: [undefined],
      maxAge: [undefined],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.filter();
    });
  }

  loadUsers(): void {
    this.apiService.getAll().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
      this.filter();
    });
  }

  create(): void {
    this.apiService.create(this.createForm.value).subscribe(() => {
      this.loadUsers();
    });
  }

  filter(): void {
    const minAge = this.filterForm.value.minAge ?? undefined;
    const maxAge = this.filterForm.value.maxAge ?? undefined;

    this.filteredUsers = this.users?.filter(
      (record) =>
        (minAge === undefined || record.age >= minAge) &&
        (maxAge === undefined || record.age <= maxAge)
    );
  }

  clearFilter(): void {
    this.filterForm.reset();
  }

  openDialog(isAddMode: boolean, user?: User): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { isAddMode, user },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        if (isAddMode) {
          this.apiService.create(result).subscribe(() => {
            this.loadUsers();
          });
        } else {
          this.apiService.update(result).subscribe(() => {
            this.loadUsers();
          });
        }
      }
    });
  }

  remove(id: number): void {
    this.apiService.delete(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
