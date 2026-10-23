/**
 * Block variations for the Event Timeline block.
 *
 * Variations appear in the block inserter as separate entries.
 * Each pre-populates events and sets a default configuration.
 */

const variations = [
    {
        name:        'company-history',
        title:       'Company History Timeline',
        description: 'A vertical timeline for showcasing company milestones.',
        icon:        'building',
        attributes:  {
            orientation: 'vertical',
            darkMode:    false,
            events: [
                {
                    id:          '1',
                    title:       'Company Founded',
                    date:        '2010-01-01T00:00:00',
                    description: 'The company was established with a vision to innovate.',
                    imageUrl:    '',
                    imageAlt:    '',
                    icon:        'star',
                    status:      'completed',
                },
                {
                    id:          '2',
                    title:       'First Product Launch',
                    date:        '2012-06-15T00:00:00',
                    description: 'Our flagship product reached the market.',
                    imageUrl:    '',
                    imageAlt:    '',
                    icon:        'launch',
                    status:      'completed',
                },
                {
                    id:          '3',
                    title:       'Global Expansion',
                    date:        '2015-03-01T00:00:00',
                    description: 'Opened offices in 5 new countries.',
                    imageUrl:    '',
                    imageAlt:    '',
                    icon:        'pin',
                    status:      'completed',
                },
            ],
        },
        isDefault: false,
    },
    {
        name:        'travel-itinerary',
        title:       'Travel Itinerary',
        description: 'A horizontal timeline for planning travel stops.',
        icon:        'location',
        attributes:  {
            orientation: 'horizontal',
            darkMode:    false,
            events: [
                {
                    id:          '1',
                    title:       'Departure',
                    date:        '2026-12-01T06:00:00',
                    description: 'Flight departs early morning.',
                    imageUrl:    '',
                    imageAlt:    '',
                    icon:        'launch',
                    status:      'upcoming',
                },
                {
                    id:          '2',
                    title:       'First Stop',
                    date:        '2026-12-03T10:00:00',
                    description: 'Arrive and check in to the hotel.',
                    imageUrl:    '',
                    imageAlt:    '',
                    icon:        'pin',
                    status:      'upcoming',
                },
                {
                    id:          '3',
                    title:       'Return Home',
                    date:        '2026-12-10T18:00:00',
                    description: 'Flight back home.',
                    imageUrl:    '',
                    imageAlt:    '',
                    icon:        'calendar',
                    status:      'upcoming',
                },
            ],
        },
        isDefault: false,
    },
];

export default variations;