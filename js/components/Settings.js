
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

import _ from 'lodash';

class Settings extends Component {
    render() {
        const { actions, settings } = this.props;

        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        const soundNotifyLabel = settings.isSoundNotify ? 'Выключить' : 'Включить';
        const soundTriggerTextStyle = [styles.soundTrigger];
        // по умолчанию приложение работает в "тихом" режиме (подсвечиваем "выключить" зеленым)
        if (settings.isSoundNotify) {
            soundTriggerTextStyle.push(styles.soundTriggerSelected);
        }

        return (
            <View style={styles.settingsScreen}>
                <Menu
                    title='Настройки'
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
                    <View style={styles.selectedCategories}>
                        <View style={styles.titleIcon}>
                            <Image source={require('./assets/Calendar_Icon.png')} />
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Отправлять оповещения в&nbsp;дни недели</Text>
                        </View>
                        <View style={styles.daysOfWeek}>
                            {daysOfWeek.map((day, index) => {
                                const selected = (_.includes(settings.daysOfWeek, index));

                                const dayOfWeekStyle = [styles.dayOfWeek];
                                const dayOfWeekTextStyle = [styles.dayOfWeekText];
                                if (selected) {
                                    dayOfWeekTextStyle.push(styles.dayOfWeekTextSelected);
                                }

                                return (
                                    <TouchableOpacity key={index}>
                                        <View style={dayOfWeekStyle}>
                                            <Text style={dayOfWeekTextStyle}>{day}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity>
                        </TouchableOpacity>
                        <View style={styles.categorySeparator}></View>
                    </View>
                    <View style={styles.selectedCategories}>
                        <View style={styles.titleIcon}>
                            <Image source={require('./assets/Sound_Icon.png')} />
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Оповещение звуком</Text>
                        </View>
                        <TouchableOpacity onPress={actions.setSoundNotification}>
                            <View>
                                <Text style={soundTriggerTextStyle}>{soundNotifyLabel}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.categorySeparator}></View>
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
    daysOfWeek: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
    },
    dayOfWeek: {
        marginHorizontal: 5,
    },
    dayOfWeekText: {
        fontSize: 18,
        lineHeight: 30,
        color: 'rgb(94, 94, 94)',
        textDecorationLine: 'underline',
    },
    dayOfWeekTextSelected: {
        color: 'rgb(87, 163, 43)',
    },
    notificationNum: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 24,
        lineHeight: 30,
        color: 'rgb(94, 94, 94)',
        marginTop: 12
    },
    soundTrigger: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 18,
        lineHeight: 30,
        color: 'rgb(94, 94, 94)',
        marginTop: 12
    },
    soundTriggerSelected: {
        color: 'rgb(87, 163, 43)',
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
        marginTop: 18,
        marginBottom: 18
    }
});

export default Settings;
