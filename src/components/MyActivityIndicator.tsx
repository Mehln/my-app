import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import GlobalStyles from '@styles/styles';

const MyActivityIndicator = () => {
    return (
        <View style={GlobalStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#9B47FA" />
        </View>
    );
}

export default MyActivityIndicator;