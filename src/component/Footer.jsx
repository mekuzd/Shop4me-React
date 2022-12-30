import { useState, useContext } from "react";
import { Context } from "../../Provider/Context";

const Footer = () => {
  const [date, setdate] = useState(new Date().getFullYear());
  const { Theme } = useContext(Context);

  return (
    <>
      <div className="footer ">
        <h1>© {date} Shop4me All rights reserved</h1>
      </div>
    </>
  );
};
export default Footer;
