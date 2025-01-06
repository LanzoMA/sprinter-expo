import { defaultStyles } from "@/constants/default-styles";
import { Link } from "expo-router";
import { View, Text, TextInput, Button } from "react-native";

export default function LoginScreen() {
  return (
    <View
      style={defaultStyles.container}
    >
      <Text style={defaultStyles.titleText} >Login</Text>

      <TextInput
        style={defaultStyles.textInput}
        placeholder="Email"
        placeholderTextColor='white'
      />
      <TextInput
        style={defaultStyles.textInput}
        placeholder="Password"
        placeholderTextColor='white'
      />

      <Button title='LOGIN' />

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Text style={defaultStyles.text} >No account?</Text>
        <Link
          href='/signup'
          style={defaultStyles.link}
        >
          Sign Up
        </Link>
      </View>
    </View>
  )
}