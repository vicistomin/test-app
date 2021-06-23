import React, { useMemo } from 'react';
import { AmountButton } from '../../ui/amount-button/amount-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import styles from './product.module.css';

import { useSelector, useDispatch } from "react-redux";

import {
  INCREASE_ITEM,
  DECREASE_ITEM,
  DELETE_ITEM
} from '../../services/actions/cart';

import { priceFormat } from '../common/utils';
import { useDrag } from 'react-dnd';

export const Product = ({ src, id, text, qty, price }) => {
  const discount = useSelector(store => 
    store.cart.promoDiscount
  );
  const dispatch = useDispatch();
  
  const discountedPrice = useMemo(() => ((price - price * (discount / 100)) * qty).toFixed(0), [
    discount,
    price,
    qty
  ]);

  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      id
    });
  };

  const decrease = () => {
    if (qty === 1) {
      onDelete();
    } else {
      dispatch({type: DECREASE_ITEM, id: id});
    }
  };

  const increase = () => {
    dispatch({type: INCREASE_ITEM, id: id});
  };

  const [{opacity}, dragRef] = useDrag({
    type: "items",
    item: {id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div className={`${styles.product}`} style={{opacity}}>
      <div className={styles.productBox} ref={dragRef}>
        <img className={styles.img} src={src} alt="фото товара." />
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.amountbox}>
        <AmountButton onClick={decrease}>-</AmountButton>
        <p className={styles.amount}>{qty}</p>
        <AmountButton onClick={increase}>+</AmountButton>
      </div>
      <div className={styles.price}>
        <p className={`${styles.price} ${discount && styles.exPrice}`}>
          {priceFormat(price * qty)}
        </p>
        {discount && <p className={styles.price}>{priceFormat(discountedPrice)}</p>}
      </div>
      <DeleteButton onDelete={onDelete} />
    </div>
  );
};
