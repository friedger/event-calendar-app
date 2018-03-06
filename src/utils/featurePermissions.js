const permissions = {
    cancelled: [{ 'multi-calendar': { quantity: 1 } }],
    registered: [{ 'multi-calendar': { quantity: 1 } }, 'event-settings', 'subscriptions', 'theming'],
    subscription: [{ 'multi-calendar': { quantity: 1 } }, 'event-settings', 'subscriptions', 'theming'],
    hobby: [{ 'multi-calendar': { quantity: 1 } }],
    professional: [{ 'multi-calendar': { quantity: 3 } }, 'event-settings', 'subscriptions', 'theming'],
    business: [
        { 'multi-calendar': { quantity: 10 } },
        'event-settings',
        'subscriptions',
        'no-branding',
        'theming'
    ]
};

export default {
    checkFeatureAvailability(status, featureName) {
        return permissions[status].indexOf(featureName) > -1;
    }
};
