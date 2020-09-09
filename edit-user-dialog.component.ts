import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { EditUser } from './EditUser';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  form: any;
  formData: EditUser
  constructor(private fb: FormBuilder,
    private ref: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserService,
    private notif: NotificationService
  ) { }

  ngOnInit() {
    this.formData = this.data.userDetails

    this.form = this.fb.group({
      username: [{ value: this.formData.login, disabled: true }],
      first_name: [{ value: this.formData.first_name, disabled: false }, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z][a-zA-Z0-9 \-']{0,48}[a-zA-Z0-9]$")]
      ],
      last_name: [{ value: this.formData.last_name, disabled: false }, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z][a-zA-Z0-9 \-']{0,48}[a-zA-Z0-9]$")]
      ],
      email: [{ value: this.formData.email, disabled: false }, [
        Validators.required,
        Validators.email]
      ]

    });
  }
  onEditUser(event) {
    event.preventDefault();
       
    this.service.editUser(this.form).subscribe(data => {
      this.notif.success(data.message)
      setTimeout(() => {
        window.location.reload()
        this.ref.close()
      }, 1000)      
      
      
    },
      error => {
        this.notif.warn(error);
        console.log(error);
        
      }
    )
  }

  onClose() {
    this.ref.close()
  }
  get f() {
    return this.form.controls;
  }

}
