import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditingItem = new Subject<number>()

    private ingredients: Ingredient[] = [
        new Ingredient('Eggs', 12),
        new Ingredient('Avocados', 4)
      ];

    //  simply returning the list of ingredients 
    getIngredients(){
        return this.ingredients.slice();
    }
    // when an user wants to edit an ingredient 
    getIngredientForEdition( index: number){
        return this.ingredients[index];
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

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}