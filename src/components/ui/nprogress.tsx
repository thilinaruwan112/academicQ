'use client';

import NProgress from 'nprogress';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NProgressNext() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a');
      anchorElements.forEach((anchor) =>
        anchor.addEventListener('click', handleAnchorClick)
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: [any, any, any]) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return null;
}
