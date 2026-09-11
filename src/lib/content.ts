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

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects')
  return projects.sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured)
}

export async function getOtherProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => !p.data.featured)
}

export function projectPath(project: Project): string {
  return `/work/${project.id}`
}
