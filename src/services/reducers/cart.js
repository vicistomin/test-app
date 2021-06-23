import {
  INCREASE_ITEM,
  DECREASE_ITEM,
  DELETE_ITEM,
  CANCEL_PROMO,
  TAB_SWITCH,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_RECOMMENDED_ITEMS_FAILED,
  GET_RECOMMENDED_ITEMS_REQUEST,
  GET_RECOMMENDED_ITEMS_SUCCESS,
  APPLY_PROMO_FAILED,
  APPLY_PROMO_REQUEST,
  APPLY_PROMO_SUCCESS,
  ADD_POSTPONED_ITEM,
  DELETE_POSTPONED_ITEM
} from '../actions/cart';

const initialState = {
  featured: [],
  postponed: [],

  items: [],
  itemsRequest: false,
  itemsFailed: false,

  recommendedItems: [],
  recommendedItemsRequest: false,
  recommendedItemsFailed: false,

  postponedItems: [],

  promoCode: '',
  promoDiscount: null,
  promoRequest: false,
  promoFailed: false,

  currentTab: 'items'
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_SWITCH:
      return (state.currentTab === 'items' ? (
        {...state, currentTab: 'postponed'}
      ) : (
        {...state, currentTab: 'items'}
      ));
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
        itemsFailed: true
       };
    case GET_RECOMMENDED_ITEMS_REQUEST:
      return { ...state, recommendedItemsRequest: true };
    case GET_RECOMMENDED_ITEMS_SUCCESS:
      return { 
        ...state, 
        recommendedItemsRequest: false,
        recommendedItemsFailed: false,
        recommendedItems: action.items
        };
    case GET_RECOMMENDED_ITEMS_FAILED:
      return { 
        ...state, 
        recommendedItemsRequest: false,
        recommendedItemsFailed: true
        };
    case APPLY_PROMO_REQUEST:
      return { ...state, promoRequest: true };
    case APPLY_PROMO_SUCCESS:
      return { 
        ...state,
        promoCode: action.value.code,
        promoDiscount: action.value.discount,
        promoRequest: false,
        promoFailed: false
        };
    case APPLY_PROMO_FAILED:
      return { 
        ...state, 
        promoDiscount: null,
        promoCode: '',
        promoRequest: false,
        promoFailed: true
        };
    case ADD_POSTPONED_ITEM:
      return {
        ...state,
        postponed: [
          ...state.postponed,
          ...state.items.filter(item => item.id === action.id)
        ]
      };
    case DELETE_POSTPONED_ITEM:
      return { 
        ...state, 
        postponed: [...state.postponed].filter(item => item.id !== action.id) 
      };
    default:
      return state
    }
}
