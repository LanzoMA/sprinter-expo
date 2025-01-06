import { StyleSheet } from "react-native";
import { darkTheme } from "./themes";

export const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.backgroundColor,
    width: '100%',
    padding: 16,
    gap: 32,
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  titleText: {
    color: darkTheme.onSurfaceColor,
    fontWeight: 700,
    fontSize: 28,
    textAlign: 'center',
  },
  text: {
    color: darkTheme.onSurfaceColor,
  },
  link: {
    color: darkTheme.primaryColor,
    fontWeight: 700,
  },
  textInput: {
    backgroundColor: darkTheme.surfaceColor,
    padding: 12,
    borderRadius: 8,
  }
});