import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import translationKeys from "./localization/translationKeys";
import i18n from "./localization/i18n";

export default function App() {
  const { t } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <View style={styles.container}>
      <Text>{t(translationKeys.Hello)}</Text>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.button} onPress={changeLanguage.bind(this,'hi')}>
        <Text>Hindi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={changeLanguage.bind(this,'gu')}>
        <Text>Gujarati</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={changeLanguage.bind(this,'en')}>
        <Text>English</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "tomato",
    padding: 20,
    borderRadius: 10,
  },
});
