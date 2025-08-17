// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

interface FundamentalDataProps {
  symbol: string;
}

function FundamentalData({ symbol }: FundamentalDataProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Prevent double-mount: check if script already exists
      const existingScript = Array.from(
        container.current.getElementsByTagName("script")
      ).find(
        (s) =>
          s.src ===
          "https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
      );
      if (existingScript) {
        return;
      }
    }
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "${symbol}",
          "colorTheme": "light",
          "displayMode": "regular",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": 700
        }`;
    if (container.current) {
      container.current.appendChild(script);
    }
    return () => {
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">

      </div>
    </div>
  );
}

export default memo(FundamentalData);
