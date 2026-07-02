import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    TextareaControl,
    Button,
} from '@wordpress/components';
import metadata from './block.json';

/**
 * Registers the Event Timeline block.
 *
 * Dynamic block — save() returns null.
 * PHP render.php handles all frontend output.
 * Attributes are persisted as JSON in post_content.
 */
registerBlockType( metadata.name, {
    edit: ( { attributes, setAttributes } ) => {
        const { events, orientation, darkMode } = attributes;
        const blockProps = useBlockProps( {
            className: `detb-timeline detb-orientation-${ orientation }${ darkMode ? ' detb-dark' : '' }`,
        } );

        /**
         * Adds a new empty event to the events array.
         */
        const addEvent = () => {
            setAttributes( {
                events: [
                    ...events,
                    {
                        id:          String( Date.now() ),
                        title:       '',
                        date:        '',
                        description: '',
                    },
                ],
            } );
        };

        /**
         * Updates a single field on an event at the given index.
         *
         * @param {number} index - Index of the event to update.
         * @param {string} field - Attribute key to update.
         * @param {string} value - New value.
         */
        const updateEvent = ( index, field, value ) => {
            const updated = events.map( ( event, i ) =>
                i === index ? { ...event, [ field ]: value } : event
            );
            setAttributes( { events: updated } );
        };

        /**
         * Removes an event at the given index.
         *
         * @param {number} index - Index of the event to remove.
         */
        const removeEvent = ( index ) => {
            setAttributes( {
                events: events.filter( ( _, i ) => i !== index ),
            } );
        };

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
                    <h3>Event Timeline — { orientation }{ darkMode ? ' · Dark Mode' : '' }</h3>

                    { events.length === 0 && (
                        <p style={ { color: '#999' } }>No events yet. Add your first event below.</p>
                    ) }

                    { events.map( ( event, index ) => (
                        <div
                            key={ event.id }
                            style={ {
                                border:       '1px solid #ddd',
                                padding:      '12px',
                                marginBottom: '12px',
                                borderRadius: '4px',
                            } }
                        >
                            <TextControl
                                label="Event Title"
                                value={ event.title }
                                onChange={ ( value ) => updateEvent( index, 'title', value ) }
                            />
                            <TextControl
                                label="Date"
                                value={ event.date }
                                onChange={ ( value ) => updateEvent( index, 'date', value ) }
                            />
                            <TextareaControl
                                label="Description"
                                value={ event.description }
                                onChange={ ( value ) => updateEvent( index, 'description', value ) }
                            />
                            <Button
                                isDestructive
                                variant="secondary"
                                onClick={ () => removeEvent( index ) }
                            >
                                Remove Event
                            </Button>
                        </div>
                    ) ) }

                    <Button
                        variant="primary"
                        onClick={ addEvent }
                    >
                        + Add Event
                    </Button>
                </div>
            </>
        );
    },

    save: () => null,
} );