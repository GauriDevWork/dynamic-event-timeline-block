import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import metadata from './block.json';

/**
 * Registers the Event Timeline block.
 *
 * Uses a dynamic block pattern — save() returns null and PHP
 * handles all frontend rendering via render.php.
 * Attributes are persisted as JSON in post_content.
 */
registerBlockType( metadata.name, {
    edit: ( { attributes, setAttributes } ) => {
        const { orientation, darkMode } = attributes;
        const blockProps = useBlockProps( {
            className: `detb-timeline detb-orientation-${ orientation }${ darkMode ? ' detb-dark' : '' }`,
        } );

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Timeline Settings" initialOpen={ true }>
                        <SelectControl
                            label="Orientation"
                            value={ orientation }
                            options={ [
                                { label: 'Vertical',   value: 'vertical' },
                                { label: 'Horizontal', value: 'horizontal' },
                            ] }
                            onChange={ ( value ) => setAttributes( { orientation: value } ) }
                        />
                        <ToggleControl
                            label="Dark Mode"
                            checked={ darkMode }
                            onChange={ ( value ) => setAttributes( { darkMode: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>

                <div { ...blockProps }>
                    <p>Event Timeline — { orientation } layout{ darkMode ? ' · Dark Mode' : '' }</p>
                </div>
            </>
        );
    },

    save: () => null,
} );