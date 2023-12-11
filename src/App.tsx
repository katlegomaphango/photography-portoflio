import { Navbar } from "./components"
import { useGetRandomPhotoQuery } from "./redux/services/unsplash";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const App = () => {
  const { data, error } = useGetRandomPhotoQuery({ clientID: CLIENT_ID, count: 8})
  if(error) throw error
  console.log(data)

  return (
    <>
      <Navbar />
      App
      {data && <img src={data[0].urls.regular} />}
    </>
  )
}

export default App