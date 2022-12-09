import { useState } from "react";
import http from "../config/http";

import DefaultLayout from "../Layouts/DefaultLayout";
import Error404 from "./error404";

const Login = () => {
  const [location, setlocation] = useState("");
  const [address, setaddress] = useState("");

  async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          setlocation(
            "Latitude: " +
              position.coords.latitude +
              " Longitude: " +
              position.coords.longitude,
          );

          const response = await http.get(
            `/v1/reverse?key=pk.69aeb839e94a88962de2ddec542f87ec&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
          );
          setaddress(response.data.display_name);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      location = "Geolocation is not supported by this browser.";
    }
  }

  return (
    <DefaultLayout>
      <main>Login page </main>
      <p>Location:{location}</p>
      <p>Address:{address}</p>
      <button className="btn btn-secondary" onClick={getLocation}>
        show position
      </button>
    </DefaultLayout>
  );
};
export default Login;
