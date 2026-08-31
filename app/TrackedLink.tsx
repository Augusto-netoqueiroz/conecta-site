"use client";

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";
import { trackEvent } from "./tracking";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  eventName: string;
  eventData?: Record<
    string,
    string | number | boolean | undefined
  >;
};

export default function TrackedLink({
  children,
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventData);
    onClick?.(event);
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}