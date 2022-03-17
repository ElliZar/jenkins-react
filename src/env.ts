declare global {
  interface Window {
    env: any
  }
}

type EnvType = {
  REACT_APP_HOST_IP_ADDRESS: string,
}
const DEFAULT_DEVELOPMENT_ENVS = {
  ...process.env,
  REACT_APP_HOST_IP_ADDRESS: "http://localhost:7777"
}

const generateEnv = (): EnvType => {
  if (process.env.NODE_ENV !== "production") {
    return DEFAULT_DEVELOPMENT_ENVS;
  }
  return { ...process.env, ...window.env }
}

export const env = generateEnv();