import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0">
      <Link href="/auth" className="cta">
        Login
      </Link>
    </div>
  );
}

export default Home;
