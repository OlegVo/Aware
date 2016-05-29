
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import Menu from './Menu';

class Settings extends Component {
    render() {
        const { categories, page, step, notifications, actions } = this.props;
        return (
            <View style={styles.settingsScreen}>
                <Menu
                    actions={actions}
                    backButton={true}
                />

                <ScrollView>
                    <View>
                        <View style={styles.selectedCategories}>
                            <View style={styles.titleIcon}>
                                <Image source={require('./assets/Bell_Icon.png')} />
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Количество оповещений в&nbsp;день</Text>
                            </View>
                            <TouchableOpacity>
                                <View>
                                    <Text style={styles.notificationNum}>5</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.categorySeparator}></View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settingsScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 30,
        color: 'rgb(164, 158, 158)'
    },
    notificationNum: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 24,
        lineHeight: 30,
        color: 'rgb(94, 94, 94)',
        marginTop: 12
    },
    titleIcon: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    categorySeparator: {
        height: 1,
        width: 140,
        backgroundColor: 'rgb(224, 224, 224)',
        alignSelf: 'center',
        marginTop: 18
    }
});

export default Settings;
