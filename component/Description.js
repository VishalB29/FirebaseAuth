import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import WebView from "react-native-webview";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const Description = ({ route }) => {
  const { url } = route.params;
  const webViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [height, setHeight] = useState(Dimensions.get("screen").height);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    webViewRef.current.reload();
    wait(2000)
      .then(() => setRefreshing(false))
  }, [refreshing]);

  const [isEnabled, setIsEnabled] = useState(typeof onRefresh === "function");
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
    <ScrollView
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}

          refreshing={refreshing}
          enabled={isEnabled}
        />
      }
      style={styles.view}
    >
      <WebView style={[styles.view, {height}]}
        source={{ uri: url }}
        ref={webViewRef}
        onScroll={(e) =>
          setIsEnabled(
            typeof onRefresh === "function" &&
              e.nativeEvent.contentOffset.y === 0
          )
        }
      />
    </ScrollView>
    </SafeAreaView>
  );
};

export default Description;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: "100%",
  },
});
