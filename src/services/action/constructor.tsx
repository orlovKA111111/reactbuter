export const ADD_INGREDIENT_CONSTRUCTOR : 'ADD_INGREDIENT_CONSTRUCTOR' = 'ADD_INGREDIENT_CONSTRUCTOR';
export const ADD_BUN_CONSTRUCTOR : 'ADD_BUN_CONSTRUCTOR' = 'ADD_BUN_CONSTRUCTOR';
export const DELETE_ITEM_CONSTRUCTOR : 'DELETE_ITEM_CONSTRUCTOR' = 'DELETE_ITEM_CONSTRUCTOR';
export const MOVE_ITEM_CONSTRUCTOR : 'MOVE_ITEM_CONSTRUCTOR' = 'MOVE_ITEM_CONSTRUCTOR';
export const RESET_CONSTRUCTOR : 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';

export interface IConstructor {
    ingredients: Array<{id:string, uuid:string}> | null;
    bun:string | null
}

export interface IAddIngredientConstructor {
    readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR,
    id:string,
    uuid:string
}
export interface IAddBunConstructor {
    readonly type: typeof ADD_BUN_CONSTRUCTOR,
    id:string
}
export interface IDeleteItemConstructor {
    readonly type: typeof DELETE_ITEM_CONSTRUCTOR,
    num:number
}
export interface IMoveItemConstructor {
    readonly type: typeof MOVE_ITEM_CONSTRUCTOR,
    pos:number,
    newPos:number,
    id:string
}
export interface IResetConstructor {
    readonly type: typeof RESET_CONSTRUCTOR
}

export type TConstructorActions =
    | IAddIngredientConstructor
    | IAddBunConstructor
    | IDeleteItemConstructor
    | IMoveItemConstructor
    | IResetConstructor;