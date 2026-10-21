import './style.scss';
import './editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    TextareaControl,
    Button,
    Popover,
    DateTimePicker,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
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

        // openDatePickerIndex is local UI state — which popover is open.
        // It does not need to persist across saves, so useState is correct here.
        // Block attributes are for content data only, not transient UI state.
        const [ openDatePickerIndex, setOpenDatePickerIndex ] = useState( null );

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
                        imageUrl:    '',
                        imageAlt:    '',
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
                                position:     'relative',
                            } }
                        >
                            <TextControl
                                label="Event Title"
                                value={ event.title }
                                onChange={ ( value ) => updateEvent( index, 'title', value ) }
                            />

                            { /* Date picker field */ }
                            <div style={ { marginBottom: '8px' } }>
                                <label style={ { display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' } }>
                                    Date
                                </label>
                                <Button
                                    variant="secondary"
                                    onClick={ () => setOpenDatePickerIndex(
                                        openDatePickerIndex === index ? null : index
                                    ) }
                                >
                                    { event.date ? event.date : 'Pick a date' }
                                </Button>
                                { openDatePickerIndex === index && (
                                    <Popover
                                        placement="bottom-start"
                                        onClose={ () => setOpenDatePickerIndex( null ) }
                                    >
                                        <DateTimePicker
                                            currentDate={ event.date || null }
                                            onChange={ ( value ) => {
                                                updateEvent( index, 'date', value );
                                                setOpenDatePickerIndex( null );
                                            } }
                                            is12Hour={ false }
                                        />
                                    </Popover>
                                ) }
                            </div>

                            <TextareaControl
                                label="Description"
                                value={ event.description }
                                onChange={ ( value ) => updateEvent( index, 'description', value ) }
                            />

                            { /* Image upload */ }
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => {
                                        updateEvent( index, 'imageUrl', media.url );
                                        updateEvent( index, 'imageAlt', media.alt || media.title || '' );
                                    } }
                                    allowedTypes={ [ 'image' ] }
                                    value={ event.imageUrl }
                                    render={ ( { open } ) => (
                                        <div style={ { marginBottom: '8px' } }>
                                            { event.imageUrl ? (
                                                <>
                                                    <img
                                                        src={ event.imageUrl }
                                                        alt={ event.imageAlt }
                                                        style={ { maxWidth: '100%', marginBottom: '8px', display: 'block' } }
                                                    />
                                                    <Button variant="secondary" onClick={ open }>
                                                        Replace Image
                                                    </Button>
                                                    <Button
                                                        isDestructive
                                                        variant="link"
                                                        onClick={ () => {
                                                            updateEvent( index, 'imageUrl', '' );
                                                            updateEvent( index, 'imageAlt', '' );
                                                        } }
                                                        style={ { marginLeft: '8px' } }
                                                    >
                                                        Remove Image
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button variant="secondary" onClick={ open }>
                                                    Add Image
                                                </Button>
                                            ) }
                                        </div>
                                    ) }
                                />
                            </MediaUploadCheck>

                            <Button
                                isDestructive
                                variant="secondary"
                                onClick={ () => removeEvent( index ) }
                            >
                                Remove Event
                            </Button>
                        </div>
                    ) ) }

                    <Button variant="primary" onClick={ addEvent }>
                        + Add Event
                    </Button>
                </div>
            </>
        );
    },

    save: () => null,
} );