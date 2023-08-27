"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

const formSchema = z.object({
  name: z.string().min(2),
});

type SettingsFormValues = z.infer<typeof formSchema>

interface SettingsFormProps {
  initialData: Store;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('Store updated.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all products and categories first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex flex-col items-center justify-between">
        
        <ApiAlert
        title="NEXT_PUBLIC_API_URL" 
        variant="public" 
        description={`${origin}/api/${params.storeId}`}
        />
        <br></br>
      <Separator />
      </div>
        <h1>API Calls for Billboards</h1>
      <br></br>
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/billboards`}
        />
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
        />
        <ApiAlert
        title="POST" 
        variant="admin"
        description={`${origin}/api/${params.storeId}/billboards`}
        />
        <ApiAlert
        title="PATCH" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
        />
        <ApiAlert
        title="DELETE" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/billboards/{billboardId}`}
        />
      <h1>API Calls for Categories</h1>
      <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/categories`}
        />
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/categories/{categoryId}`}
        />
        <ApiAlert
        title="POST" 
        variant="admin"
        description={`${origin}/api/${params.storeId}/categories`}
        />
        <ApiAlert
        title="PATCH" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/categories/{categoryId}`}
        />
        <ApiAlert
        title="DELETE" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/categories/{categoryId}`}
        />
        <h1>API Calls for Sizes</h1>
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/sizes`}
        />
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
        />
        <ApiAlert
        title="POST" 
        variant="admin"
        description={`${origin}/api/${params.storeId}/sizes`}
        />
        <ApiAlert
        title="PATCH" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
        />
        <ApiAlert
        title="DELETE" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/sizes/{sizeId}`}
        />
        <h1>API Calls for Colors</h1>
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/colors`}
        />
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/colors/{colorId}`}
        />
        <ApiAlert
        title="POST" 
        variant="admin"
        description={`${origin}/api/${params.storeId}/colors`}
        />
        <ApiAlert
        title="PATCH" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/colors/{colorId}`}
        />
        <ApiAlert
        title="DELETE" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/colors/{colorId}`}
        />
        <h1>API Calls for Products</h1>
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/products`}
        />
        <ApiAlert
        title="GET" 
        variant="public" 
        description={`${origin}/api/${params.storeId}/products/{productId}`}
        />
        <ApiAlert
        title="POST" 
        variant="admin"
        description={`${origin}/api/${params.storeId}/products`}
        />
        <ApiAlert
        title="PATCH" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/products/{productId}`}
        />
        <ApiAlert
        title="DELETE" 
        variant="admin" 
        description={`${origin}/api/${params.storeId}/products/{productId}`}
        />
    </>
  );
};
