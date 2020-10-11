import React from "react";

interface ClientFetchInfo {
  method?: string;
  body?: object;
  authenticated: boolean;
}

export class Client {
  async fetch(
    url: string,
    { method, body, authenticated = true }: ClientFetchInfo
  ) {
    const token = ''; // TODO: get token
    const resp = await fetch(url, {
      method: method || (body ? "POST" : "GET"),
      headers: {
        ...(body ? { "Content-Type": "application/json" } : undefined),
        ...(authenticated ? { Authorization: `Bearer ${token}` } : undefined),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const respBody = await resp.json();
    return {
      ...resp,
      ok: resp.ok,
      body: respBody,
    };
  }
  // TODO: verify state before logging in
  async login({ token }: { token: string }) {
    const resp = await this.fetch("/login", {
      authenticated: false,
      body: { token },
    });
    return resp;
  }
}

interface UserState {
  loggedIn: boolean;
}

interface PlainUserAction {
  type: "loggedIn" | "loggedOut";
}

type UserAction = PlainUserAction;

export const initialState = { loggedIn: false };

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "loggedIn":
      return { ...state, loggedIn: true };
    case "loggedOut":
      return { ...state, loggedIn: false };
  }
}

const UserContext = React.createContext({});

export default UserContext;
