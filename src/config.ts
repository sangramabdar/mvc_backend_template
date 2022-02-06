type Configuration = {
  port?: number;
  jwtSecretKey?: string;
};

const configure: Configuration = {
  port: 8080,
  jwtSecretKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZmYjM2NjMwYTA2MDJlZDUxNzZiNzUiLCJlbWFpbCI6InNhbmdyYW1hYmRhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTY0NDE1NTQ2OH0.dy2aLcP5B8ivkF7MsotF2oMKj1Kx0fGkTekVny2L2Jk",
};

export default configure;
