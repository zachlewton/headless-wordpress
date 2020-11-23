/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
	publishGuide: true,
};

const actions = {
	togglePublishGuide: () => ( { type: 'TOGGLE_PUBLISH_GUIDE' } ),
};

const store = registerStore( 'nextgen/publish-guide', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'TOGGLE_PUBLISH_GUIDE':
				return {
					...state,
					publishGuide: ! state.publishGuide,
				};
		}

		return state;
	},

	actions,

	selectors: {
		isPublishGuideActive: ( state ) => state.publishGuide || false,
	},
} );

export default store;
