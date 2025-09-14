"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "../action";
import { initialState } from "../state";
import Button from "@/components/ui/button";
import { SiteFrame } from "@/components/site-frame";
import { Panel } from "@/components/panel";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Image from "next/image";
;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full border-[3px] border-[#f2c9a5] bg-[#fff7ef] text-[#d86fa2] shadow-[0_2px_0_#e6b98f] hover:bg-[#ffe6cc]"
    >
      {pending ? "sending..." : "send message"}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContact, initialState);

  return (
    <SiteFrame 
      title="VIDUSHI ANAND"
      rightSidebar={
        <div className="hidden md:block flex-1">
          <div className="flex items-center justify-center h-full p-4">
            <Image 
              src="https://i.pinimg.com/736x/ce/cb/4b/cecb4b8244936a1146ad519605374691.jpg" 
              alt="Contact decoration" 
              width={300}
              height={400}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      }
    >
      <div className="h-full">
        <Panel title="contact me" headerDecor scrollable className="h-[calc(100%-20px)] md:h-full">
          <div className="relative">
            {/* removed sticker above name input as requested */}
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block font-semibold text-[#7a6b55]"
                >
                  name ✨
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="bg-transparent text-[var(--foreground)]"
                  placeholder="your name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-semibold text-[#7a6b55]"
                >
                  email 💌
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-transparent text-[var(--foreground)]"
                  placeholder="your email"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block font-semibold text-[#7a6b55]"
                >
                  message 📝
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={10}
                  className="bg-transparent text-[var(--foreground)] resize-none"
                  placeholder="your message here..."
                />
              </div>

              {state.message && (
                <div
                  className={`rounded-xl border-[3px] px-3 py-2 text-sm ${
                    state.ok
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-red-300 bg-red-50 text-red-700"
                  }`}
                >
                  {state.message}
                </div>
              )}

              <div className="flex justify-center">
                <SubmitButton />
              </div>
            </form>

            {/* Mobile Social Section */}
            <div className="md:hidden mt-8">
              <Panel title="socials" scrollable className="h-auto">
                <div className="space-y-2">
                  <a
                    href="https://github.com/vidushi2709"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                  >
                    <span className="text-base">🐙</span>
                    <span className="text-sm font-semibold">github</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/vidushi-anand-49420928a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                  >
                    <span className="text-base">💼</span>
                    <span className="text-sm font-semibold">linkedin</span>
                  </a>

                  <a
                    href="https://twitter.com/idkwhyvi62159"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                  >
                    <span className="text-base">🐦</span>
                    <span className="text-sm font-semibold">twitter</span>
                  </a>

                  <a
                    href="https://medium.com/@vidushianand09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                  >
                    <span className="text-base">📖</span>
                    <span className="text-sm font-semibold">medium</span>
                  </a>
                </div>
              </Panel>
            </div>
          </div>
        </Panel>
      </div>
    </SiteFrame>
  );
}
