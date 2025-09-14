import { SiteFrame } from "@/components/site-frame";
import { Panel } from "@/components/panel";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { GitHubStats } from "@/components/github-stats";

export default function ProjectsPage() {
  return (
    <SiteFrame
      title="VIDUSHI ANAND"
      rightSidebar={
        <div className="h-full flex flex-col space-y-3">
          <div className="hidden md:block">
            <GitHubStats username="Vidushi2709" />
          </div>
        </div>
      }
    >
      <div className="h-full flex flex-col">
        <Panel title="projects" scrollable className="h-[650px]">
          <div className="grid grid-cols-1 gap-3">
            {projects.map((p) => (
              <ProjectCard
                key={p.slug}
                title={p.title}
                description={p.description}
                image={p.image}
                link={p.link}
                repo={p.repo}
              />
            ))}
          </div>
        </Panel>
      </div>
    </SiteFrame>
  );
}
