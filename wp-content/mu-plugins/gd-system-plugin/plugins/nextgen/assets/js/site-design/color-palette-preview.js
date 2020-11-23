/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Button,
	ColorIndicator,
	ColorPicker,
	Dropdown,
} from '@wordpress/components';

export default class ColorPalettePreview extends Component {
	titleCase( str ) {
		const splitStr = str.toLowerCase().split( ' ' );
		for ( let i = 0; i < splitStr.length; i++ ) {
			splitStr[ i ] = splitStr[ i ].charAt( 0 ).toUpperCase() + splitStr[ i ].substring( 1 );
		}
		return splitStr.join( ' ' );
	}

	onChangePalette = ( event ) => {
		event.preventDefault();

		if ( this.props.onChangePalette ) {
			this.props.onChangePalette();
		}
	}

	onChangeColor = ( name, color ) => {
		if ( this.props.onChangeColor ) {
			this.props.onChangeColor( name, color );
		}
	}

	render() {
		const {
			isActive,
			palette,
		} = this.props;

		const classes = classnames( 'color-palette__body', {
			'is-opened': isActive,
		} );

		const getColorValue = ( name, defaultColor ) => {
			const { isActive, customColors } = this.props;
			const activePalette = Object.keys( customColors ).shift();

			if ( isActive && typeof activePalette !== 'undefined' && customColors[ name ] ) {
				return customColors[ name ].includes( '#' ) ? customColors[ name ] : `#${ customColors[ name ] }`;
			}

			return defaultColor;
		};

		return (
			<div className={ classes }>
				<div className="color-palette__preview">
					<Button
						className="color-palette__preview-button"
						onClick={ this.onChangePalette }
						aria-expanded={ isActive }>

						{ Object.entries( palette ).map(
							( [ name, colorValue ] ) =>
								<ColorIndicator key={ `color-preview-${ name }` } colorValue={ getColorValue( name, colorValue ) } />
						) }
					</Button>
				</div>
				{ isActive && (
					<div className="color-palette__colors">
						{ Object.entries( palette ).map( ( [ name, color ] ) =>
							<Dropdown
								key={ `color-picker-${ name }` }
								position="bottom center"
								renderToggle={ ( { isOpen, onToggle } ) =>
									<Button isLink onClick={ onToggle } aria-expanded={ isOpen }>
										<ColorIndicator key={ `color-${ name }` } colorValue={ getColorValue( name, color ) } />
										{ this.titleCase( name ) }
									</Button>
								}
								renderContent={ () =>
									<ColorPicker
										color={ getColorValue( name, color ) }
										onChangeComplete={ ( value ) => this.onChangeColor( name, value ) }
										disableAlpha
									/>
								}
							/>
						) }
					</div>
				) }
			</div>
		);
	}
}
