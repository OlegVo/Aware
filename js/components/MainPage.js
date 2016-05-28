
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
} from 'react-native';

import _ from 'lodash';

class MainPage extends Component {
    render() {
        const { categories, actions } = this.props;
        console.log('categories', categories)
        const { selected, other } = categories;

        return (
            <View style={styles.mainPage}>
                {!!selected.length &&
                    <View style={styles.selectedCategories}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Я сейчас работаю над</Text>
                        </View>
                        {selected.map(category => (
                            <Category key={category.text} category={category} actions={actions} selected={true} />
                        ))}
                    </View>
                }

                {!!other.length &&
                    <View style={styles.otherCategories}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Над чем вы хотите поработать?</Text>
                        </View>
                        {other.map(category => (
                            <Category key={category.text} category={category} actions={actions} />
                        ))}
                    </View>
                }
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

        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: 300,
        });

        actions.toggleCategory(category);
    }

    render() {
        const { category, selected } = this.props;

        const categoryStyle = [styles.category];
        if (selected) {
            categoryStyle.push(styles.categorySelected)
        }

        return (
            <TouchableOpacity onPress={this.toggle}>
                <View style={categoryStyle}>
                    <Text>{category.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        paddingTop: 20,
    },
    selectedCategories: {
        marginTop: 10,
    },
    otherCategories: {
        marginTop: 30,
    },
    title: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 6,
    },
    titleText: {
        fontSize: 17,
        lineHeight: 22,
    },
    category: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .02)',
    },
    categorySelected: {
        backgroundColor: '#8AEC99',
    }
});

export default MainPage;
