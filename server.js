const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { requestCode, verifyCode } = require("./telegram-auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-code", async (req, res) => {
  const { phone } = req.body;
  try {
    await requestCode(phone);
    res.json({ success: true, message: "Code sent!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/verify-code", async (req, res) => {
  const { phone, code } = req.body;
  try {
    const session = await verifyCode(phone, code);
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});