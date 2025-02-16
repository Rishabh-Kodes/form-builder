import { Input, Select, Button } from "./components";

const App = () => {
  return (
    <>
      <h1>Form Builder</h1>
      <Input label="Name" helperText="This is a helper text" />
      <Select
        label="Select"
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
      />
      <Button>Submit</Button>
    </>
  );
};

export default App;
