<?php
/**
 * Dynamic render callback for the Event Timeline block.
 *
 * $attributes['events'] contains an array of event objects, each with:
 *   - id          (string) Unique identifier generated at creation time.
 *   - title       (string) Event title entered by the editor.
 *   - date        (string) Event date string entered by the editor.
 *   - description (string) Event description entered by the editor.
 *
 * All output is escaped at the point of rendering to prevent XSS.
 *
 * @param array    $attributes Block attributes saved from the editor.
 * @param string   $content    Inner block content (unused - no InnerBlocks).
 * @param WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$events      = isset( $attributes['events'] ) ? $attributes['events'] : [];
$orientation = isset( $attributes['orientation'] ) ? $attributes['orientation'] : 'vertical';
$dark_mode   = isset( $attributes['darkMode'] ) && $attributes['darkMode'];

$wrapper_classes = sprintf(
    'detb-timeline detb-orientation-%s%s',
    esc_attr( $orientation ),
    $dark_mode ? ' detb-dark' : ''
);
?>
<div <?php echo get_block_wrapper_attributes( [ 'class' => $wrapper_classes ] ); ?>>

    <?php if ( empty( $events ) ) : ?>
        <p class="detb-no-events">
            <?php esc_html_e( 'No events have been added yet.', 'dynamic-event-timeline-block' ); ?>
        </p>
    <?php else : ?>
        <ul class="detb-events-list">
            <?php foreach ( $events as $event ) : ?>
                <li class="detb-event-item">

                    <?php if ( ! empty( $event['date'] ) ) : ?>
                        <time class="detb-event-date" datetime="<?php echo esc_attr( $event['date'] ); ?>">
                            <?php echo esc_html( $event['date'] ); ?>
                        </time>
                    <?php endif; ?>

                    <?php if ( ! empty( $event['title'] ) ) : ?>
                        <h3 class="detb-event-title">
                            <?php echo esc_html( $event['title'] ); ?>
                        </h3>
                    <?php endif; ?>

                    <?php if ( ! empty( $event['description'] ) ) : ?>
                        <p class="detb-event-description">
                            <?php echo esc_html( $event['description'] ); ?>
                        </p>
                    <?php endif; ?>

                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

</div>
