import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </Provider>
);
