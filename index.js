const express = require("express");
console.log("DADOS ENVIADOS:", data);
const axios = require("axios");
const app = express();

const config = {
  ownerid: "c3ctpOZt7u",
  name: "Marketada",
  version: "1.0"
};

app.get("/verificar", async (req, res) => {
  const key = req.query.key;

  if (!key) {
    return res.status(400).json({ success: false, message: "Key não enviada" });
  }

const data = {
  type: "login",
  key: key,
  name: config.name,
  ownerid: config.ownerid,
  version: config.version
};

console.log("📦 DADOS ENVIADOS PARA KEYAUTH:", data);


  try {
    const response = await axios.post("https://keyauth.win/api/1.3/", data, {
      headers: { "Content-Type": "application/json" }
    });

    return res.json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Erro ao verificar key" });
  }
});

app.get("/", (req, res) => {
  res.send("🔓 API KeyAuth Online");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Servidor rodando");
});
