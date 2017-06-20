


import Immutable from 'immutable';

export default function ImmutableCompare (nextProps,nextState) {

    const thisProps = this.props || {},
        thisState = this.state || {},
        is = Immutable.is;
    nextProps = nextProps || {};
    nextState = nextState || {};

    if (Object.keys(thisProps).length !==
        Object.keys(nextProps).length ||
        Object.keys(thisState).length !==
        Object.keys(nextState).length) {
        return true;
    }
    for (const key in nextProps) {
        if ((thisProps[key] !== nextProps[key] || !is(Immutable.fromJS(thisProps[key]), Immutable.fromJS(nextProps[key])))&&typeof(thisProps[key])!="function") {
            return true;
        }
    }
    for (const key in nextState) {
        if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
            return true;
        }
    }
    return false;
};