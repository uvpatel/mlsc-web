"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schema/user.schema";
import type { UserSchema } from "@/schema/user.schema";
import api from "@/lib/axios";

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

  const form = useForm<UserSchema>({
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

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {

    try {

      await api.post<UserSchema>("/users", data);

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

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>

        </form>

      </Form>

    </div>

  );

}