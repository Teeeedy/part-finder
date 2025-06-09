import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const Error404 = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 text-center">
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
          Error 404 - Page Not Found
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Error404;
