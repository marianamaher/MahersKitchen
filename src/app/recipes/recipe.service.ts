import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService){}

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
        // new Recipe('Chana Masala',
        //     'Also known as the chickpeas of heaven! 👩🏽‍🍳 Prepation: Drizzle oil and salté the shredded carrots until golden.',
        //     'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe.jpg',
        //     [new Ingredient('Chickpeas can', 1),
        //     new Ingredient('Vegetable Broth Bottle', 1),
        //     new Ingredient('Lentils cup', 1),
        //     new Ingredient('Coconut Milk can', 1),

        //     ]
        // ),
        // new Recipe('Chana Bateta',
        //     'This is simply a test ',
        //     'https://thismomskitchen.com/wp-content/uploads/Chana-Bateta.jpg',
        //     [
        //         new Ingredient('Potatoes', 4),
        //         new Ingredient('Tomato Sauce Jar', 1),
        //         new Ingredient('Chickpeas can', 1),
        //     ])]


    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        
        this.shoppingListService.addIngredientsToList(ingredients);
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }


}