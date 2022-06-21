import axios, { AxiosInstance } from "axios";
import { HttpClient } from "../http-client";

jest.mock("axios");

/**
 * `jest.mocked` returns an object matching the structure of the module being
 * passed in as parameter, but with all its methods typed as actual Jest Mocks.
 *
 * This comes in handy when arranging mocks or asserting on the behaviour of a module.
 */
const AxiosMock = jest.mocked(axios, true);

const MockedAxiosInstance = {
  post: jest.fn(),
  get: jest.fn(),
};

describe("HttpClient", () => {
  beforeEach(() => {
    AxiosMock.create.mockReturnValue(MockedAxiosInstance as any);
  });

  describe(".getClient()", () => {
    it("should return an AxiosInstance", () => {
      const client = HttpClient.getClient();

      expect(client).toBe(MockedAxiosInstance);
    });
  });

  describe(".post()", () => {
    it("should `AxiosInstance.post()` with any given parameters", async () => {
      await HttpClient.post("/test", { someParameter: 123 });

      expect(MockedAxiosInstance.post).toHaveBeenCalledWith("/test", {
        someParameter: 123,
      });
    });

    it("should raise any errors from `AxiosInstance.post()`", async () => {
      MockedAxiosInstance.post.mockRejectedValueOnce(new Error("some error"));

      const postPromise = HttpClient.post("/test", { someParameter: 123 });

      expect(postPromise).rejects.toThrowError("some error");
    });
  });

  describe(".get()", () => {
    it("should `AxiosInstance.get()` with any given parameters", async () => {
      await HttpClient.get("/test", { someParameter: 123 });

      expect(MockedAxiosInstance.get).toHaveBeenCalledWith("/test", {
        params: {
          someParameter: 123,
        },
      });
    });

    it("should raise any errors from `AxiosInstance.get()`", async () => {
      MockedAxiosInstance.get.mockRejectedValueOnce(new Error("some error"));

      const getPromise = HttpClient.get("/test", { someParameter: 123 });

      expect(getPromise).rejects.toThrowError("some error");
    });
  });
});
