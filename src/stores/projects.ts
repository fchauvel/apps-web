import { writable } from "svelte/store";

import axios from "axios";

import { Setup } from "../../setup";



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

    private readonly apiBaseUrl: string;

    constructor (apiBaseUrl: string) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async fetchAllProjects (): any {
        try {
            const response = await axios.get(this.allProjectsURL);
            return response.data;

        } catch (error) {
            console.log(`Unable to fetch all projects from ${this.allProjectsURL}`);
            throw error;

        }

    }

    private get allProjectsURL () {
        return this.apiBaseUrl + "/projects";
    }

}

export const projectStore = createProjectStore(new ProjectApi(Setup.API_BASE_URL));
