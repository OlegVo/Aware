
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import Menu from './Menu';

class Notification extends Component {
    render() {
        const { actions, notification } = this.props;

        console.log('notification', notification)

        return (
            <View style={styles.container}>
                <Menu
                    actions={actions}
                    backButton={true}
                />

                <View style={styles.shortTextBlock}>
                    <Text style={styles.shortText}>{notification.shortText}</Text>
                </View>

                <View style={styles.additionalTextBlock}>
                    <Text style={styles.additionalText}>{notification.text}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    shortTextBlock: {

    },
    shortText: {

    },
    additionalTextBlock: {

    },
    additionalText: {

    }
});

export default Notification;
