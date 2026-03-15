"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schema/user.schema";
import type { UserRegistrationInput } from "@/schema/user.schema";
import api from "@/lib/axios";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconSend,
} from "@tabler/icons-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form/form";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/form/button";

export default function UserForm() {

  const form = useForm<UserRegistrationInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      year: 1,
      mobileno: "",
      idno: "",
      github: "",
      department: ""
    }
  });

  const onSubmit: SubmitHandler<UserRegistrationInput> = async (data) => {

    try {

      await api.post<UserRegistrationInput>("/users", data);

      alert("User created successfully");

      form.reset();

    } catch (error: unknown) {

      if (error instanceof Error) {
        console.error(error.message);
      }

    }

  };

  return (

    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-3xl p-2">Registration Form</h1>
      <Form {...form}>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* Username */}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          {/* Email */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          {/* Year */}

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          {/* Mobile */}

          <FormField
            control={form.control}
            name="mobileno"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="9876543210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          {/* ID */}

          <FormField
            control={form.control}
            name="idno"
            render={({ field }) => (

              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="College ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          {/* Github */}

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input placeholder="Github profile URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          {/* Department */}

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Engineering" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

        
             <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
             disabled={form.formState.isSubmitting}
          >
            <IconSend className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
               {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </span>
            <BottomGradient />
          </button>
        </form>

      </Form>

    </div>

  );

}
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};