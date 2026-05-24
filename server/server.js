import http from "http";
import express from "express";

const PORT = 5000;

const server = http.createServer((req, res) => res.end("Hello Attendx-AI"));

server.listen(PORT, () => {
  console.log(`Server is runnig ${PORT}`);
});
