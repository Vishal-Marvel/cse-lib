import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "./ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import axios from "axios";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {Pencil} from "lucide-react";



const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});



interface Props {
    name: string
    id: string
}


export const EditBook = ({id, name}:Props) =>{
    const [dialog, setDialog] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name,

        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put("http://localhost:5000/api/book/"+id, {
                name: values.name
            })
            setDialog(false);


        } catch (error) {
            toast(`${error}`);
            console.error(error)
        }
    };

    return  <Dialog open={dialog} onOpenChange={()=>setDialog(!dialog)}>
        <DialogTrigger className={"rounded-2xl p-2 pt-3 pb-2 border-2 border-cyan-900 hover:bg-accent"}>
            <Pencil className={"w-4 h-4"}/>
        </DialogTrigger>
        <DialogContent>

            <DialogHeader>
                Edit Book
            </DialogHeader>
            {/*<DialogClose className={"hidden"}/>*/}
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
                                            value={field.value}
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
                        <Button className={"bg-indigo-950 text-white rounded-[10px] p-3 hover:bg-indigo-900"}
                                type="submit">Edit Book</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}