import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import {NavBar} from "./components/NavBar";

// import bg from "/public/bg.png"

function App() {


    return (
        <BrowserRouter>
            <div style={{backgroundImage: `url(bg.png)`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
                 className={"h-screen font-sans"}>
                <NavBar/>

                <Routes>

                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/addBook"} element={<AddBook/>}/>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
