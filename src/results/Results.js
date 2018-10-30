import React from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import Spinner from 'react-native-spinkit';
// import utils from './src/utils';
import { start } from '../search';
import styles from './Results.styles';

export default class App extends React.Component {
    state = {
        loading: true
    }

    getSpinnerProps() {
        return {
            style: {},
            isVisible: true,
            size: 70,
            type: 'Wave',
            color: '#000000'
        };
    }

    render() {
        let startingState = [
            [7, 2, 5],
            ['-', 4, 8],
            [3, 6, 1]
        ];
        let endingState = [
            [1, 2, 3],
            [4, '-', 5],
            [6, 7, 8]
        ];
        const { loading } = this.state;

        if (loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner {...this.getSpinnerProps()} />
                </View>
            );
        }

        return (
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.titleText}>{'Resultados - Algoritmo Primero el Mejor'}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.resultsText}>{start(startingState, endingState)}</Text>
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        this.setState({ loading: false });
    }
}
