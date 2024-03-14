'use client';
import { AppProgressBar  as ProgressBar } from 'next-nprogress-bar';
const NextNProgressClient = ({ children }:{ children:any }) => {
    return (
        <>
        {children}
        <ProgressBar
        height="4px"
        color="#4e5d78"
        options={{ showSpinner: false }}
        shallowRouting
      />
      </>
    );
};

export default NextNProgressClient;