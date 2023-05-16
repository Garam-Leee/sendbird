import React, { useMemo } from 'react';
import { useTheme } from '@emotion/react';

type IconNameType = 'up' | 'down' | 'x';
type DirectionType = 'up' | 'down' | 'left' | 'right';
interface IProps {
  name: IconNameType;
  color: ColorType;
}

const XMLNS = 'http://www.w3.org/2000/svg';

function Arrow({
  color,
  direction,
}: {
  color: string;
  direction: DirectionType;
}) {
  const rotate = useMemo(() => {
    if (!direction) return 0;
    if (direction === 'up') return 270;
    if (direction === 'down') return 90;
    if (direction === 'right') return 180;
    return 0;
  }, [direction]);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns={XMLNS}
      transform={`rotate(${rotate})`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.43558 4.50613C8.70834 4.1944 9.18216 4.16282 9.49389 4.43558L17.4939 11.4356C17.6567 11.578 17.75 11.7837 17.75 12C17.75 12.2163 17.6567 12.422 17.4939 12.5644L9.49389 19.5644C9.18216 19.8372 8.70834 19.8056 8.43558 19.4939C8.16282 19.1822 8.1944 18.7083 8.50613 18.4356L15.8611 12L8.50613 5.56444C8.1944 5.29168 8.16282 4.81786 8.43558 4.50613Z"
        fill={color}
      />
    </svg>
  );
}

function Icon({ name, color }: IProps) {
  const theme = useTheme();
  if (name === 'up') {
    return <Arrow color={theme.colors[color]} direction={name} />;
  }
  if (name === 'down') {
    return <Arrow color={theme.colors[color]} direction={name} />;
  }
  if (name === 'x') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns={XMLNS}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L12 10.9393L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.0607 12L19.5303 18.4697C19.8232 18.7626 19.8232 19.2374 19.5303 19.5303C19.2374 19.8232 18.7626 19.8232 18.4697 19.5303L12 13.0607L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.9393 12L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
          fill={theme.colors[color]}
        />
      </svg>
    );
  }
  return <svg />;
}

export default React.memo(Icon);
