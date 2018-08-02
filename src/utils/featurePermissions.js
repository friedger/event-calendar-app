const permissions = {
    cancelled: [{ 'multi-calendar': { quantity: 1 } }],
    registered: [{ 'multi-calendar': { quantity: 1 } }, 'event-settings', 'subscriptions', 'theming', 'maps'],
    subscription: [{ 'multi-calendar': { quantity: 1 } }, 'event-settings', 'subscriptions', 'theming', 'maps'],
    hobby: [{ 'multi-calendar': { quantity: 1 } }, 'subscriptions'],
    professional: [{ 'multi-calendar': { quantity: 3 } }, 'event-settings', 'subscriptions', 'theming', 'maps'],
    business: [
        { 'multi-calendar': { quantity: 10 } },
        'event-settings',
        'subscriptions',
        'no-branding',
        'theming',
        'maps'
    ]
};

export default {
    checkFeatureAvailability(status, featureName) {
        return permissions[status].indexOf(featureName) > -1;
    }
};
