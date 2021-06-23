import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './products-container.module.css';
import { Product } from './product';
import { Input } from '../../ui/input/input';
import { MainButton } from '../../ui/main-button/main-button';
import { PromoButton } from '../../ui/promo-button/promo-button';
import { Loader } from '../../ui/loader/loader';
import { applyPromo, getItems } from "../../services/actions/cart";
import { useSelector, useDispatch } from "react-redux";

export const ProductsContainer = () => {
  const inputRef = useRef(null);
  
  const {
    items,
    postponed,
    promoCode,
    promoDiscount,
    promoRequest,
    promoFailed,
    itemsRequest
  } = useSelector(state => state.cart);
  
  const dispatch = useDispatch();

  const applyPromoCode = useCallback(() =>{
    dispatch(applyPromo(inputRef.current.value));
  }, [dispatch, inputRef]);

  useEffect(
    () => {
      if (!items.length && !postponed.length) dispatch(getItems());
    },
    [dispatch]
  );

  const content = useMemo(
    () => {
      return itemsRequest ? (
        <Loader size="large" />
      ) : (
        items.map((item, index) => {
          return <Product key={index} {...item} />;
        })
      );
    },
    [itemsRequest, items]
  );

  const promoCodeStatus = useMemo(
    () => {
      return promoFailed ? (
        <p className={styles.text}>Произошла ошибка! Проверьте корректность введенного промокода</p>
      ) : promoRequest ? (
        ''
      ) : !!promoCode && !!promoDiscount ? (
        <p className={styles.text}>Промокод успешно применён!</p>
      ) : (
        ''
      );
    },
    [promoRequest, promoDiscount, promoFailed, promoCode]
  );

  return (
    <div className={`${styles.container}`}>
      {content}
      <div className={styles.promo}>
        <div className={styles.inputWithBtn}>
          <Input
            type="text"
            placeholder="Введите промокод"
            extraClass={styles.input}
            inputWithBtn={true}
            inputRef={inputRef}
          />
          <MainButton
            type="button"
            extraClass={styles.promo_button}
            inputButton={true}
            onClick={applyPromoCode}
          >
            {promoRequest ? <Loader size="small" inverse={true} /> : 'Применить'}
          </MainButton>
        </div>
        {!!promoCode && !!promoDiscount && (
          <PromoButton extraClass={styles.promocode}>{promoCode}</PromoButton>
        )}
      </div>
      {promoCodeStatus}
    </div>
  );
};
