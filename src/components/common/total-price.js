import { useSelector } from 'react-redux';
import styles from './total-price.module.css';

export const TotalPrice = ({ extraClass }) => {

  const { totalPrice, discount } = useSelector(store => ({
    totalPrice: store.cart.items.reduce(
      (acc, item) => acc + item.price * item.qty, 0
    ),
    discount: store.cart.promoDiscount
  }));
  const price = discount ? totalPrice - totalPrice * (discount / 100) : totalPrice;
  
  return (
    <div className={`${styles.container} ${extraClass}`}>
      <p className={styles.text}>Итого:</p>
      <p className={styles.cost}>{`${price.toFixed(0)} руб.`}</p>
    </div>
  );
};
