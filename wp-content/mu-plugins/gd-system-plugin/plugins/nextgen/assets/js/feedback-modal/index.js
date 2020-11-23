/* global nextgenFeedbackModalData */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Icon, Modal } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { verse } from '@wordpress/icons';
import { PinnedItems } from '@wordpress/interface';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import './store';
import FeedbackModalComment from './feedback-modal-comment.js';
import FeedbackModalRatings from './feedback-modal-ratings.js';
import FeedbackModalSuccess from './feedback-modal-success.js';

const FeedbackModal = ( props ) => {
	const { isVisible, toggleFeedbackModal } = props;

	const [ isCompleted, setCompleted ] = useState( false );
	const [ selectedRating, setSelectedRating ] = useState( null );

	const onSendComment = ( comment ) => onSendFeedback( comment );

	const onSendFeedback = ( comment = null ) => {
		const apiUrl = nextgenFeedbackModalData.api_url;
		const bodyData = { ...nextgenFeedbackModalData };
		delete bodyData.api_url;

		if ( ! selectedRating ) {
			return toggleFeedbackModal();
		}

		const body = JSON.stringify( {
			...bodyData,
			comment: comment ?? '',
			domain: window.location.hostname,
			score: selectedRating,
		} );

		const requestOptions = {
			body,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		};

		fetch( apiUrl, requestOptions )
			.then( async ( response ) => {
				const data = await response.json();

				if ( ! response.ok ) {
					const error = ( data && data.message ) || response.status;

					return Promise.reject( error );
				}

				setCompleted( true );

				if ( ! comment ) {
					toggleFeedbackModal();
				}
			} )
			.catch( () => toggleFeedbackModal() );
	};

	return (
		<PinnedItems scope="core/edit-post">
			<Button
				className="feedback-modal-button"
				onClick={ toggleFeedbackModal }>
				<Icon icon={ verse } />
				<span>
					{ __( 'Give feedback', 'nextgen' ) }
				</span>
			</Button>

			{ isVisible &&
				<Modal
					className="feedback-modal"
					onRequestClose={ () => onSendFeedback() }
				>
					{ ! isCompleted ? (
						<>
							<h2 className="feedback-modal__title">{ __( 'Give feedback', 'nextgen' ) }</h2>
							<p>{ __( 'How would you rate your experience?', 'nextgen' ) }</p>

							<FeedbackModalRatings
								callback={ setSelectedRating }
								limit={ 5 }
								selectedRating={ selectedRating } />

							{ selectedRating &&
								<FeedbackModalComment
									callback={ onSendComment }
									selectedRating={ selectedRating } />
							}
						</>
					) : <FeedbackModalSuccess callback={ toggleFeedbackModal } /> }
				</Modal>
			}

		</PinnedItems>
	);
};

registerPlugin( 'feedback-modal', {
	render: compose( [

		withSelect( ( select ) => {
			const { isFeedbackModalVisible } = select( 'nextgen/feedback-modal' );

			return {
				isVisible: isFeedbackModalVisible(),
			};
		} ),

		withDispatch( ( dispatch ) => {
			const { toggleFeedbackModal } = dispatch( 'nextgen/feedback-modal' );

			return {
				toggleFeedbackModal,
			};
		} ),

	] )( FeedbackModal ),
} );
