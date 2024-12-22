"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { postRequest } from "@/utils/handlers";
import { useUser } from "@/hooks/userProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch } from "react-redux";
import { push } from "@/store/slices/routerSlice";

const formSchema = z
  .object({
    username: z.string().min(2).max(50),
    firstName: z.string().min(2).max(50),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const dispatch = useDispatch();

  const { setUser, setToken, activeTabKey, tokenKey } = useUser();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await postRequest<{ id: string; token: string }>(
        "/auth/register/",
        {
          ...values,
        }
      );
      if (res.data && res.status === "success") {
        setUser({
          username: values.username,
        });
        setToken(res.data.token);
        localStorage.setItem(tokenKey, res.data.token);
        dispatch(push({ activeTabKey, dest: "messenger" }));

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
      <Card className="mx-auto min-w-96 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2.5 ">
                <div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="grid gap-0">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                <div className="grid">
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

                <div className="grid">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-0">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!form.getValues().password}
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full mt-1.5">
                  Sign Up
                </Button>

                <div className="mt-4 text-center text-sm">
                  Have an account?{" "}
                  <Button
                    variant={"link"}
                    className="underline"
                    onClick={() =>
                      dispatch(push({ activeTabKey, dest: "login" }))
                    }
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
