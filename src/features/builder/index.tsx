import { BuilderProvider } from "./builder.context";
import BuilderForm from "./components/BuilderForm";

const Builder = () => {
  return (
    <BuilderProvider>
      <BuilderForm />
    </BuilderProvider>
  );
};

export default Builder;
