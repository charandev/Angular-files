import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NotificationService } from '../../_services/notification.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { EditUser } from '../edit-user-dialog/EditUser';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { UserAccessDialogComponent } from '../user-access-dialog/user-access-dialog.component';
// import { log } from 'console';
// import * as Template from '../../assets/Template'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog, private notif: NotificationService) { }
  content: string;
  currentUsername = window.sessionStorage.getItem('username')
  currentChangePwdUserName: string
  listData: MatTableDataSource<any>
  searchKey: string
  displayedColumns: string[] = ["userName", "fullName", "email", "actions"]
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {
        var count = 0;
        // console.log(data.users);
        let array = data.users.map(item => {
          return {
            $key: data.users.indexOf(item),
            ...item
          };
        })
        // console.log(window.sessionStorage.getItem("username"))
        this.listData = new MatTableDataSource(array)
        this.listData.sort = this.sort
        this.listData.paginator = this.paginator
        // console.log(array);

      },
      err => {
        console.log("Failed while fetching", err);
        this.notif.warn("Failed while fetching")

      }
    );
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }



  onCreate() {
    // this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateUserComponent, dialogConfig);
  }

  onDelete(login: string) {
    if (confirm("Are you sure you want to delete the user " + login + " ?")) {
      this.userService.deleteUser(login).subscribe(
        data => {
          this.notif.success(data.message)
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        }, error => {
          this.notif.warn(error.message)
          console.log(error.message);

        }
      )
    }
  }

  onChangePassword(login:string) {    // this.currentChangePwdUserName = login
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data= {login: login};    
    this.dialog.open(ChangePasswordDialogComponent, dialogConfig);
  }

  onShowDetails(data:EditUser){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data= {userDetails:data};  
    this.dialog.open(EditUserDialogComponent, dialogConfig);
  }
   dialogBoxSettings = {
    height: '300px',
    width: '500px',
    margin: '0 auto',
    disableClose: true,
    hasBackdrop: true,

  };
  onUserAccess(login:string){
    console.log("==="+login);
    const dialogConfig = new MatDialogConfig();
  this.dialogBoxSettings;
     dialogConfig.data= {login:login};  
    this.dialog.open(UserAccessDialogComponent, dialogConfig);

  }
}
