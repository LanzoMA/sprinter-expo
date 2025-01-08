import { Image } from 'expo-image';
import { View, FlatList, Dimensions } from 'react-native';

export default function HomeScreen() {
  const height = Dimensions.get('window').height - 60;

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1
      }}
    >
      <FlatList
        data={
          [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ]
        }

        renderItem={
          () =>
            <View style={{ height: height }} >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                }}
                source={require('@/assets/images/questions/question1.png')}
                contentFit='contain'
              />
            </View>
        }

        snapToInterval={height}
        decelerationRate={"normal"}
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}