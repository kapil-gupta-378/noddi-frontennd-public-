import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export const RouterLink = forwardRef(function RouterLink(props, ref) {
  return (
    <Link
      ref={ref}
      to={props?.href}
      {...props}
    />
  );
});
