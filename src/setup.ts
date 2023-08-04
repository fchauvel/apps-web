import { env } from "$env/dynamic/public";

export const Setup = {
    API_BASE_URL: env.PUBLIC_API_BASE_URL
};

console.log("Setup:" + JSON.stringify(Setup, null, 2));
