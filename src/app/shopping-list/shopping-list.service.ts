import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>()
    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes', 10)
      ];


    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient, publishChanges=true){
        const index = this.ingredients.findIndex(ing => ing.name===ingredient.name);
        if(index===-1){
            this.ingredients.push(ingredient);
        }
        else{
            this.ingredients[index].amount += ingredient.amount;
        }
        if(publishChanges){
        this.ingredientsChanged.next(this.ingredients.slice());
        }
    }
    addIngredientsToList(ingredients: Ingredient[]){
        ingredients.forEach(ing=> this.addIngredient(ing,false));
        this.ingredientsChanged.next(this.ingredients.slice());
    }


    
}