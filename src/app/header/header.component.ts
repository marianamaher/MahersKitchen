import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataStorageService, private authenticationService: AuthService){}

  private userSub: Subscription;
  isAuthenticated = false;

  ngOnInit(): void {
    this.userSub = this.authenticationService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    })
  }

  onSaveData(){
    this.dataService.storeRecipeData()
  }

  onFetchData(){
    this.dataService.fetchRecipeData().subscribe();
  }

  onLogout(){
    this.authenticationService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
