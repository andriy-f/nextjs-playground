import { composeWith } from 'ramda'

// type CreateTodoWebRequest = {
//     headers: string[],
//     body: FormData,
// }

// type CreateTodoWebRequestWithParsedBody = CreateTodoWebRequest & {
//     parsedBody: unknown,
// }

// const parseCreateTodoWebRequest = (body: unknown) => {
// }

export const handleCreateTodoWebRequest = composeWith(() => 1,
    [() => 1])