import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"


import {ScrollArea, ScrollBar} from "../components/ui/scroll-area";
import axios from "axios";
import {useEffect, useState} from "react";
import {Pencil, Trash} from "lucide-react";
import {Button} from "../components/ui/button";
import {EditBook} from "../components/EditBook";
import {toast} from "sonner";
import {Link} from "react-router-dom";

interface Book {
    name: string
    id: string
}

const Home = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const getBooks = () => {
        axios.get("http://localhost:5000/api/books").then(r =>
            setBooks(r.data));

    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            getBooks();
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const deleteBook = async (id: string) => {
        try {
            await axios.delete("http://localhost:5000/api/book/" + id)

        } catch (error) {
            toast(`${error}`);
            console.error(error)
        }
    }


    return (
        <div className={"h-screen flex flex-col items-center justify-center align-middle"}>
            <div className={"h-fit w-2/4  bg-gray-200 rounded-2xl flex flex-col "}>
                <div className={"m-2 p-2 ml-4"}>
                    <span className={"text-2xl font-bold"}>Books</span>
                </div>
                {books.length > 0 ?
                    <ScrollArea className={"h-[75%]  overflow-x-auto m-5 "}>

                        <Table className={"border-2 border-[#00000066]"}>
                            <TableHeader className={"sticky top-0 bg-secondary"}>
                                <TableRow className={"text-indigo-950"}>
                                    <TableHead> S. No.</TableHead>
                                    <TableHead> Name</TableHead>
                                    <TableHead className={"w-1/5"}> Action</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {books.map((book, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{book.name}</TableCell>
                                        <TableCell>
                                            <div className={"flex flex-row items-center justify-evenly"}>
                                                <EditBook id={book.id} name={book.name}/>
                                                <AlertDialog>
                                                    <AlertDialogTrigger
                                                        className={"rounded-2xl p-2 pt-3 pb-2 border-2 border-cyan-900 hover:bg-accent"}>
                                                        <Trash className={"w-4 h-4"}/>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely
                                                                sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently
                                                                delete the record
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => deleteBook(book.id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter className={"sticky bottom-0 bg-secondary"}>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell className="text-right">{books.length} Book(s)</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <ScrollBar/>
                    </ScrollArea>
                    : <span className={"p-2 text-center text-xl"}>No record Found

                        <Link to={"/addBook"}>
                        <Button className={"text-xl text-blue-600"}
                            variant={"link"}
                        >Add One</Button></Link>

                    </span>}

            </div>

        </div>
    )

}
export default Home;