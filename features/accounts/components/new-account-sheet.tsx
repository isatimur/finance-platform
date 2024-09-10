import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { AccountForm } from "@/features/accounts/components/account-form";
import { accountsInsertSchema } from "@/db/schema";
import { z } from "zod";

const accountFormSchema = accountsInsertSchema.pick({
    name: true,
})

type AccountFormValues = z.infer<typeof accountFormSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const onSubmit = (values: AccountFormValues) => {
        console.log(values);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your expenses.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={onSubmit}
                    disabled={false}
                    defaultValues={{
                        name: "",
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}