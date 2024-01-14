import {Link} from "react-router-dom";
import {Button} from "./ui/button";

export const NavBar = () => {
    return (
        <div
            className={"h-[7%] w-full flex justify-end items-center align-middle  absolute top-0 left-0 right-0 bg-[#00000066] "}>
            <div className={"flex w-1/2 justify-evenly "}>
                <Link to={"/"}>
                    <Button variant={"link"} className={"font-semibold text-xl text-white"}>Home</Button>
                </Link>
                <Link to={"/addBook"}>
                    <Button variant={"link"} className={"font-semibold text-xl text-white"}>Add Book</Button>
                </Link>
            </div>

        </div>

    )
}