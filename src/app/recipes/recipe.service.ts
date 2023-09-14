import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe('Chana Masala',
            'This is simply a test',
            'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe.jpg',
            [new Ingredient('Chickpeas can', 1),
            new Ingredient('Vegetable Broth Bottle', 0.5),
            new Ingredient('Lentils cup', 1),
            new Ingredient('Coconut Milk can', 1),

            ]
        ),
        new Recipe('Chana Bateta',
            'This is simply a test',
            'https://thismomskitchen.com/wp-content/uploads/Chana-Bateta.jpg',
            [
                new Ingredient('Potatoes', 4),
                new Ingredient('Tomato Sauce Jar', 1),
                new Ingredient('Chickpeas can', 1),
            ])]


    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        
        this.shoppingListService.addIngredientsToList(ingredients);
    }

}