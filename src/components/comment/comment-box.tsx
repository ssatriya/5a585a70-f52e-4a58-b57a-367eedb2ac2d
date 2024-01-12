"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  AddCommentSchema,
  AddCommentType,
  CommentContent,
} from "@/lib/schema/comment";
import { cn } from "@/lib/utils";
import { addComment } from "@/actions/comment";

type CommentBoxProps = {
  postId: string;
  userId: string;
  setLocalComments: React.Dispatch<
    React.SetStateAction<CommentContent[] | undefined>
  >;
};

const CommentBox = ({ postId, userId, setLocalComments }: CommentBoxProps) => {
  const [isPending, startTransition] = React.useTransition();

  const [open, setOpen] = React.useState(false);

  const form = useForm<AddCommentType>({
    resolver: zodResolver(AddCommentSchema),
    defaultValues: {
      body: "",
      postId: +postId || undefined,
      userId: +userId || undefined,
    },
  });

  const onSubmit = (values: AddCommentType) => {
    startTransition(() => {
      addComment(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
          if (data.data) {
            setLocalComments((prev) => [data.data].concat(prev));
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          form.reset();
          setOpen(false);
        });
    });
  };

  const onClick = () => {
    setOpen((prev) => !prev);
    form.reset();
  };

  return (
    <div className="w-full space-y-2">
      <Button
        onClick={onClick}
        size="sm"
        variant="toggle"
        className={cn(open && "bg-secondary/50")}
        data-test="comment-button"
      >
        Add comment
      </Button>
      {open && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
            data-test="comment-form"
          >
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your comment"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage data-test="form-comment-message" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex justify-end"
              disabled={isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
export default CommentBox;
