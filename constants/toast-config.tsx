import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import baseTheme from './base-theme';

const toastConfig = {
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: baseTheme.common.error,
        backgroundColor: baseTheme.dark.surfaceDark,
      }}
      text1Style={{
        color: baseTheme.dark.text,
      }}
    />
  ),
};

export default toastConfig;
