import React, { Component } from 'react';
import { WebView } from 'react-native';
import { registerForPushNotificationsAsync } from './push';

class WebviewSite extends Component {
    // componentDidMount() {
    //   AdMobInterstitial.setAdUnitID(pubID);
    //   AdMobInterstitial.setTestDeviceID("EMULATOR");
    // }
    // async showAds() {
    //   await AdMobInterstitial.requestAdAsync();
    //   await AdMobInterstitial.showAdAsync();
    // }
    state = {
        token: '',
    }
    componentDidMount() {
        registerForPushNotificationsAsync()
            .then(d => {
                this.setState({ token: d });
            })
            .catch(e => console.log('error', e));
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps && nextProps.refresh === false) this.WebViewRef.reload();
    }
    renderLoading() {
      return null;
    }
    render() {
        return <WebView
          ref={n => this.WebViewRef = n}
          userAgent={"londonz"}
          // onLoadStart={() => setTimeout(this.showAds, 1*60*1000)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={`window.token='${this.state.token}'`}
          startInLoadingState={true}
          renderLoading={this.renderLoading}
          scrollEnabled={false}
          bounce={false}
          useWebKit={true}
          source={{ uri: 'https://test.londonz.app' }}
          style={{ height: '100%', marginBottom: 42, }} />;
    }
}

export default WebviewSite;