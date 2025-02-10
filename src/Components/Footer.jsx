import { Fragment, useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Fragment>
      <footer className="footer">
      <div className="footer-content">
        <p>{`© ${year}. All Rights Reserved.`}</p>
      </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
