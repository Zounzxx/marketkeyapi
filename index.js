const express = require("express");
const axios = require("axios");
const app = express();

const config = {
  ownerid: "c3ctpOZt7u",          // ← seu OwnerID no KeyAuth
  appname: "Marketada",           // ← nome do app criado no KeyAuth
  version: "1.0"                  // ← versão configurada no app
};

app.get("/verificar", async (req, res) => {
  const key = req.query.key;
  if (!key) {
    return res.status(400).json({ success: false, message: "Key não enviada" });
  }

  const data = {
    type: "login",                // ← obrigatório, mesmo para só key
    key: key,
    name: config.appname,
    ownerid: config.ownerid,
    version: config.version
  };

  try {
    const response = await axios.post("https://keyauth.win/api/1.3/", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Erro ao verificar key" });
  }
});

app.get("/", (req, res) => {
  res.send("🟢 API do Marketada Online (KeyAuth v1.3)");
});

app.listen(3000, () => {
  console.log("✅ Servidor rodando na porta 3000");
});
