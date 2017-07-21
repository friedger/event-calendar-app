const permissions = {
    hobby: [],
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
