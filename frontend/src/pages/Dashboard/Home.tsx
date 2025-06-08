import Hero from "@/components/hero/Hero";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SearchTool from "@/components/search/SearchTool";

const Home = () => {
  return (
    <DashboardLayout>
      <Hero />
      <SearchTool />
    </DashboardLayout>
  );
};

export default Home;
