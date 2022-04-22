import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      active: string;
      deactive: string;
    };
    fonts: {
      normal: string;
    };
  }
}
