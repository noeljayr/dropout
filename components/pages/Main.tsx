"use client";

import { MotionConfig } from "motion/react";

function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MotionConfig transition={{ease: [.25,.1,.25,1], duration: 0.5}}>{children}</MotionConfig>;
}

export default Main;
