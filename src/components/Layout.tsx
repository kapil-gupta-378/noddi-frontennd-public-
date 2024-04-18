import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { VerticalLayout } from './vertical-layout';
import { useSettings } from '../hooks/use-setting';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const settings = useSettings();
  return (
    <VerticalLayout
      navColor={settings.navColor}
      {...props}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
