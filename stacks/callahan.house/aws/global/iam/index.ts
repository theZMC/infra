import ghActions from "./gh-actions";

const iam = () => {
  return {
    ghActions: ghActions(),
  };
};

export default iam;
