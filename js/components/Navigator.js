
import React, { Component } from 'react';
import {
    NativeModules,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainPage from './MainPage';

import * as actions from '../actions';

class Navigator extends Component {
    render() {
        const { categories, actions } = this.props;

        return (
            <View style={styles.container}>
                <MainPage categories={categories} actions={actions} />

                {false &&
                    <TestButton />
                }
            </View>
        );
    }
}

class TestButton extends Component {
    onPress() {
        // var LocalNotificationManager = NativeModules.LocalNotificationManager;
        // LocalNotificationManager.presentLocalNotificationNow('Yep, that\'s notification!');
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress.bind(this)}>
                <View style={styles.button}>
                    <Text>Send notification</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    button: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#eee',
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(
    state => ({
        categories: state.categories,
    }),
    dispatch => ({
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    })
)(Navigator);
