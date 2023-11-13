export async function handleResponse(response: Response) {
    try {
      const jsonResponse = await response.json();
      console.log('meu json do handle', jsonResponse)
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }