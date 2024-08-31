import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/product';
import usersReducer from './slices/users';
import videoReducer from './slices/video.slice';
import likeReducer from './slices/like.slice';
import subscribeReducer from './slices/subscribe.slice';

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  users: usersReducer,
  videos: videoReducer,
  likes: likeReducer,
  subscribeSlice: subscribeReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
