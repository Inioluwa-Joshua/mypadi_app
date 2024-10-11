"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const BannerAd = () => {
  const banner = useRef();
  const router = useRouter();

  const atOptions = {
    key: "1ab5c4f164773b05eae06cc4768d341b",
    format: "iframe",
    height: 500,
    width: 500,
    params: {},
  };

  const loadAd = () => {
    if (banner.current) {
      while (banner.current.firstChild) {
        banner.current.removeChild(banner.current.firstChild);
      }

      const conf = document.createElement("script");
      const script = document.createElement("script");

      conf.type = "text/javascript";
      script.type = "text/javascript";
      script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;

      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  };

  useEffect(() => {
    loadAd();
  }, [router.asPath]); // Re-run effect when the path changes

  return (
    <div className="w-[100%] flex justify-center">
      <div className="text-white text-center" ref={banner}></div>
    </div>
  );
};

export default BannerAd;
