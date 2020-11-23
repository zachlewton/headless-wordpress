/* global nextgenNuxPatterns */
/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { select, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { addQueryArgs } from '@wordpress/url';

domReady( () => {
	const {
		getLayouts,
		getCategories,
	} = select( 'coblocks/template-selector' );
	const {
		getSettings,
	} = select( 'core/block-editor' );

	const {
		updateLayouts,
		updateCategories,
	} = dispatch( 'coblocks/template-selector' );
	const {
		updateSettings,
	} = dispatch( 'core/block-editor' );

	// Load layouts from the WP NUX API.
	window.fetch( nextgenNuxPatterns.nuxApiEndpoint + '/layouts' )
		.then( ( response ) => response.json() )
		.then(
			( layouts ) => {
				const categories = getCategories();

				const addLayouts = layouts.map( ( layout ) => {
					const layoutCategory = layout.categories[ 0 ];

					if ( ! categories.find( ( category ) => category.slug === layoutCategory.toLowerCase() ) ) {
						categories.push( {
							slug: layoutCategory.toLowerCase(),
							title: layoutCategory,
						} );
					}

					return {
						category: layoutCategory.toLowerCase(),
						label: layout.title,
						postContent: layout.content,
					};
				} );

				updateLayouts( [
					...getLayouts(),
					...addLayouts,
				] );
				updateCategories( categories );
			}
		)
		.catch( ( error ) => console.log( error ) );

	// Load patterns from the WP NUX API.
	window.fetch( nextgenNuxPatterns.nuxApiEndpoint + '/patterns' )
		.then( ( response ) => response.json() )
		.then(
			( patterns ) => {
				const addPatterns = patterns.map( ( pattern ) => {
					return {
						title: pattern.title,
						name: `nextgen/${ pattern.slug }`,
						content: pattern.content,
						description: pattern.description,
						categories: pattern.categories,
					};
				} );

				updateSettings( {
					...getSettings(),
					__experimentalBlockPatterns: [
						...getSettings().__experimentalBlockPatterns,
						...addPatterns,
					],
				} );
			}
		)
		.catch( ( error ) => console.log( error ) );
} );

const getBlocksFromTemplate = ( name, attributes, innerBlocks = [] ) => {
	return createBlock( name, attributes,
		innerBlocks && innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
			getBlocksFromTemplate( blockName, blockAttributes, blockInnerBlocks )
		)
	);
};

const getTemplateFromBlocks = ( name, attributes, innerBlocks = [] ) => {
	return [ name, attributes,
		innerBlocks && innerBlocks.map( ( blockObject ) => {
			return getTemplateFromBlocks( blockObject.name, blockObject.attributes, blockObject.innerBlocks );
		} ),
	];
};

addFilter(
	'coblocks.layoutPreviewBlocks',
	'nextgen/nux-api/layoutsPreviewBlocks',
	( blocks ) => {
		// Recurse all attributes of a block and add new query args to any URL pointing to the WP NUX API /image endpoint.
		const updateAttributesRecursively = ( attributes ) => {
			// Convert attributes back into an object when we finally return.
			return Object.fromEntries(
				// Convert attributes to an array so we can map through it.
				( Array.isArray( attributes ) ? attributes : Object.entries( attributes ) )
					.map( ( [ attrKey, attrVal ] ) => {
						// Recurse into the attribute value if it's an array.
						if ( Array.isArray( attrVal ) ) {
							return [ attrKey, attrVal.map( updateAttributesRecursively ) ];
						}

						// Add our new query args to WP NUX API /image URI's.
						if ( typeof attrVal === 'string' && attrVal.includes( nextgenNuxPatterns.nuxApiEndpoint + '/image' ) ) {
							return [ attrKey, addQueryArgs( attrVal, {
								size: 'large',
								category: nextgenNuxPatterns.wpnuxTemplate,
							} ) ];
						}

						// Return any untouched values.
						return [ attrKey, attrVal ];
					} )
			);
		};

		// Recurse all blocks within the layout so we can update the necessary attributes.
		const applyImageSizeParam = ( [ name, attributes, innerBlocks ] ) => {
			return [
				name,
				updateAttributesRecursively( attributes ),
				// Make sure we recurse through all innerBlocks attributes.
				innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
					[ blockName, updateAttributesRecursively( blockAttributes ), blockInnerBlocks ]
				),
			];
		};

		// Filter the block attributes and return them.
		return blocks
			// Step 1: Convert block objects into an array format for manipulation.
			.map( ( block ) => getTemplateFromBlocks( block.name, block.attributes, block.innerBlocks ) )
			// Step 2: Recurse through all blocks and innerBlocks within the layout and update the necessary attributes within them.
			.map( applyImageSizeParam )
			// Step 3: Convert the array of blocks back into objects format.
			.map( ( block ) => getBlocksFromTemplate( ...block ) );
	}
);
