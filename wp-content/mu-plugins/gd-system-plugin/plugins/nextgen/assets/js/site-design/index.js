/* global nextgenSiteDesign, ajaxurl */
/**
 * External dependencies
 */
import { ColorPaletteIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { intersection, isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { Fragment, Component } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { PanelBody, BaseControl, Button, RadioControl, Icon } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import ColorPalettePreview from './color-palette-preview';
import FontPreviews from './font-preview';

class SiteDesign extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			designStyles: this.props.designStyles,
			designStyle: this.props.designStyle,
			designStyleObj: this.props.designStyleObj,
			colorPalette: this.props.colorPalette,
			customColors: this.props.currentColors,
			showSaveBtn: false,
			saveBtnLoading: false,
			selectedFont: this.getSelectedFont( this.props.currentFonts ),
			fontSize: this.props.fontSize,
			typeRatio: this.props.typeRatio,
		};
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( ! this.state.showSaveBtn ) {
			const stateToWatch = [
				'designStyle',
				'colorPalette',
				'customColors',
				'selectedFont',
				'fontSize',
				'typeRatio',
			];

			const shouldShowSave = stateToWatch.some( ( name ) => ! isEqual( prevState[ name ], this.state[ name ] ) );

			if ( shouldShowSave ) {
				this.setState( {
					showSaveBtn: true,
				} );
			}
		}

		// Display the save button when design settings have been changed and reset design properties.
		if ( this.state.designStyle === prevState.designStyle ) {
			return;
		}

		const designStyleObj = this.props.designStyles.find( ( design ) => design.slug === this.state.designStyle );
		this.setState( {
			designStyleObj,
			showSaveBtn: true,
		} );

		if ( this.props.currentFonts ) {
			this.setState( {
				selectedFont: this.getSelectedFont( designStyleObj.fonts ),
				fontSize: designStyleObj.font_size,
				typeRatio: designStyleObj.type_ratio,
			} );
		}
	}

	componentDidMount() {
		// Load the stylesheet into the editor for the current design settings.
		const { designStyle, colorPalette, currentColor } = this.props;
		this.stylesheetRequest( { designStyle, colorScheme: colorPalette, customColors: currentColor } );
	}

	getSelectedFont( currentFonts ) {
		if ( ! currentFonts ) {
			return 0;
		}

		const designStyleFonts = Object.entries( currentFonts )
			.map( ( font ) => font[ 0 ] );
		const fontsList = this.props.fonts.map( ( font ) => [ font[ 0 ][ 0 ], font[ 1 ][ 0 ] ] );

		// Find the package that has at least 2 fonts from the design style list
		const selectedFont = fontsList.findIndex( ( fonts ) => {
			return intersection( fonts, designStyleFonts ).length >= 2;
		} );

		return selectedFont || 0;
	}

	saveStylesheet = () => {
		return this.stylesheetRequest( {
			designStyle: this.state.designStyle,
			colorScheme: this.state.colorScheme,
			customColors: this.state.customColors,
			fonts: this.state.selectedFont,
			fontSize: this.state.fontSize,
			typeRatio: this.state.typeRatio,
			shouldUpdate: true,
		} );
	}

	stylesheetRequest = ( {
		designStyle,
		colorScheme = 'one',
		customColors = {},
		fonts = false,
		fontSize = false,
		typeRatio = false,
		shouldUpdate = false,
	} ) => {
		const body = new FormData();
		body.append( 'action', 'site_design_update_design_style' );
		body.append( 'design_style', designStyle );
		body.append( 'color_palette', colorScheme );
		body.append( 'fonts', fonts );
		body.append( 'font_size', fontSize );
		body.append( 'type_ratio', typeRatio );
		body.append( 'should_update', shouldUpdate );

		Object.keys( customColors ).forEach(
			( slug ) => body.append( `${ slug }_color`, customColors[ slug ] )
		);

		let stylesElement = document.getElementById( 'site-design-styles' );

		if ( ! stylesElement ) {
			stylesElement = document.createElement( 'style' );
			stylesElement.setAttribute( 'id', 'site-design-styles' );
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( stylesElement );
		}

		if ( shouldUpdate ) {
			this.setState( { saveBtnLoading: true } );
		}

		apiFetch( {
			url: ajaxurl,
			method: 'POST',
			body,
		} ).then( ( response ) => {
			if ( designStyle !== this.state.designStyle ) {
				this.setState( {
					designStyle,
					colorPalette: colorScheme,
					customColors,
				} );
			}

			this.updateColors( designStyle, colorScheme, customColors );

			stylesElement.innerHTML = [
				response.data.fontStyles,
				response.data.stylesheet,
				response.data.customColors,
				'.editor-post-title__input { height: auto !important; }',
			].join( ' ' );

			if ( shouldUpdate ) {
				this.setState( {
					showSaveBtn: false,
					saveBtnLoading: false,
				} );
			}
		} );
	}

	setDesignStyle = ( designStyle ) => {
		this.stylesheetRequest( { designStyle } );
	}

	setColorPalette = ( colorPalette ) => {
		if ( this.state.colorPalette === colorPalette ) {
			return;
		}

		const designStylePalette = this.props.designStyles.filter( ( style ) => style.slug === this.state.designStyle )[ 0 ];

		this.updateColors(
			this.state.designStyle,
			colorPalette,
			Object.fromEntries( designStylePalette.palettes )[ colorPalette ],
			{}
		);
		this.setState( { colorPalette } );
	}

	setCustomColor = ( name, color ) => {
		this.updateColors(
			this.state.designStyle,
			this.state.colorPalette,
			{ [ name ]: color }
		);
	}

	updateColors = ( designStyle, colorScheme, newColors ) => {
		const { getSettings, updateSettings } = this.props;

		const designStylePalette = this.props.designStyles.filter( ( style ) => style.slug === designStyle )[ 0 ];

		const colors = {
			...Object.fromEntries( designStylePalette.palettes )[ colorScheme ],
			...this.state.customColors,
			...newColors,
		};

		Object.entries( colors ).forEach( ( [ name, color ] ) => {
			document.documentElement.style.setProperty( `--go--color--${ name }`, color );
		} );

		// Update color settings.
		updateSettings( {
			...getSettings(),
			colors: Object.entries( colors ).map( ( [ slug, color ] ) => ( {
				name: slug,
				slug,
				color,
			} ) ),
		} );

		this.setState( {
			customColors: {
				...this.state.customColors,
				...newColors,
			},
		} );
	}

	render() {
		const { colorPalette, designStyle, selectedFont } = this.state;

		return (
			<Fragment>
				<PluginSidebar
					name="components-site-design-design-sidebar"
					title={ __( 'Site design', 'nextgen' ) }
					icon={ <Icon icon={ icon } /> } >

					{ this.state.showSaveBtn && (
						<BaseControl className="components-nextgen-site-design save-changes">
							<Button
								isPrimary
								isLarge
								disabled={ this.state.saveBtnLoading }
								onClick={ this.saveStylesheet }>
								{ __( 'Save', 'nextgen' ) }
							</Button>
						</BaseControl>
					) }

					<BaseControl className="components-site-design-styles">
						<RadioControl
							label={ __( "Choose a curated design style, then personalize your site's colors.", 'nextgen' ) }
							selected={ designStyle }
							options={ this.props.designStyles.map( ( style ) => ( { label: style.label, value: style.slug } ) ) }
							onChange={ this.setDesignStyle }
						/>
					</BaseControl>

					<PanelBody
						title={ __( 'Colors', 'nextgen' ) }
						className="site-design--colors__panel">
						<BaseControl className="components-site-design-color-palettes">
							{ this.props.designStyles.find( ( style ) => style.slug === designStyle ).palettes.map(
								( [ slug, colors ] ) => (
									<ColorPalettePreview
										key={ `palette-${ slug }` }
										palette={ colors }
										customColors={ this.state.customColors }
										isActive={ colorPalette.replace( `${ designStyle }-`, '' ) === slug }
										onChangePalette={ () => this.setColorPalette( slug ) }
										onChangeColor={ ( name, color ) => this.setCustomColor( name, color.hex ) } />
								)
							) }
						</BaseControl>
					</PanelBody>

					{
						this.props.fonts &&
						<PanelBody
							title={ __( 'Fonts', 'nextgen' ) }
							className="site-design--fonts__panel" >
							<FontPreviews
								fonts={ this.props.fonts }
								fontSize={ this.state.fontSize }
								typeRatio={ this.state.typeRatio }
								designFontSize={ this.state.designStyleObj?.font_size }
								designTypeRatio={ this.state.designStyleObj?.type_ratio }
								selected={ selectedFont }
								onChangeFont={ ( selectedFontIndex ) => this.setState( { selectedFont: selectedFontIndex } ) }
								onChangeFontSize={ ( fontSize ) => this.setState( { fontSize } ) }
								onChangeTypeRatio={ ( typeRatio ) => this.setState( { typeRatio } ) } />
						</PanelBody>
					}
				</PluginSidebar>
			</Fragment>
		);
	}
}

registerPlugin( 'nextgen-site-design', {
	icon,
	render: compose( [

		withSelect( ( select ) => {
			const { getSettings } = select( 'core/block-editor' );

			const designStyles = Object.entries( nextgenSiteDesign.availableDesignStyles ).map( ( [ , style ] ) => {
				return {
					...style,
					palettes: Object.entries( style.color_schemes ).map(
						( [ slug, colorScheme ] ) => {
							return [
								slug,
								Object.fromEntries(
									[ 'primary', 'secondary', 'tertiary', 'background' ].map( ( colorSlug ) => [ colorSlug, colorScheme[ colorSlug ] ] )
								),
							];
						}
					),
				};
			} );

			return {
				getSettings,
				designStyles,
				designStyle: nextgenSiteDesign.currentDesignStyle,
				designStyleObj: designStyles.find( ( design ) => design.slug === nextgenSiteDesign.currentDesignStyle ),
				colorPalette: nextgenSiteDesign.currentColorScheme,
				currentColors: Object.fromEntries( Object.entries( nextgenSiteDesign.currentColors ).filter( ( color ) => color[ 1 ] ) ),
				currentFonts: nextgenSiteDesign?.currentFonts,
				fontSize: nextgenSiteDesign?.fontSize,
				typeRatio: nextgenSiteDesign?.typeRatio,
				fonts: nextgenSiteDesign?.fonts?.map( ( font ) => Object.entries( font ) ),
			};
		} ),

		withDispatch( ( dispatch ) => {
			const { updateSettings } = dispatch( 'core/block-editor' );

			return {
				updateSettings,
			};
		} ),

	] )( SiteDesign ),
} );
