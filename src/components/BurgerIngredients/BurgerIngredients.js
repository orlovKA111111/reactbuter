import React  from 'react';
import {CurrencyIcon , Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from'./BurgerIngredientsStyle.module.css'
import Modal from './../Modal/Modal'
import {useModal} from "../ModalWithUseEffect/ModalWithUseEffect";



export default function BurgerIngredients (props) {
    const arrItems = props.items.data
    const {open} = useModal()

    const onOpenPopup = React.useCallback(((event) => {
        const itemsKey = event.currentTarget.getAttribute('name');
        const nextSelectedProduct = arrItems.find(product => product._id === itemsKey);
        return open(<Modal selectedItem={nextSelectedProduct}/>)
    }), [open, arrItems])


    const sidebar = (arrItems !== undefined ?(
        <div className={style.cadItems}>
            {arrItems.map((i) =>( i.type === 'bun' ?
                <div onClick={onOpenPopup} key={i._id}  name={i._id} className={style.item}>
                    <img className={style.imgItem} src={i.image}/>
                    <div className={style.priceItemsImg}>
                        <span className='text_type_digits-default'>{i.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span>{i.name}</span>
                </div>:''))}
        </div>
    ):'')

    const sidebarM = (arrItems !== undefined ?(
        <div className={style.cadItems}>
            {arrItems.map((i) =>( i.type === 'main'?
                <div onClick={onOpenPopup} key={i._id}  name={i._id} className={style.item}>
                    <img className={style.imgItem} src={i.image}/>
                    <div className={style.priceItemsImg}>
                        <span className='text_type_digits-default'>{i.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span>{i.name}</span>
                </div>:''))}
        </div>
    ):'')

    const sidebarS = (arrItems !== undefined ?(
        <div className={style.cadItems}>
            {arrItems.map((i) => ( i.type === 'sauce'?
                <div onClick={onOpenPopup} key={i._id}  name={i._id} className={style.item}>
                    <img className={style.imgItem} src={i.image}/>
                    <div className={style.priceItemsImg}>
                        <span className='text text_type_digits-default'>{i.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span>{i.name}</span>
                </div>:''))}
        </div>
    ):'')

    const TabIngradiant =()=> {
        const [current, setCurrent] = React.useState('bun')
        return (
            <div className={style.tab}>
              <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                 <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        )
    }

    return (
        <div className='text text_type_main-default'>
            <TabIngradiant />
            <div className={style.itemIngredientBody}>
                <div>
                    <h3>Булки</h3>
                    {sidebar}
                </div>
                <div>
                    <h3>Соусы</h3>
                    {sidebarS}
                </div>
                <div>
                    <h3>Инрадиенты</h3>
                    {sidebarM}
                </div>
            </div>
        </div>
    );
}