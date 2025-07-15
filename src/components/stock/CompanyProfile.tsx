// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';


interface CompanyProfileProps {
    symbol: string;

}
function CompanyProfile({symbol} :CompanyProfileProps) {
    const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (container.current) {
        const existingScript = Array.from(container.current.getElementsByTagName('script')).find(
            s => s.src === "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
        );
        if (existingScript) {
            return;
        }
      }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${symbol}",
          "colorTheme": "light",
          "isTransparent": false,
          "locale": "en",
          "width": 400,
          "height": 550
        }`;
      if (container.current) {
        container.current.appendChild(script);
      }
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(CompanyProfile);
