<script context="module" lang="ts">
  export const Keys = {
    TEXT: "counter-text",
    INCREMENT_BUTTON: "counter-increment-button",
    DECREMENT_BUTTON: "counter-decrement-button"
  };
</script>

<script lang="ts">

  import Button from "@smui/button";

  var counter = 0;

  function increment() {
    counter = counter + 1;
  }

  function decrement () {
    if (counter > 0)
      counter = counter - 1;
  }

</script>


<div>
  <p data-testid={Keys.TEXT}>
    Counter: {counter} time(s)
  </p>

  <Button data-testid={Keys.INCREMENT_BUTTON}
          on:click={increment}>Increment</Button>

  <Button data-testid={Keys.DECREMENT_BUTTON}
          on:click={decrement}
          variant="outlined" >
    Decrement
  </Button>
</div>
