import { combineReducers } from 'redux';
import { cartReducer } from "./cart";
import { deliveryReducer } from './delivery';
import { checkoutReducer } from './checkout';

import {
  PREVIOUS_STEP,
  NEXT_STEP
} from '../actions';

const stepReducer = (state = 'cart', action) => {
  switch (action.type) {
    case NEXT_STEP: {
      return state === 'cart'
        ? 'delivery'
        : state === 'delivery'
        ? 'checkout'
        : state === 'checkout'
        ? 'checkout'
        : 'checkout';
    }
    case PREVIOUS_STEP: {
      return state === 'cart'
        ? 'cart'
        : state === 'delivery'
        ? 'cart'
        : state === 'checkout'
        ? 'delivery'
        : 'cart';
    }
    default:
      return state
    }
}

export const rootReducer = combineReducers({
  cart: cartReducer,
  step: stepReducer,
  delivery: deliveryReducer,
  checkout: checkoutReducer
})
