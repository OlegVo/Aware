
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
                <Menu actions={actions} />

                <ScrollView>
                    <View>
                        <View style={styles.selectedCategories}>
                            <View style={styles.titleIcon}>
                                <Image source={require('./assets/Bell_Icon.png')} />
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Количество оповещений в день</Text>
                            </View>
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
    titleIcon: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: -10,
    },
});

export default Settings;
