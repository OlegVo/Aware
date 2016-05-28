
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Dimensions,
    Image,
} from 'react-native';

import _ from 'lodash';

const window = Dimensions.get('window');

const steps = [
    {
        text: 'Aware - научит вас справляться с негативными эмоциями. Всего лишь несколько минут в день и любая стрессовая ситуация не будет вам доставлять неудобства.',
        color: 'rgb(242, 94, 91)',
        image: require('./assets/Sad_Man.png'),
    },
    {
        text: 'Выберете нужные эмоции, которыми вы хотите научиться направлять. Или выберете все, чтобы просто начать прокачивать свою осознанность.',
        color: 'rgb(252, 195, 41)',
        image: require('./assets/Interested_Man.png'),
    },
    {
        text: 'Aware будет отправлять вам напоминания-инструкции. Применяйте их на практике и возьмите свои эмоции под контроль.',
        color: 'rgb(87, 163, 43)',
        image: require('./assets/Happy_Man.png'),
    }
];

class StartScreen extends Component {
    constructor(props) {
        super(props);

        this.nextStep = this.nextStep.bind(this);
        this.goToMainPage = this.goToMainPage.bind(this);
    }

    nextStep() {
        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: 400,
        });

        this.props.actions.nextStep();
    }

    goToMainPage() {
        this.props.actions.showPage('main');

        setTimeout(() => this.props.actions.setStep(0), 300);
    }

    render() {
        const { step } = this.props;

        const stepContent = steps[step] || _.last(steps);

        const screenStyle = [styles.screen, {backgroundColor: stepContent.color}];

        const stepsContainerStyle = [styles.stepsContainer, {left: -step * window.width}];

        const isLastStep = (step == steps.length - 1);

        return (
            <View style={screenStyle}>

                <View style={styles.stepsArea}>
                    <View style={stepsContainerStyle}>
                        {steps.map((step, index) => (
                            <Step key={index} step={step} />
                        ))}
                    </View>
                </View>

                <View style={styles.pageControl}>
                    {steps.map((stepContent, index) => {
                        let style = [styles.round];
                        if (index == step) {
                            style.push(styles.roundCurrent);
                        }
                        return (
                            <View key={index} style={style}></View>
                        );
                    })}
                </View>

                {!isLastStep &&
                    <TouchableOpacity activeOpacity={.8} onPress={this.nextStep}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Дальше</Text>
                            <View style={styles.buttonArrow}>
                                <Image source={require('./assets/Chevron_Dark_Right.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {isLastStep &&
                    <TouchableOpacity activeOpacity={.8} onPress={this.goToMainPage}>
                        <View style={[styles.button, styles.buttonLast]}>
                            <Text style={[styles.buttonText, styles.buttonLastText]}>Включить оповещения</Text>
                            <View style={styles.buttonCheck}>
                                <Image source={require('./assets/Checkmark.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

class Step extends Component {
    render() {
        const { step } = this.props;

        return (
            <View style={styles.step}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{step.text}</Text>
                </View>
                <View style={styles.image}>
                    <Image
                        source={step.image}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 20,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    stepsArea: {
        width: window.width,
        overflow: 'hidden',
    },
    pageControl: {
        marginVertical: 10,
        height: 10,
        flexDirection: 'row',
    },
    round: {
        marginHorizontal: 5,
        width: 8,
        height: 8,
        borderWidth: 1,
        borderColor: 'rgb(58, 58, 58)',
        borderRadius: 4,
    },
    roundCurrent: {
        backgroundColor: 'rgb(58, 58, 58)',
    },
    stepsContainer: {
        flexDirection: 'row',
    },
    step: {
        width: window.width,
        paddingHorizontal: 15,
    },
    textContainer: {
        height: 160,
        // borderWidth: 1,
        // borderColor: 'white',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        textAlign: 'center',
        color: 'rgb(58, 58, 58)'
    },
    image: {
        height: 270,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        marginTop: 10,
        width: 180,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLast: {
        width: 260,
    },
    buttonText: {
        fontSize: 22,
        color: 'rgb(58, 58, 58)',
        textAlign: 'center'
    },
    buttonLastText: {
        fontSize: 18,
    },
    buttonArrow: {
        marginLeft: 12,
        marginTop: 4,
        width: 10,
        height: 17,
    },
    buttonCheck: {
        marginLeft: 10,
        marginTop: 2,
        width: 26,
        height: 21,
    },
});

export default StartScreen;
