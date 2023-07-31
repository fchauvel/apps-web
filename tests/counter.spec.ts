import {describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';

import Counter, { Keys } from "../src/components/Counter.svelte";

describe("The counter should", () => {

    render(Counter);

    const increaseButton = () => {
        return screen.getByTestId(Keys.INCREMENT_BUTTON);
    }

    const decreaseButton = () => {
        return screen.getByTestId(Keys.DECREMENT_BUTTON);
    };

    const count = () => {
        const text = screen.getByTestId(Keys.TEXT);
        const countText = text.innerHTML.match(/([0-9]+)/g);
        return parseInt(countText);
    }

    test("be initially at zero", () => {
        expect(count()).toEqual(0);
    });

    test("increase when incremented", async () => {
        const oldCount = count();
        await fireEvent.click(increaseButton());
        expect(count()).toEqual(oldCount + 1);
    });

    test("decrease when decremented", async () => {
        const oldCount = count();
        await fireEvent.click(decreaseButton());
        expect(count()).toEqual(oldCount - 1);
    });

    test("not decrease beyond 0", async () => {
        await fireEvent.click(decreaseButton());
        expect(count()).toEqual(0);
    });

});
