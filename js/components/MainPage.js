
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Image,
    ScrollView,
    NativeModules,
    NativeAppEventEmitter,
} from 'react-native';

import Menu from './Menu';

import _ from 'lodash';

const LocalNotificationManager = NativeModules.LocalNotificationManager;

let subscription;

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.updateNotifications = this.updateNotifications.bind(this);
    }

    componentDidMount() {
        subscription = NativeAppEventEmitter.addListener(
            'didReceiveNotification',
            (event) => {
                const { actions, notifications } = this.props; 
                
                const notificationText = event.notification;
                console.log('didReceiveNotification', notificationText)

                const notification = _.find(notifications, {shortText: notificationText});

                actions.showNotification(notification);
            }
        );
    }

    componentWillUnmount() {
        subscription.remove();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.updateNotifications();
        }
    }

    updateNotifications() {
        const { notifications } = this.props;
        
        console.log('updateNotifications, notifications', notifications);

        LocalNotificationManager.cancelNotifications();

        if (notifications.length) {
            LocalNotificationManager.scheduleNotification(_.sample(notifications).shortText, 5);
            LocalNotificationManager.scheduleNotification(_.sample(notifications).shortText, 30);
        }
    }
    
    render() {
        const { categories, actions } = this.props;
        const { selected, other } = categories;

        const noSelected = (selected.length == 0);
        const otherCategoriesText = noSelected ? 'Над чем вы хотите поработать?' : 'Ещё хочу добавить';

        return (
            <View style={styles.mainPage}>
                <Menu
                    actions={actions}
                    questionButton={true}
                    gearButton={true}
                />

                <ScrollView>
                    {!!selected.length &&
                        <View style={styles.selectedCategories}>
                            <View style={styles.titleIcon}>
                                <Image source={require('./assets/Checkmark_In_Circle.png')} />
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Я сейчас работаю над</Text>
                            </View>
                            <View style={styles.categorySeparator}></View>
                            {selected.map(category => (
                                <Category key={category.text} category={category} actions={actions} selected={true} />
                            ))}
                        </View>
                    }

                    {!!other.length &&
                        <View style={styles.otherCategories}>
                            {!noSelected &&
                                <View style={styles.titleIcon}>
                                    <Image source={require('./assets/Plus_In_Circle.png')}/>
                                </View>
                            }
                            <View style={styles.title}>
                                <Text style={styles.titleText}>{otherCategoriesText}</Text>
                            </View>
                            <View style={styles.categorySeparator}></View>
                            {other.map(category => (
                                <Category key={category.text} category={category} actions={actions} />
                            ))}
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
}

class Category extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const { actions, category } = this.props;

         requestAnimationFrame(() => {
            // LayoutAnimation.configureNext({
            //     ...LayoutAnimation.Presets.easeInEaseOut,
            //     duration: 300,
            // });

            actions.toggleCategory(category);
        })
    }

    render() {
        const { category, selected } = this.props;

        const categoryStyle = [styles.category];
        const categoryTextStyle = [styles.categoryText];
        if (selected) {
            categoryStyle.push(styles.categorySelected)
            categoryTextStyle.push(styles.categoryTextSelected)
        }

        return (
            <TouchableOpacity onPress={this.toggle}>
                <View style={categoryStyle}>
                    <Text style={categoryTextStyle}>{category.text}</Text>
                    {selected &&
                        <View style={styles.check}>
                            <Image source={require('./assets/GreenCheckmark.png')}/>
                        </View>
                    }
                </View>
                <View style={styles.categorySeparator}></View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        height: window.height,
    },
    selectedCategories: {
        // marginTop: 20,
    },
    otherCategories: {
        // marginTop: 20,
    },
    titleIcon: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: -10,
    },
    title: {
        // height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 25,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 30,
        color: 'rgb(164, 158, 158)'
    },
    categorySeparator: {
        height: 1,
        width: 140,
        backgroundColor: 'rgb(224, 224, 224)',
        alignSelf: 'center',
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 22,
        flexDirection: 'row',
    },
    categorySelected: {
    },
    categoryText: {
        fontSize: 18,
        color: 'rgb(95, 95, 95)',
    },
    categoryTextSelected: {
        color: 'rgb(87, 163, 43)',
    },
    check: {
        marginLeft: 10,
        width: 16,
        height: 13,
    }
});

export default MainPage;
