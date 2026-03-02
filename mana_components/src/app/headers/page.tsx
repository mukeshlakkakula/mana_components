import LazerCodeHeader from "./components/LazerCodeHeader";
import LazerCodeMobileMenu from "./components/LazerCodeMobileMenu";

const Page = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Header Component</h1>
      </div>{" "}
      <LazerCodeHeader />
      <hr className="my-8 border-gray-300" />
      <LazerCodeMobileMenu />
      <hr className="my-8 border-gray-300" />
    </div>
  );
};

export default Page;
