import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fonts: {
      size: {
        description: string;
      };
    };
    colors: {
      primary: string;
      white: string;
      inactive: string;
      disabled: string;
      border: string;
      defaultBackground: string;
    };
  }
}
