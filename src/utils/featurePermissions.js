const permissions = {
    cancelled: [{ 'multi-calendar': { quantity: 1 } }],
    registered: [{ 'multi-calendar': { quantity: 1 } }],
    hobby: [{ 'multi-calendar': { quantity: 1 } }],
    professional: [{ 'multi-calendar': { quantity: 3 } }, 'event-settings', 'subscriptions'],
    business: [
        { 'multi-calendar': { quantity: 10 } },
        'event-settings',
        'subscriptions',
        'no-branding'
    ]
};

export default {
    checkFeatureAvailability(status, featureName) {
        return permissions[status].indexOf(featureName) > -1;
    }
};
