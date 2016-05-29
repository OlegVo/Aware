
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
import Settings from './Settings';
import Notification from './Notification';

import * as actions from '../actions';

const window = Dimensions.get('window');

let startScreenPosition;
let rightPanelPosition;

class Navigator extends Component {
    constructor(props) {
        super(props);

        const { page } = props;

        startScreenPosition = page == 'startScreen' ? 0 : -window.width;
        rightPanelPosition = page == 'notification' || page == 'settings' ? 0 : window.width;

        this.startScreenPan = new Animated.Value(startScreenPosition);
        this.rightPanelPan = new Animated.Value(rightPanelPosition);

        this.animatedStyles = {
            startScreen: {
                left: this.startScreenPan
            },
            rightPanel: {
                left: this.rightPanelPan
            }
        };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return (gestureState.dx > 20 || gestureState.dx < -20);
            },
            onPanResponderMove: (evt, gestureState) => {
                const { page } = this.props;

                const leftPanelOpened = (page == 'startScreen');
                const rightPanelOpened = (page == 'notification' || page == 'settings');

                if (leftPanelOpened && gestureState.dx < 0) {
                    let value = startScreenPosition + gestureState.dx;
                    if (value > 0) {
                        value = 0;
                    }

                    this.startScreenPan.setValue(value);
                }

                if (!leftPanelOpened && !rightPanelOpened) {
                    if (gestureState.dx > 40) {
                        let value = startScreenPosition + gestureState.dx;
                        this.startScreenPan.setValue(value);
                    }
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
            },
            onPanResponderTerminate: () => {
                Animated.timing(this.startScreenPan, {
                    toValue: startScreenPosition,
                    easing: Easing.inOut(Easing.cubic),
                    duration: 200,
                }).start();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            const page = nextProps.page;

            startScreenPosition = (page == 'startScreen' ? 0 : -window.width);
            Animated.timing(this.startScreenPan, {
                toValue: startScreenPosition,
                easing: Easing.inOut(Easing.cubic),
                duration: 200,
            }).start();

            rightPanelPosition = (page == 'notification' || page == 'settings' ? 0 : window.width);
            Animated.timing(this.rightPanelPan, {
                toValue: rightPanelPosition,
                easing: Easing.inOut(Easing.cubic),
                duration: 200,
            }).start();
        }
    }

    render() {
        const { categories, page, step, notifications, displayedNotification, settings, actions } = this.props;

        const barStyle = page != 'startScreen' ? 'light-content' : 'default';

        return (
            <View style={styles.container} {...this.panResponder.panHandlers}>
                <StatusBar
                    animated={true}
                    barStyle={barStyle}
                />

                <MainPage shown={(page == 'main')} categories={categories} notifications={notifications} actions={actions} />

                <Animated.View style={[styles.screen, this.animatedStyles.startScreen]}>
                    <StartScreen step={step} actions={actions} />
                </Animated.View>

                <Animated.View style={[styles.screen, this.animatedStyles.rightPanel]}>
                    {page == 'notification' &&
                        <Notification actions={actions} notification={displayedNotification} />
                    }

                    {page != 'notification' &&
                        <Settings settings={settings} actions={actions}/>
                    }
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
    // стиль для экранов, выезжающих слева и справа
    screen: {
        position: 'absolute',
        top: 0,
        width: window.width,
        height: window.height,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 2,
        shadowOpacity: 0.1,
    },
    settings: {
        position: 'absolute',
        top: 0,
        width: window.width,
        height: window.height,
    },
});

export default connect(
    state => state,
    dispatch => ({
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    })
)(Navigator);
