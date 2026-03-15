"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schema/user.schema";
import type { UserRegistrationInput } from "@/schema/user.schema";
import api from "@/lib/axios";
import {
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconRefresh,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form/form";

import { Input } from "@/components/ui/form/input";

export default function UserForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setSubmitStatus('idle');
      setErrorMessage('');

      await api.post<UserRegistrationInput>("/users", data);

      setSubmittedUsername(data.username);
      setSubmitStatus('success');

    } catch (error: any) {
      setSubmitStatus('error');
      
      // Handle specific error messages
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 409) {
        setErrorMessage("This email or ID number is already registered.");
      } else if (error.response?.status === 500) {
        setErrorMessage("Server error. Please check if the database is connected.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      
      console.error("Registration error:", error);
    }
  };

  const handleRegisterAnother = () => {
    form.reset();
    setSubmitStatus('idle');
    setSubmittedUsername('');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 md:p-8 border rounded-xl shadow-lg bg-white dark:bg-black">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Registration Form
      </h1>
      <p className="text-center text-neutral-600 dark:text-neutral-400 mb-6">
        Join the Microsoft Learn Student Club
      </p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
            >
              <IconCheck className="w-12 h-12 text-white" stroke={3} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-3"
            >
              Welcome, {submittedUsername}! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-neutral-700 dark:text-neutral-300 mb-2"
            >
              You're all set! Let's meet at our next event.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-neutral-500 dark:text-neutral-400 mb-8"
            >
              Check your email for event updates and notifications.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleRegisterAnother}
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <IconRefresh className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Register Another User
              </span>
              <BottomGradient />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Error Message */}
            <AnimatePresence>
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <IconAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                        Registration Failed
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year and ID in a row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Study</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="6"
                            placeholder="2"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10);
                              field.onChange(isNaN(value) ? "" : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idno"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input placeholder="STU123456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mobile */}
                <FormField
                  control={form.control}
                  name="mobileno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="9876543210" 
                          maxLength={10}
                          {...field} 
                        />
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

                {/* Github (Optional) */}
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://github.com/yourusername" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <button
                  className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  <AnimatePresence mode="wait">
                    {form.formState.isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-4 h-4 border-2 border-neutral-800 dark:border-neutral-300 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          Submitting...
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submit"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-2"
                      >
                        <IconSend className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          Submit
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <BottomGradient />
                </button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
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