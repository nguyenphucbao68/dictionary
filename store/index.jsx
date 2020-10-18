import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import thunkMiddleware from 'redux-thunk';
import reducers from '../redux/index';

const store = (initialState, context) =>
	createStore(
		reducers,
		compose(applyMiddleware(thunkMiddleware), function (f) {
			return f;
		})
	);

export const wrapper = createWrapper(store, { debug: true });

// export default store;
