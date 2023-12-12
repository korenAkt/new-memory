import React from 'react';

function Footer() {
  const name = 'Koren Memory';
  const phoneNumber = '050-859-1365';
  const emailAddress = 'korenakt102@gmail.com';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const sendEmail = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <>
    <div className="p-4 mt-5"></div>
    <div className="p-4 mt-5"></div>
    <div className="p-4 mt-5"></div>
    <div className="p-4 mt-4"></div>
    <div className="bg-dark text-white p-4 mt-5">
      <p>Name: {name}</p>
      <p>Phone: {phoneNumber}</p>
      <p>Email: {emailAddress}</p>
      <button className="btn btn-light" onClick={sendEmail}>Send Email</button>
      <div className="mt-3 text-center text-white">
        &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
      </div>
    </div>
    </>
  );
}

export default Footer;
