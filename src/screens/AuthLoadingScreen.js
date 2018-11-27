import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App':'Auth');
    };

    async initFcm() {
        await firebase.messaging().subscribeToTopic('noticias');
        //case kill apps
 
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            // user has permissions
            const fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device toke
            } else {
                // user doesn't have a device token yet
                await firebase.messaging().requestPermission();
            }
        } else {
            // user doesn't have permission
            await firebase.messaging().requestPermission();
 
        }
 
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            // Toast.show({ text: '1', position: 'bottom', duration: 3000 });
            const notification = notificationOpen.notification;
            if (notification != null && notification.data != null) {
                this.getDetailCategory(
                    notification.data.type,
                    notification.data.slug,
                    notification.data.slug_hash);
            }
        }
 
        // Create the channel
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
        firebase.notifications().android.createChannel(channel);
 
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
 
 
        //case open apps
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // Toast.show({ text: '2', position: 'bottom', duration: 3000 });
            if (notification != null && notification.data != null) {
                this.onRefreshFeeds();
            }
        });
 
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Toast.show({ text: '3', position: 'bottom', duration: 3000 });
            const notification = notificationOpen.notification;
            if (notification != null && notification.data != null) {
                this.getDetailCategory(
                    notification.data.type,
                    notification.data.slug,
                    notification.data.slug_hash);
            }
 
            if (platform.platform == 'android') {
                firebase.notifications().removeDeliveredNotification(notification.notificationId);
            }
 
        });
    }
 
    componentWillUnMount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
        Linking.removeEventListener('url', this.handleOpenURL);
        rol();
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle='default' />
            </View>
        );
    }
}

export default AuthLoadingScreen;