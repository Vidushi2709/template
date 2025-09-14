import { Panel } from "@/components/panel";
import { SiteFrame } from "@/components/site-frame";
import Image from "next/image";

export const revalidate = 604800; // revalidate weekly (7 days in seconds)

const QUOTES: { text: string; author: string }[] = [
    {
      text: "Do not wait for someone else to come and speak for you. It’s you who can change the world.",
      author: "Sheryl Sandberg, COO of Facebook"
    },
    {
      text: "Leadership is not about titles, positions, or flowcharts. It is about one life influencing another.",
      author: "Indra Nooyi, Former CEO of PepsiCo"
    },
    {
      text: "The most courageous act is still to think for yourself. Aloud.",
      author: "Carly Fiorina, Former CEO of HP"
    },
    {
      text: "We need women at all levels, including the top, to change the dynamic, reshape the conversation.",
      author: "Reshma Saujani, Founder of Girls Who Code"
    },
    {
      text: "Don’t be intimidated by what you don’t know. That can be your greatest strength and ensure that you do things differently from everyone else.",
      author: "Sara Blakely, Founder of Spanx"
    },
    {
      text: "Done is better than perfect.",
      author: "Marissa Mayer, Former CEO of Yahoo"
    },
    {
      text: "If you are offered a seat on a rocket ship, don’t ask what seat! Just get on.",
      author: "Sheryl Sandberg, COO of Facebook"
    },
    {
      text: "Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence.",
      author: "Sallie Krawcheck, CEO and Co-Founder of Ellevest"
    },
    {
      text: "I never dreamed about success. I worked for it.",
      author: "Estee Lauder, Founder"
    },
    {
      text: "No matter what happens in life, be good to people. Being good to people is a wonderful legacy to leave behind.",
      author: "Taylor Swift"
    },
    {
      text: "Just be yourself, there is no one better.",
      author: "Taylor Swift"
    },
    {
      text: "Fearlessness is not the absence of fear. It’s the mastery of fear.",
      author: "Taylor Swift"
    },
    {
      text: "In a world that wants you to be anything but yourself, be unapologetically you.",
      author: "Taylor Swift"
    },
];

const TAYLOR_SONGS: { title: string; album: string }[] = [
  { title: "Cruel Summer", album: "Lover" },
  { title: "Blank Space", album: "1989" },
  { title: "Love Story", album: "Fearless" },
  { title: "So High School", album: "The Tortured Poets Department" },
  { title: "Anti-Hero", album: "Midnights" },
  { title: "Wildest Dreams", album: "1989" },
  { title: "Cardigan", album: "Folklore" },
  { title: "Mirrorball", album: "Folklore" },
  { title: "This Is Me Trying", album: "Folklore" },
  { title: "Seven", album: "Folklore" },
  { title: "All Too Well (10 Minute Version)", album: "Red (Taylor’s Version)" },
  { title: "Enchanted", album: "Speak Now" },
  { title: "Delicate", album: "Reputation" },
  { title: "The Archer", album: "Lover" },
  { title: "You Belong With Me", album: "Fearless" },
];

function getWeekIndex(): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(Date.now() / msPerWeek);
}

export default function Page() {
  const weekIndex = getWeekIndex();
  const quote = QUOTES[weekIndex % QUOTES.length];
  const song = TAYLOR_SONGS[weekIndex % TAYLOR_SONGS.length];

  return (
    <SiteFrame
      title="VIDUSHI ANAND"
      rightSidebar={
        <div className="flex flex-col space-y-2">
          <Panel title="quote of the week" className="h-auto flex-shrink-0">
            <div className="flex flex-col items-center justify-center px-3 py-2 text-center">
              <p className="text-xs italic">&ldquo;{quote.text}&rdquo;</p>
              <p className="mt-1 text-xs font-semibold">— {quote.author}</p>
            </div>
          </Panel>

          <div className="hidden md:block flex-shrink-0">
            <div className="flex items-center justify-center p-4">
              <Image 
                src="https://i.pinimg.com/1200x/4b/21/15/4b2115bbccbe26a000ce9307f6dfecad.jpg" 
                alt="Vin" 
                width={300}
                height={192}
                className="max-w-full max-h-48 object-contain rounded-lg"
              />
            </div>
          </div>

          <Panel title="now playing" className="h-auto flex-shrink-0">
            <div className="px-3 py-1">
              <p className="font-semibold text-xs">{song.title}</p>
              <p className="text-xs text-[var(--secondary-foreground)]">Taylor Swift</p>
            </div>
          </Panel>
        </div>
      }
    >
      <div className="h-full flex flex-col space-y-3">
        <Panel title="welcome!" headerDecor scrollable className="flex-1">
          <p className="mb-2">
            Hi there! 🌸✨ <em>Welcome to my little corner of the internet!</em><br/>
            I AM VIDUSHI!! (or Vin)<br/>
            A curious little soul exploring all things AI, getting lost in books, and folding tiny paper worlds one crane at a time. When I&apos;m not dreaming with code or paper, you&apos;ll probably find me scribbling little stories about life or daydreaming about all the pink and glitter the world has to offer ✨💖
          </p>
        </Panel>

        <Panel title="FAQ (sort of):" scrollable className="flex-1">
          <p className="font-semibold">Q: If a neural network had feelings, would it like pink too?</p>
          <p className="mb-3">A: Totally! I&apos;m sure it would love pink as much as I do and maybe even demand a little glitter on top 🤖✨🌸.</p>

          <p className="font-semibold">Q: What does your AI hallucinate about?</p>
          <p className="mb-3">A: Mostly pink paper cranes and random plot twists… sometimes my code 🙃.</p>
        </Panel>
      </div>
    </SiteFrame>
  );
}
