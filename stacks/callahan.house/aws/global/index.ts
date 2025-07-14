import iam from "./iam";

const global = () => {
  return {
    iam: iam(),
  };
};

export default global;
