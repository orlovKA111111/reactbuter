import { constructorReducer } from './constructor'
import * as types from '../action/constructor';

const initialState = {
    ingredients:null,
    bun:null
};

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle ADD_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState, {
                type: types.ADD_INGREDIENT_CONSTRUCTOR,
                id:'qwerty',
                uuid:'12345'
            })
        ).toEqual(
            {
                ...initialState,
                ingredients: [{id:'qwerty', uuid:'12345'}]
            }
        )
    })

    it('should handle DELETE_ITEM_CONSTRUCTOR', () => {
        expect(
            constructorReducer( { ingredients:[{id:'qwerty1', uuid:'12345'}, {id:'qwerty2', uuid:'12346'}, {id:'qwerty3', uuid:'12347'}], bun:null } , {
                type: types.DELETE_ITEM_CONSTRUCTOR,
                num:1
            })
        ).toEqual(
            {
                bun:null,
                ingredients: [{id:'qwerty1', uuid:'12345'}, {id:'qwerty3', uuid:'12347'}]
            }
        )
    })

    it('should handle MOVE_ITEM_CONSTRUCTOR', () => {
        expect(
            constructorReducer( { ingredients:[{id:'qwerty1', uuid:'12345'}, {id:'qwerty2', uuid:'12346'}, {id:'qwerty3', uuid:'12347'}], bun:null } , {
                type: types.MOVE_ITEM_CONSTRUCTOR,
                pos:0,
                newPos:2,
                id:'qwerty1',
                uuid:'12345'
            })
        ).toEqual(
            {
                bun:null,
                ingredients: [{id:'qwerty2', uuid:'12346'}, {id:'qwerty3', uuid:'12347'}, {id:'qwerty1', uuid:'12345'}]
            }
        )
    })

    it('should handle RESET_CONSTRUCTOR', () => {
        expect(
            constructorReducer( { ingredients:[{id:'qwerty1', uuid:'12345'}, {id:'qwerty2', uuid:'12346'}, {id:'qwerty3', uuid:'12347'}], bun:null } , {
                type: types.RESET_CONSTRUCTOR,
                num:1
            })
        ).toEqual(
            {
                ...initialState
            }
        )
    })

})