interface User {
    userId: number;
    createProject(projectInfo: ProjectInfo) : Project;
    getProjects() : Project[];
}