import { AuthAPI } from "./AuthAPI";

class BaseAPI {
  static API_URL = "http://localhost:3000/api/v1"; // Base URL for all API requests
  static DEFAULT_TIMEOUT = 5 * 1000

  static async sendRequest(method, payload = null, payloadUrl = '', timeout = DEFAULT_TIMEOUT) {
    try {
      const controller = new AbortController(); // Create an AbortController
      const signal = controller.signal;        // Get the signal

      const timeoutId = setTimeout(() => controller.abort(), timeout); // Set timeout
      
      const authToken = AuthAPI.getToken()
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      };

      const requestOptions = {
        method,              // The HTTP method (GET, POST, etc.)
        headers,
        signal,
      };

      if (payload) {
        requestOptions.body = JSON.stringify(payload); // Add payload to the request if it's a POST or PUT request
      }

      const url = `${this.API_URL}${payloadUrl}`; // Construct the full URL with the optional payloadUrl

      const response = await fetch(url, requestOptions);

      clearTimeout(timeoutId); // Clear the timeout if the request succeeds

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Request timed out");
        return []; // Handle timeout by returning an empty array or other response
      } else {
        console.error("Error with the request:", error);
        return null;
      }
    }
  }
}

export default BaseAPI;