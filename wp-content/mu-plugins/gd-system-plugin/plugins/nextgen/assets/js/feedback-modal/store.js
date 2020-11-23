/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
	feedbackModal: false,
};

const actions = {
	toggleFeedbackModal: () => ( { type: 'TOGGLE_FEEDBACK_MODAL' } ),
};

const store = registerStore( 'nextgen/feedback-modal', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'TOGGLE_FEEDBACK_MODAL':
				return {
					...state,
					feedbackModal: ! state.feedbackModal,
				};
		}

		return state;
	},

	actions,

	selectors: {
		isFeedbackModalVisible: ( state ) => state.feedbackModal || false,
	},
} );

export default store;
