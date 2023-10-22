import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  displayPhoneBox = false;
  listSent = false;
  itemizedString: string;
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private http: HttpClient){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditingItem.next(index);
  }

  objectToString(obj: any, index:number): string {
    // return `${index + 1}. ${obj.name} - ${obj.amount}`;
    return `○ ${obj.name} - ${obj.amount}`;
  }
  

  onShareList(){
    var recipeList = this.shoppingListService.getIngredients();
    const recipesListToShare = recipeList.map(this.objectToString);
    this.itemizedString = recipesListToShare.join('\n');
    this.displayPhoneBox = true;
    this.listSent = false;
  }

  onSendToPhone(phoneID){
    const phoneNumber = phoneID;
    this.displayPhoneBox = !this.displayPhoneBox;
    this.listSent = true;

    console.log(this.itemizedString+'\n\n');

    const apiUrl = 'https://textbelt.com/text';
    const requestBody = {
      phone: phoneNumber,
      message: this.itemizedString+'\n\n',
      key: environment.smsAPIKey
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(apiUrl, requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('SMS sent successfully:', response);
        },
        (error) => {
          console.error('Error sending SMS:', error);
        }
      );
  }

}
