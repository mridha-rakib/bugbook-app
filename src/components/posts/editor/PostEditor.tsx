"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UserAvatar from "@/components/UserAvatar";

import { Button } from "@/components/ui/button";
import { submitPost } from "./actions";
import "./styles.css";

export default function PostEditor() {
  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's you want to write?",
      }),
    ],
  });

  async function onSubmit() {
    const input = editor?.getText({ blockSeparator: "\n" }) || "";
    try {
      await submitPost({ content: input });
      editor?.commands.clearContent();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
        />
      </div>
      <div onClick={onSubmit} className="flex justify-end">
        <Button className="mt-2 min-w-20 rounded-full">Post </Button>
      </div>
    </div>
  );
}
