import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent{
    
    constructor(private authService: AuthService, private router: Router){}

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    // successAlert = false;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm){
        if(!authForm.valid){
            return;
        }

        const email = authForm.value.email;
        const password = authForm.value.password;
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }
        else{
            authObs = this.authService.signup(email, password);
        }
        
        authObs.subscribe(
            responseData=>{
                console.log(responseData + 'Success');
                this.isLoading = false;
                // this.successAlert = !this.successAlert;
                this.error = null;
                this.router.navigate(['/recipes']);

        }, 
            errorMessage=>{
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
                // this.successAlert = !this.successAlert
        });
     
        authForm.reset()
    }
}