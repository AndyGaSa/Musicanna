import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import { ReactElement, ReactNode } from 'react';
import React from 'react';

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
  activeClassName: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps): ReactElement => {
  const { asPath } = useRouter();

  // Check if the current path matches the href prop
  const isActive =
    props.href === '/'
      ? asPath === props.href
      : asPath.startsWith(props.href.toString());

  // Clone the child component and add the active class if the path is active
  const child = React.cloneElement(children as ReactElement, {
    className: isActive ? activeClassName : '',
  });

  return <Link {...props}>{child}</Link>;
};

export default ActiveLink;
