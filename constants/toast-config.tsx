import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import colors from './colors';

const toastConfig = {
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.error,
        backgroundColor: colors.surfaceDark,
      }}
      text1Style={{
        color: colors.text,
      }}
    />
  ),
};

export default toastConfig;
