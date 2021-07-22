const express = require("express");
const ks = require("node-key-sender");

const app = express();
app.use(express.json({ limit: "10kb" }));

app.post("/api/Keyboard/event", (req, res) => {
  const { keyCode } = req.body;
  if (!keyCode) {
    return res.json({
      status: false,
      message: "Invalid keyCode",
    });
  }

  ks.sendKey(keyCode);

  return res.json({
    status: true,
    message: `keyCode:${keyCode} sent`,
  });
});

app.use("/", (req, res) =>
  res.send(
    "<h1>Hi, use this route to send keyboard events POST /api/Keyboard/event</h1>"
  )
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("start listen on port:" + port));
