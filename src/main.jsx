import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";
import "./i18n";

createRoot(document.getElementById("root")).render(<App />);
