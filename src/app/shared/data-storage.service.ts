import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipeData(){
        const recipes = this.recipeService.getRecipes();
        if(recipes.length && !confirm('Make sure you fetched the data first, or this will clear your DB. Do you wish to proceed?')){
            return;
        }
        this.http.put('https://ng-recipebook-82ff4-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipeData(){
    
        return this.http.get<Recipe[]>('https://ng-recipebook-82ff4-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(
                map(response=>{
                    return response.map(recipe=>{
                        return {
                            ...recipe, 
                            ingredients: recipe.ingredients ? recipe.ingredients:[]
                        };
                    });
                }), tap(response=>{
                    this.recipeService.setRecipes(response);
                })
            );
    }
}