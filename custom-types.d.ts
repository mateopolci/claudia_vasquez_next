declare namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        videoid: string;
        playlabel?: string;
        class?: string;
        params?: string;
      };
    }
  }