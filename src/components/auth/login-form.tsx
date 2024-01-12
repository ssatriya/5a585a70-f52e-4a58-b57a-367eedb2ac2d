"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import AuthCardWrapper from "@/components/auth/auth-card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, LoginType } from "@/lib/schema/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
      // username: "kminchelle",
      // password: "0lelplR",
    },
  });

  const onSubmit = async (values: LoginType) => {
    setIsPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/",
    });

    if (res) {
      if (res.error && !res.ok) {
        toast.error("Invalid credentials");
        setIsPending(false);
        return;
      }
      if (res.ok) {
        toast.success("Login successfully");
        setIsPending(false);
      }
    }
  };

  return (
    <AuthCardWrapper headerLabel="Welcome back">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          data-test="login-form"
        >
          <div className="space-y-4" data-test="overlay">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                      disabled={isPending}
                      data-test="username-input"
                    />
                  </FormControl>
                  <FormMessage data-test="form-username-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                      data-test="password-input"
                    />
                  </FormControl>
                  <FormMessage data-test="form-password-message" />
                </FormItem>
              )}
            />
          </div>
          <Button
            data-test="login-button"
            className="w-full"
            type="submit"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};
export default LoginForm;
