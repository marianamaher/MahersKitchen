import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){} 

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditingItem
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredientForEdition(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    );
  }

  onSubmitItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
    this.shoppingListService.addIngredient(newIngredient);}
    this.editMode = false;
    form.reset();
  }

  onDelete(){

    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode=false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
