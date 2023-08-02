import { writable } from "svelte/store";

export class Project {

    static fromJsonDocument(document: any): Project {
        return new Project(document.id,
                           document.name,
                           document.startDate,
                           document.budget);
    }

    private _id: string;
    private _name: string;
    private _startDate: Date;
    private _budget: number;

    constructor (id, name, startDate, budget) {
        this._id = id;
        this._name = name;
        this._startDate = startDate;
        this._budget = budget;
    }

    get id () { return this._id; }

    get startDate () { return this._startDate; }

    get budget () { return this._budget; }

    get name () { return this._name; }

}


export function createProjectStore (api: ProjectApi): writable<Project> {
    const {subscribe, set, update} = writable<Project>([], (set) => {
        api.fetchAllProjects()
            .then((documents) => {
                const projects = documents.map(Project.fromJsonDocument);
                set(projects);
            })
            .catch ((error) => {
                console.log("Unable to fetch all the projects!");
                console.error(error);

            });

        return function stop() {
            console.log("Project store stopped");
        }
    });

    return {
        subscribe,
        set,
        update
    };
}


export class ProjectApi {

    async fetchAllProjects (): any {
        return [
            {
                id: "proj-1",
                name: "Sample Project 1",
                startDate: "2023/07/31",
                budget: 1000000
            }
        ];
    }
}

export const projectStore = createProjectStore(new ProjectApi());
