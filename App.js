import React from 'react';
import {
    Text,
    View,
    NativeModules,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from 'react-native-spinkit';
import Results from './src/results/Results';
import styles from './App.styles';
import utils from './src/utils';

export default class App extends React.Component {
    state = {
        loading: false,
        initial: null,
        end: null,
        takingPicture: false,
        startSearch: false
    };

    getCameraProps() {
        return {
            ref: (cam) => { this.camera = cam; },
            style: styles.preview,
            aspect: Camera.constants.Aspect.fill,
            playSoundOnCapture: false
        };
    }

    getTextProps(typeState) {
        return {
            style: styles.capture,
            onPress: () => { this.callCamera(typeState); }
        };
    }

    getSpinnerProps() {
        return {
            style: styles.spinner,
            isVisible: true,
            size: 70,
            type: 'Bounce',
            color: 'white'
        };
    }

    renderPictureSection(pictureState, textPictureButton, onPressButton) {
        return (
            <View style={styles.pictureSectionContainer}>
                <TouchableOpacity style={styles.pictureButton} onPress={onPressButton}>
                    <Text style={styles.pictureButtonText}>{textPictureButton}</Text>
                </TouchableOpacity>
                <Text style={styles.pictureStateText}>{pictureState}</Text>
            </View>
        );
    }

    renderStartSection() {
        return (
            <TouchableOpacity
                style={[styles.pictureButton, { margin: 10, padding: 10 }]}
                onPress={() => { this.setState({ startSearch: true }) }}>
                <Text style={styles.pictureButtonText}>{'COMENZAR!'}</Text>
            </TouchableOpacity>
        );
    }

    renderCamera(typeState) {
        const { loading } = this.state;

        return (
            <View style={styles.container}>
                <Camera {...this.getCameraProps()}>
                    {
                        (!loading)
                            ? <Text {...this.getTextProps(typeState)} />
                            : <View><Spinner {...this.getSpinnerProps()} /></View>
                    }
                </Camera>
            </View>
        );
    }

    renderResultsSection() {
        const { initial, end, startSearch } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {
                    (initial && end && startSearch)
                        ? <Results initial={initial} end={end} />
                        : null
                }
            </View>
        );
    }

    render() {
        const { takingPicture, typeState, initial, end } = this.state;

        if (takingPicture) {
            return this.renderCamera(typeState);
        }

        return (
            <ScrollView style={{ flex: 1 }}>
                {this.renderPictureSection(
                    (initial) ? 'OK' : '',
                    'Tomar Estado Inicial',
                    () => { this.setState({ takingPicture: true, typeState: 'initial' }); }
                )}
                {this.renderPictureSection(
                    (end) ? 'OK' : '',
                    'Tomar Estado Final',
                    () => { this.setState({ takingPicture: true, typeState: 'end' }); }
                )}
                {this.renderStartSection()}
                {this.renderResultsSection()}
            </ScrollView>
        );
    }

    takePicture = (typeState) => {
        const captureOptions = { metadata: {} };
        this.camera.capture(captureOptions).then((data) => {
            utils.resizeImage(data.path, (resizedImageUri) => {
                NativeModules.RNImageToBase64.getBase64String(resizedImageUri, async (err, base64) => {
                    let result = null;

                    if (err) {
                        console.error(err);
                    } else {
                        result = await utils.searchText(base64);
                    }

                    this.setState({
                        loading: false,
                        takingPicture: false,
                        [typeState]: result
                    });
                });
            });
        }).catch(err => console.error(err));
    }

    callCamera = (typeState) => {
        const { loading } = this.state;

        if (!loading) {
            this.setState({
                loading: true
            }, () => { this.takePicture(typeState); });
        } else {
            console.log('Loading photo...');
        }
    }
}
