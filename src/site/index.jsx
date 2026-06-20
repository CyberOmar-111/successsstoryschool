import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { App } from "./App.jsx";

const rootElement = document.getElementById("root");

if (rootElement && window.ReactDOM?.createRoot) {
  window.ReactDOM.createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
