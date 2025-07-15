// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import { Paper } from '@mui/material';

function StockNews({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (container.current) {
        // Prevent double-mount: check if script already exists
        const existingScript = Array.from(container.current.getElementsByTagName('script')).find(
          s => s.src === "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
        );
        if (existingScript) {
          return;
        }
      }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "displayMode": "compact",
          "feedMode": "symbol",
          "symbol": "NASDAQ:${symbol}",
          "colorTheme": "light",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": "100%"
        }`;
      if (container?.current) {
        container.current.appendChild(script);
      }
      return () => {
        if (container.current) {
          // Remove all children (including script and widget)
          while (container.current.firstChild) {
            container.current.removeChild(container.current.firstChild);
          }
        }
      };
    },
    [symbol]
  );

  return (
    <Paper sx={{ height: 400, overflow: 'hidden' }}>
      <div className="tradingview-widget-container" ref={container}>
        {/* TradingView will inject its own widget here */}
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </Paper>
  );
}

export default memo(StockNews);
