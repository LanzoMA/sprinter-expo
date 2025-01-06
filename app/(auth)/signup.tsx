import { defaultStyles } from "@/constants/default-styles";
import { Link } from "expo-router";
import { View, Text, TextInput, Button } from "react-native";

export default function SignUpScreen() {
  return (
    <View
      style={defaultStyles.container}
    >
      <Text style={defaultStyles.titleText}>Sign Up</Text>

      <TextInput
        style={defaultStyles.textInput}
        placeholder="Email"
        placeholderTextColor='white'
      />

      <TextInput
        style={defaultStyles.textInput}
        placeholder="Username"
        placeholderTextColor='white'
      />

      <TextInput
        style={defaultStyles.textInput}
        placeholder="Password"
        placeholderTextColor='white'
      />

      <TextInput
        style={defaultStyles.textInput}
        placeholder="Confirm Password"
        placeholderTextColor='white'
      />

      <Button title='LOGIN' />

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center'
        }}
      >
        <Text style={defaultStyles.text}>Already have an account?</Text>
        <Link replace style={defaultStyles.link} href='/login' >Login</Link>
      </View>
    </View>
  )
}