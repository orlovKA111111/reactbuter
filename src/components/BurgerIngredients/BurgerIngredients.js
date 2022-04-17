import React from 'react';
import {CurrencyIcon, Tab, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from'./BurgerIngredientsStyle.module.css'
import Modal from './../Modal/Modal'
import {useModal} from "../ModalWithUseEffect/ModalWithUseEffect";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

BurgerIngredients.propTypes ={
    items: PropTypes.object
}

export default function BurgerIngredients() {

    const dispatch = useDispatch();
    const { ingredients, bun } = useSelector(
        state => state.construct
    );
    const [current, setCurrent] = React.useState('bun');


    const [{ opacity }, refItem] = useDrag({
        type: 'items',
        item: {id:product._id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    const ref = React.useRef(null);
    const bunRef = React.useRef(null);
    const sauceRef = React.useRef(null);
    const mainRef = React.useRef(null);

    const count = React.useMemo(() => {
            let count = 0;
            if (product.type === 'bun') {
                if (bun === product._id) count = 2;
            } else {
                ingredients.forEach(function(item) {
                    if (item === product._id) count = count+1;
                })
            }
            return count;
        },
        [bun, ingredients, product]
    );

    const {open} = useModal()

    const onOpenPopup = React.useCallback((() => {
        dispatch({type:ADD_ITEM_OBJECT, id:product._id});
        return open(
                <Modal>
                    <IngredientDetails />
                </Modal>
        )
    }), [open])

    const sidebar = (
        <div className={style.cadItems} style={{ opacity }} ref={refItem}>
            {ingredients.map((i) =>( i.type === 'bun' ?
                <div onClick={onOpenPopup} key={i._id}  name={i._id} className={style.item}>
                    {count > 0 && <Counter count={count} size="default" />}
                    <img className={style.imgItem} src={i.image}/>
                    <div className={style.priceItemsImg}>
                        <span className='text_type_digits-default'>{i.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span>{i.name}</span>
                </div>:''))}
        </div>
)

    const sidebarM = (
        <div className={style.cadItems} style={{ opacity }} ref={refItem}>
            {ingredients.map((i) =>( i.type === 'main'?
                <div onClick={onOpenPopup} key={i._id}  name={i._id} className={style.item}>
                    {count > 0 && <Counter count={count} size="default" />}
                    <img className={style.imgItem} src={i.image}/>
                    <div className={style.priceItemsImg}>
                        <span className='text_type_digits-default'>{i.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span>{i.name}</span>
                </div>:''))}
        </div>
 )

    const sidebarS = (
        <div className={style.cadItems} style={{ opacity }} ref={refItem}>
            {ingredients.map((i) => ( i.type === 'sauce'?
                <div onClick={onOpenPopup} key={i._id}  name={i._id} className={style.item}>
                    {count > 0 && <Counter count={count} size="default" />}
                    <img className={style.imgItem} src={i.image}/>
                    <div className={style.priceItemsImg}>
                        <span className='text text_type_digits-default'>{i.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span>{i.name}</span>
                </div>:''))}
        </div>
   )



    const onScroll = () => {
        const distance = ref.current.getBoundingClientRect().y;
        const bunDistance = Math.abs(distance - bunRef.current.getBoundingClientRect().y);
        const sauceDistance = Math.abs(distance - sauceRef.current.getBoundingClientRect().y);
        const mainDistance = Math.abs(distance - mainRef.current.getBoundingClientRect().y);
        const minTabDistance = Math.min(bunDistance, sauceDistance, mainDistance);
        const activeTab = (minTabDistance === sauceDistance ? 'sauce' : (minTabDistance === mainDistance ? 'main' : 'bun'));
        setCurrent(activeTab);
    };

    const handleClick = (current) => {
        if (current === 'bun') bunRef.current.scrollIntoView(true);
        if (current === 'sauce') sauceRef.current.scrollIntoView(true);
        if (current === 'main') mainRef.current.scrollIntoView(true);
    };


    const TabIngradiant =()=> {
        return (
            <div className={style.tab}>
              <Tab value="bun" active={current === 'bun'} onClick={handleClick}>
                    Булки
                </Tab>
                 <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClick}>
                    Начинки
                </Tab>
            </div>
        )
    }

    return (
        <div className='text text_type_main-default'>
            <TabIngradiant ref={ref} onScroll={onScroll} />
            <div className={style.itemIngredientBody}>
                <div ref={bunRef} name="Булки" ename="bun">
                    <h3>Булки</h3>
                    {sidebar}
                </div>
                <div ref={sauceRef} name="Соусы" ename="sauce" >
                    <h3>Соусы</h3>
                    {sidebarS}
                </div>
                <div ref={mainRef} name="Начинки" ename="main" >
                    <h3>Инрадиенты</h3>
                    {sidebarM}
                </div>
            </div>
        </div>
    );
}