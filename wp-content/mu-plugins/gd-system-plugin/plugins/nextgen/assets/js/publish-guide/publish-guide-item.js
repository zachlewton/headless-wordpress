/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

export default class PublishGuideItem extends Component {
	render() {
		const {
			children,
			isComplete = false,
			isHighlighted = false,
			text,
			title,
			toggleComplete,
		} = this.props;

		return (
			<li
				className={ classnames(
					'publish-guide-popover__item',
					{ 'publish-guide-popover__item--highlight': isHighlighted }
				) }
			>
				<div className="publish-guide-popover__item__controls">
					<CheckboxControl
						onChange={ () => toggleComplete() }
						checked={ isComplete }
					/>
				</div>
				<div className="publish-guide-popover__item__content">
					<h2 className="publish-guide-popover__item__title">{ title }</h2>
					{ ! isComplete && <p className="publish-guide-popover__item__text">{ text }</p> }

					{ children }
				</div>
			</li>
		);
	}
}
