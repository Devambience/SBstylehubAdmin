"use client";

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const Loader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <>
      {isMobile ? (
        <p>This website is not compatible with phones or tablets. visit using a desktop or laptop</p>
      ) : (
        <ClipLoader color="#3498db" size={40} />
      )}
    </>
  );
};
