import './App.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import Platform from "./components/Platform";

function App() {
  return (
    <Provider store={store}>
      <Platform />
    </Provider>
  );
}

export default App;
