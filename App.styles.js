import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        margin: 50,
        height: 70,
        width: 70,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 15
    },
    loadingMsg: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    loadingText: {
        fontSize: 18,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 30
    },
    spinner: {
        marginBottom: 50
    },
    pictureSectionContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureSectionItem: {
        flex: 1,
    },
    pictureButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        padding: 20,
    },
    pictureButtonText: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    pictureStateText: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
        color: '#00FF00',
    }
});

export default styles;
