export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "build-llm-playground",
    title: "🧩 Build-LLM-Playground",
    description:
      "My sandbox for building GPT-like models from scratch, piece by piece.",
    image: "https://i.pinimg.com/736x/4b/7a/c1/4b7ac150b62af99baf665c0eccd21fe5.jpg",
    repo: "https://github.com/Vidushi2709/llm-from-scratch",
  },
  {
    slug: "kernel-hugz",
    title: "🧠 Kernel Hugz",
    description: "A LoRA-tuned TinyLlama acting as a therapist for other AIs (because they deserve therapy too).",
    image: "https://i.pinimg.com/736x/55/32/e5/5532e5ae6f579eda010f71ab9e8536b9.jpg",
    repo: "https://github.com/Vidushi2709/Dr.-Kernel-Hugz",
  },
  {
    slug: "terminalora",
    title: "💻 TerminaLoRA",
    description: "A lightweight CLI assistant that turns plain English into shell commands.",
    image: "https://i.pinimg.com/736x/ba/22/a1/ba22a11edab9672a599317d08a6038eb.jpg",
    repo: "https://github.com/Vidushi2709/TerminaLoRA",
  },
  {
    slug: "you-just-want-attention",
    title: "🎯 You Just Want Attention",
    description: "A Transformer built from scratch for German → English translation.",
    image: "https://i.pinimg.com/1200x/7c/bf/d9/7cbfd987a577a6233d0e176ecf55ae08.jpg",
    repo: "https://github.com/Vidushi2709/You_just_want_Attention",
  },
];
