import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

registerBlockType( metadata.name, {
    edit: () => {
        return (
            <div style={ { padding: '20px', border: '2px dashed #ccc' } }>
                <p>Event Timeline Block — Editor Placeholder</p>
            </div>
        );
    },
    save: () => null, // Dynamic block — PHP renders the frontend
} );