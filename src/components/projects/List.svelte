<script lang="ts">
  import { projectStore } from "../../stores/projects";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  export let store = projectStore;
</script>

<div>
  <DataTable table$aria-label="Project list" style="max-width: 100%;">
    <Head>
      <Row>
        <Cell>ID</Cell>
        <Cell>Name</Cell>
        <Cell>Start Date</Cell>
        <Cell>Budget</Cell>
      </Row>
    </Head>
    <Body>
      {#each $store as eachProject }
        <Row data-testid={eachProject.id} >
          <Cell>{eachProject.id}</Cell>
          <Cell>{eachProject.name}</Cell>
          <Cell>{eachProject.startDate}</Cell>
          <Cell>{eachProject.budget}</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
</div>
