"use client";
import { ProgressProvider } from "@bprogress/next/app";

export default function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProgressProvider
        height="3px"
        color="#7367F0"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </>
  );
}
