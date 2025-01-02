"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postRequest } from "@/utils/handlers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { login, push } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
});
const Login = () => {
  const { toast } = useToast();

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await postRequest<{ id: string; token: string }>(
        "/auth/login/",
        {
          ...values,
        }
      );
      if (res.data && res.status === "success") {
        dispatch(
          login({
            token: res.data.token,
            user: {
              username: values.username,
              id: res.data.id,
            },
          })
        );

        dispatch(push("inbox"));

        toast({
          variant: "default",
          description: res.message,
          duration: 1000,
          color: "green",
        });
      }
    } catch (err) {
      if (Array.isArray(err)) {
        err.forEach((e) => {
          toast({
            variant: "destructive",
            description: e,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            duration: 500,
          });
        });
        return;
      }
      toast({
        variant: "destructive",
        description: err instanceof Error ? err.message : String(err),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto min-w-96	max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="grid gap-0">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-0">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Button
                  variant={"link"}
                  className="underline"
                  onClick={() => dispatch(push("sign-up"))}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
