import { MailtrapClient } from "mailtrap";

const TOKEN = "0da2675ffb631d12ed9aa4e255bf0638";
const SENDER_EMAIL = "hello@demomailtrap.com";
const RECIPIENT_EMAIL = "warriordragon168@gmail.com";

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Trendify AI", email: SENDER_EMAIL };

client
  .send({
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from Us!",
    text: "Welcome to Trendify AI! We are excited to have you on board.",
  })
  .then(console.log)
  .catch(console.error);