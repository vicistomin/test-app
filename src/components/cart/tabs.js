import React from 'react';
import styles from './tabs.module.css';
import { Tab } from './tab';

import { useSelector } from "react-redux";

export const Tabs = () => {
  const currentTab = useSelector(store => 
    store.cart.currentTab
  );

  return (
    <div className={`${styles.tabs}`}>
      <Tab text="Товары в корзине" active={currentTab === 'items' ? true : false} />
      <Tab text="Отложенные товары" active={currentTab === 'postponed' ? true : false} />
    </div>
  );
};
