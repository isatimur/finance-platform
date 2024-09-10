import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { accountsInsertSchema } from "@/db/schema";


const accountFormSchema = accountsInsertSchema.pick({
    name: true,
})

type AccountFormValues = z.infer<typeof accountFormSchema>;

type Props = {
    id?: string;
    defaultValues?: AccountFormValues;
    onSubmit: (values: AccountFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export const AccountForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: AccountFormValues) => {
        console.log(values);
        onSubmit(values);
    }


    const handleDelete = () => {
        console.log("delete");
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4">

                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field}
                                disabled={disabled}
                                placeholder="e.g. Cash, Bank, etc."
                                {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="w-full" disabled={disabled}>
                    {id ? "Save changes" : "Create account"}
                </Button>
                {!!id && (
                    <Button variant="outline" onClick={handleDelete} disabled={disabled} className="w-full">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                )
                }
            </form>
        </Form>
    )
}