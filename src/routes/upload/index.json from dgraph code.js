/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://blue-surf-460106.us-east-1.aws.cloud.dgraph.io/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzL3Byb3h5IiwiZHVpZCI6IjB4MmFiYzE3YSIsImV4cCI6MTYzNzE5NDk4MywiaXNzIjoicy9hcGkifQ.7MXIkJqYW2FUhneccGdYL7x3YvBDUoCB9hKh8ZqfKz0"
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const operationsDoc = `
  mutation MyMutation {
    addQuote(input: {quoteBody: "This is a test quote", author: {name: "Michael of course", titleLong: "The Data"}, context: "learning APIs", source: "frustration", tags: {tag: "learning, coding"}}) {
      numUids
    }
  }
`;

function executeMyMutation() {
  return fetchGraphQL(
    operationsDoc,
    "MyMutation",
    {}
  );
}

async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startExecuteMyMutation();