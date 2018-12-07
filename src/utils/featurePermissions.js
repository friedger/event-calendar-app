const permissions = {
    cancelled: [{ 'multi-calendar': { quantity: 1 } }],
    registered: [{ 'multi-calendar': { quantity: 1 } }, 'event-settings', 'subscriptions', 'theming', 'maps', 'social'],
    subscription: [{ 'multi-calendar': { quantity: 1 } }, 'event-settings', 'subscriptions', 'theming', 'maps', 'social'],
    hobby: [{ 'multi-calendar': { quantity: 1 } }, 'subscriptions', 'social'],
    professional: [{ 'multi-calendar': { quantity: 3 } }, 'event-settings', 'subscriptions', 'theming', 'maps', 'social'],
    business: [
        { 'multi-calendar': { quantity: 10 } },
        'event-settings',
        'subscriptions',
        'no-branding',
        'theming',
        'maps',
        'social'
    ]
};

export default {
    checkFeatureAvailability(status, featureName) {
        return permissions[status].indexOf(featureName) > -1;
    }
};
