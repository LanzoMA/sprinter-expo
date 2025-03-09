import { ActivityIndicator, useColorScheme } from 'react-native';

interface SpinnerProps {
  color?: string;
  scale?: number;
}

export default function Spinner({ color, scale }: SpinnerProps) {
  const colorScheme = useColorScheme();

  return (
    <ActivityIndicator
      style={{ transform: [{ scale: scale || 1.5 }] }}
      size={'large'}
      color={color || colorScheme === 'light' ? '#000' : '#fff'}
    />
  );
}
