import get from 'lodash.get';

export default function (accountState, onboardingState, userState) {
    const plan = accountState && accountState.plan;
    const userClickedAddedScript = onboardingState && onboardingState.user_clicked_added_script;

    return plan && userClickedAddedScript === false && userState && !userState.weeblyUser;
}
