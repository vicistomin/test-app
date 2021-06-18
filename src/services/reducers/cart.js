import {
  INCREASE_ITEM,
  DECREASE_ITEM,
  DELETE_ITEM,
  CANCEL_PROMO,
  TAB_SWITCH,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED
} from '../actions/cart';

import {
  recommendedItems,
  items
} from '../initialData';

export const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  recommendedItems: recommendedItems,

  promoCode: '',
  promoDiscount: null,

  currentTab: 'items'
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_SWITCH:
      return (state.currentTab === 'items' ? (
        {...state, currentTab: 'postponed'}
      ) : (
        {...state, currentTab: 'items'}
      ))
    case INCREASE_ITEM: 
      return {
        ...state,
        items: [...state.items].map(item =>
          item.id === action.id ? { ...item, qty: ++item.qty } : item
        )
      };
    case DECREASE_ITEM:
      return {
        ...state,
        items: [...state.items].map(item =>
          item.id === action.id ? { ...item, qty: --item.qty } : item
        )
      };
    case DELETE_ITEM:
      return { ...state, items: [...state.items].filter(item => item.id !== action.id) };
    case CANCEL_PROMO:
      return { ...state, promoCode: initialState.promoCode, promoDiscount: initialState.promoDiscount };
    case GET_ITEMS_REQUEST:
      return { ...state, itemsRequest: true };
    case GET_ITEMS_SUCCESS:
      return { 
        ...state, 
        itemsRequest: false,
        itemsFailed: false,
        items: action.items
       };
    case GET_ITEMS_FAILED:
      return { 
        ...state, 
        itemsRequest: false,
        itemsFailed: true,
       };
    default:
      return state
    }
}
