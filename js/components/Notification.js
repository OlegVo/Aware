
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';

import Menu from './Menu';

class Notification extends Component {
    render() {
        const { actions, notification } = this.props;

        return (
            <View style={styles.container}>
                <Menu
                    actions={actions}
                    backButton={true}
                />

                <ScrollView>
                    <View style={[styles.separator, styles.topSeparator]}></View>

                    <View style={styles.shortTextBlock}>
                        <Text style={styles.shortText}>{notification.shortText}</Text>
                    </View>

                    {notification.text &&
                        <View style={styles.additionalTextBlock}>
                            <Text style={styles.additionalText}>{notification.text}</Text>
                        </View>
                    }

                    <View style={styles.separator}></View>
                </ScrollView>
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
        paddingVertical: 40,
        paddingHorizontal: 15,
    },
    shortText: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 30,
        color: 'rgb(164, 158, 158)'
    },
    additionalTextBlock: {
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    additionalText: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 22,
        color: 'rgb(95, 95, 95)'
    },
    separator: {
        height: 1,
        width: 140,
        backgroundColor: 'rgb(224, 224, 224)',
        alignSelf: 'center',
    },
    topSeparator: {
        marginTop: 50,
    },
});

export default Notification;
