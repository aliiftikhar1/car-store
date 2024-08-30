import dynamic from "next/dynamic";

// Dynamically import the AddCompanies component with SSR disabled
const AddCompanies = dynamic(() => import("./AddCompanies"), { ssr: false });

const Companies = () => {
  return (
    <>
      <AddCompanies />
    </>
  );
};

export default Companies;
