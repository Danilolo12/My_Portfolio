import { getCollection, type CollectionEntry } from 'astro:content'

export type Project = CollectionEntry<'projects'>
export type Job = CollectionEntry<'experience'>

/** Most recent role first; an open-ended role always sorts to the top. */
export async function getTimeline(): Promise<Job[]> {
  const jobs = await getCollection('experience')
  return jobs.sort((a, b) => {
    const aEnd = a.data.end?.getTime() ?? Infinity
    const bEnd = b.data.end?.getTime() ?? Infinity
    return bEnd - aEnd || b.data.start.getTime() - a.data.start.getTime()
  })
}

async function sorted(): Promise<Project[]> {
  const projects = await getCollection('projects')
  return projects.sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  )
}

/** Everything that gets a case-study page. Restricted work is named only. */
export async function getProjects(): Promise<Project[]> {
  return (await sorted()).filter((project) => !project.data.restricted)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.data.featured)
}

export async function getOtherProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => !project.data.featured)
}

/** Employer-owned systems we can name but not describe. */
export async function getRestrictedProjects(): Promise<Project[]> {
  return (await sorted()).filter((project) => project.data.restricted)
}

export function projectPath(project: Project): string {
  return `/work/${project.id}`
}
