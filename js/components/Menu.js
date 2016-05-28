
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

class Menu extends Component {
    render() {
        const { actions } = this.props;
        
        return (
            <View style={styles.menu}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Aware</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={.8}
                    style={[styles.button, styles.buttonLeft]}
                    onPress={() => actions.showPage('startScreen')}
                >
                    <Image source={require('./assets/Question.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.8}
                    style={[styles.button, styles.buttonRight]}
                >
                    <Image source={require('./assets/Gear.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        paddingTop: 20,
        backgroundColor: 'rgb(72, 72, 72)',
    },
    title: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'rgb(216, 216, 216)',
        fontSize: 18,
        lineHeight: 22,
        fontFamily: 'Bitter-Bold'
    },
    button: {
        width: 25,
        height: 25,
        alignItems: 'center',
        position: 'absolute',
        top: 30,
    },
    buttonLeft: {
        left: 12,
        top: 34,
    },
    buttonRight: {
        right: 12,
    },
});

export default Menu;
