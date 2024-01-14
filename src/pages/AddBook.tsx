import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {Toaster} from "../components/ui/sonner";
import {toast} from "sonner";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"

import {Input} from "../components/ui/input"
import {Button} from "../components/ui/button";


const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),

});

const AddBook = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",

        }
    });
    const isLoading = form.formState.isSubmitting;
    const navigate = useNavigate();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("http://localhost:5000/api/books", {
                name: values.name
            })
            navigate("/");


        } catch (error) {
            toast(`${error}`);
            console.error(error)
        }
    };
    return (
        <div className={"h-screen text-black flex justify-center align-middle items-center"}>
            <Toaster position={"top-right"}/>
            <Card className={"h-fit w-2/4 bg-gray-200 shadow-2xl rounded-2xl"}>
                <CardHeader>
                    <CardTitle>Add Book</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid w-full items-center gap-10 grid-cols-1">
                                <FormField
                                    disabled={isLoading}
                                    name={"name"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    placeholder="Enter Book Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>

                            </div>

                            <div className="flex flex-col">
                                <Button type="submit">Add Book</Button>
                            </div>

                        </form>
                    </Form>


                </CardContent>
            </Card>
        </div>
    )
}
export default AddBook;