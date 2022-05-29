export interface IIngredients {
  __v:number;
  _id:string;
  calories:number;
  carbohydrates:number;
  fat:number;
  image:string;
  image_large:string;
  image_mobile:string;
  name:string;
  price:number;
  proteins:number;
  type:string;
};

export interface IStateI {
  ingredients: {
    items:Array<IIngredients> | null,
    itemsRequest:boolean,
    itemsFailed:boolean,
  }
};

export interface IStateC {
  construct:{
    ingredients:Array<{id:string, uuid:string}>|null;
    bun:string|null;
  }
};

export interface IConstructorIngredient {
  id:string;
  num?:number;
  position?:"top" | "bottom";
  k?:string;
}