
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Dimensions,
    Animated,
    PanResponder,
    Easing,
    StatusBar,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StartScreen from './StartScreen';
import MainPage from './MainPage';

import * as actions from '../actions';

const window = Dimensions.get('window');

let startScreenPosition;

class Navigator extends Component {
    constructor(props) {
        super(props);

        const { page } = props;
        startScreenPosition = page == 'startScreen' ? 0 : -window.width;

        this.startScreenPan = new Animated.Value(startScreenPosition);

        this.animatedStyles = {
            startScreen: {
                left: this.startScreenPan
            }
        };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: (evt, gestureState) => {
                return (gestureState.dx > 20 || gestureState.dx < 20);
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return (gestureState.dx > 20 || gestureState.dx < 20);
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 40 || gestureState.dx < 0) {
                    let value = startScreenPosition + gestureState.dx;
                    if (value > 0) {
                        value = 0;
                    }

                    this.startScreenPan.setValue(value);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                let newPage;

                if (gestureState.vx > 0 && gestureState.dx > 40) {
                    newPage = 'startScreen';
                }

                if (gestureState.vx < 0) {
                    newPage = 'main';
                }

                if (newPage && newPage !== this.props.page) {
                    this.props.actions.showPage(newPage)
                } else {
                    Animated.timing(this.startScreenPan, {
                        toValue: startScreenPosition,
                        easing: Easing.inOut(Easing.cubic),
                        duration: 200,
                    }).start();
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            startScreenPosition = (nextProps.page == 'startScreen' ? 0 : -window.width);
            Animated.timing(this.startScreenPan, {
                toValue: startScreenPosition,
                easing: Easing.inOut(Easing.cubic),
                duration: 200,
            }).start();
        }
    }

    render() {
        const { categories, page, step, notifications, actions } = this.props;

        const barStyle = page != 'startScreen' ? 'light-content' : 'default';

        return (
            <View style={styles.container} {...this.panResponder.panHandlers}>
                <StatusBar
                    animated={true}
                    barStyle={barStyle}
                />

                <MainPage categories={categories} notifications={notifications} actions={actions} />

                <Animated.View style={[styles.startScreen, this.animatedStyles.startScreen]}>
                    <StartScreen step={step} actions={actions} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: window.height,
    },
    startScreen: {
        position: 'absolute',
        top: 0,
        width: window.width,
        height: window.height,
    },
});

export default connect(
    state => ({
        page: state.page,
        step: state.step,
        categories: state.categories,
        settings: state.settings,
        notifications: state.notifications,
    }),
    dispatch => ({
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    })
)(Navigator);
