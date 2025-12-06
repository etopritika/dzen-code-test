import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@/store";
import { router } from "@/router";

function App() {
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="p-4">Loading...</div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
