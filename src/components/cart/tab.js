import React from 'react';
import styles from './tab.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_ITEM,
  ADD_POSTPONED_ITEM,
  TAB_SWITCH,
  DELETE_ITEM,
  DELETE_POSTPONED_ITEM
} from '../../services/actions/cart';
import { useDrop } from 'react-dnd';

export const Tab = ({ text, tabName }) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(state => state.cart.currentTab);

  const switchTab = () => {
    dispatch({ type: TAB_SWITCH });
  };
  
  const [{isHover}, dropTarget] = useDrop({
    accept: tabName === 'items' ? 'postponed' : 'items',
    drop(itemId) {
      currentTab === 'items' ? (
        moveItem(itemId)
      ) : (
        movePostponedItem(itemId)
      )
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
  });
  
  const movePostponedItem = (item) => {
    dispatch({ type: ADD_ITEM, id: item.id });
    dispatch({ type: DELETE_POSTPONED_ITEM, id: item.id });
  }
  
  const moveItem = (item) => {
    dispatch({ type: ADD_POSTPONED_ITEM, id: item.id });
    dispatch({ type: DELETE_ITEM, id: item.id });
  }

  const className = `
    ${styles.tab}
    ${currentTab === tabName ? styles.tab_type_current : ''}
    ${isHover ? styles.onHover : ''}
   `;

  return (
    <div className={className} onClick={switchTab} ref={dropTarget}>
      {text}
    </div>
  );
};
