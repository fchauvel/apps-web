import {describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';

import { ProjectApi, createProjectStore } from "../../../src/stores/projects";

import ProjectList from "../../../src/components/projects/List.svelte";


const availableProjects = [
    {
        id: "proj-2",
        name: "Sample Project 2",
        startDate: "2023/09/15",
        budget: 400000
    },
    {
        id: "proj-3",
        name: "Sample Project 3",
        startDate: "2023/11/15",
        budget: 2000000
    }
];


class FakeApi extends ProjectApi {

    async fetchAllProjects(): Project[] {
        return availableProjects;
    }

}


describe("The project view should", () => {

    const fakeStore = createProjectStore(new FakeApi());

    render(ProjectList, { store: fakeStore });

    const projectCount = () => {
        const rows = screen.getAllByTestId(/^proj/);
        return rows.length;
    };

    test("show the available projects", () => {
        expect(projectCount()).toEqual(availableProjects.length);
    })

});
