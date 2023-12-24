import { superjson } from "@acme/api/client";

export default () => {
  fetch("http://localhost:3000/api/trpc/user.test", {
    method: 'POST',
  body: JSON.stringify({
    hello: 'world'
  })
  })
  return null;
}
