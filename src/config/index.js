// 基础地址
// export const baseUrl = `http://localhost:8080`;

export const NODE_ENV = process.env.NODE_ENV;
export const isDev = NODE_ENV === 'development';

export const baseUrl = isDev ? `http://localhost:8080` : `https://garlic.chinanoni.com`;
