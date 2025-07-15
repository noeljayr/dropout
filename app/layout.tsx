import type { Metadata } from "next";

import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@/css/globals.css";

import Main from "@/components/pages/Main";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/Sidebar";
import ViewStudent from "@/components/modals/view-student/ViewStudent";
import SubmitReport from "@/components/modals/SubmitReport";

export const metadata: Metadata = {
  title: "Malivenji Risk Monitoring",
  description: "Monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <NextTopLoader showSpinner={false} color="#006ff9" height={2} />
        <Sidebar />
        <div className="py-4 flex  h-full w-full overflow-hidden">
          <Main>{children}</Main>
        </div>
        <ViewStudent />
        <SubmitReport />
      </body>
    </html>
  );
}
