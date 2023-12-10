import { Navbar } from "./components"
import { createApi } from "unsplash-js";

type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: import.meta.env.VITE_CLIENT_ID
});

const App = () => {
  return (
    <>
      <Navbar />
      App
    </>
  )
}

export default App