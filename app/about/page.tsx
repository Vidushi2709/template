import { SiteFrame } from "@/components/site-frame";
import { Panel } from "@/components/panel";
import Image from "next/image";

export default function AboutPage() {
  return (
    <SiteFrame
      title="VIDUSHI ANAND"
      rightSidebar={
        <div className="flex flex-col space-y-3 md:space-y-3 sm:space-y-6">
          <Panel title="currently" scrollable className="h-[28rem]">
            <ul className="list-disc pl-6 [--bullet:var(--secondary)] space-y-2">
              <li className="ml-2">3rd-year B.Tech student in Computer Science (AIML)</li>
              <li className="ml-2">Working part-time as an intern at API Market</li>
              <li className="ml-2">
              Vice President of <strong>Deviators Club</strong>, a college club fostering coding, AI, and technology. 
            </li>
              <li className="ml-2">Learning about LLMs and exploring latest AI research papers</li>
              <li className="ml-2">
              Juggling multiple projects, learning, and personal creative pursuits
              </li>
            </ul>
          </Panel>
          
          <div className="hidden md:block">
            <div className="flex items-center justify-center p-4">
              <Image 
                src="https://i.pinimg.com/736x/ee/64/5e/ee645e7ace895816a8972efbdb83c427.jpg" 
                alt="Vidushi Anand" 
                width={300}
                height={256}
                className="max-w-full max-h-64 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col space-y-3 md:space-y-3 sm:space-y-10">
        <Panel title="about me" headerDecor className="h-[calc(24rem-35px)]">
          <div className="space-y-2">
            <p>
              Just a curious girlie endlessly fascinated by all things AI, from ML and DL to LLMs and every new buzzword that catches the eye 🤖. I love figuring out how things work (or sometimes don&apos;t).
            </p>
            <p>
              When not deep in AI, you&apos;ll probably find me reading, writing about life, folding tiny paper worlds with origami, or painting my nails in my own little cocoon. That is my little happy space where I&apos;m alone with my thoughts, doing whatever I want ✨🌸. 
            </p>
          </div>
        </Panel>

        <Panel title="technical skills" scrollable className="h-96">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--primary)] mb-2">Programming Languages</h3>
              <ul className="grid list-disc grid-cols-1 gap-x-6 gap-y-1 pl-6 sm:grid-cols-2">
                <li>Python</li>
                <li>Java</li>
                <li>R</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[var(--primary)] mb-2">AI & Machine Learning</h3>
              <ul className="grid list-disc grid-cols-1 gap-x-6 gap-y-1 pl-6 sm:grid-cols-2">
                <li>Supervised & Unsupervised Learning</li>
                <li>Deep Learning</li>
                <li>Transfer Learning</li>
                <li>LLMs Fine-tuning</li>
                <li>BERT & Transformers</li>
                <li>Model Optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[var(--primary)] mb-2">Data Science & Libraries</h3>
              <ul className="grid list-disc grid-cols-1 gap-x-6 gap-y-1 pl-6 sm:grid-cols-2">
                <li>TensorFlow & PyTorch</li>
                <li>OpenCV</li>
                <li>NumPy & Pandas</li>
                <li>Scikit-learn</li>
                <li>EDA & Feature Engineering</li>
                <li>Time Series Forecasting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[var(--primary)] mb-2">Tools & Deployment</h3>
              <ul className="grid list-disc grid-cols-1 gap-x-6 gap-y-1 pl-6 sm:grid-cols-2">
                <li>MongoDB</li>
                <li>ML Deployment</li>
                <li>Git</li>
                <li>Kaggle</li>
                <li>Google Colab</li>
              </ul>
            </div>
          </div>
        </Panel>
      </div>
    </SiteFrame>
  );
}
