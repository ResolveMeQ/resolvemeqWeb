import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { hasAnalyticsConsent } from "./consent/cookieConsentStorage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals((metric) => {
  if (
    typeof window !== "undefined" &&
    hasAnalyticsConsent() &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_delta: metric.value,
      non_interaction: true,
    });
  }
});
