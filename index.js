require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  AttachmentBuilder,
} = require("discord.js");

const {
  createCanvas,
  loadImage,
} = require("@napi-rs/canvas");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("clientReady", () => {
  console.log(`✅ ${client.user.tag} is online`);
});

client.on("guildMemberAdd", async (member) => {

  const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);

  if (!channel) return;

  // Création du canvas
  const canvas = createCanvas(1200, 500);
  const ctx = canvas.getContext("2d");

  // ---------- Background ----------
  const gradient = ctx.createLinearGradient(0, 0, 1200, 500);
  gradient.addColorStop(0, "#0f172a");
  gradient.addColorStop(1, "#1e293b");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glow bleu
  ctx.shadowColor = "#3b82f6";
  ctx.shadowBlur = 120;

  ctx.fillStyle = "#2563eb";
  ctx.beginPath();
  ctx.arc(150, 120, 90, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;

  // Glow violet
  ctx.shadowColor = "#9333ea";
  ctx.shadowBlur = 120;

  ctx.fillStyle = "#9333ea";
  ctx.beginPath();
  ctx.arc(1100, 450, 100, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;

  // Glass Card
  ctx.fillStyle = "rgba(17,24,39,0.82)";
  ctx.roundRect(40, 40, 1120, 420, 25);
  ctx.fill();

  // 👇 Ghadi nkmlou hna f réponse jaya
    // Avatar
  const avatar = await loadImage(
    member.user.displayAvatarURL({
      extension: "png",
      size: 512,
    })
  );

  // Cercle blanc derrière l'avatar
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(950, 250, 95, 0, Math.PI * 2);
  ctx.fill();

  // Avatar rond
  ctx.save();

  ctx.beginPath();
  ctx.arc(950, 250, 90, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatar, 860, 160, 180, 180);

  ctx.shadowColor = "#3b82f6";
ctx.shadowBlur = 50;

  ctx.restore();

  ctx.shadowBlur = 0;

  // Bordure bleue
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.arc(950, 250, 95, 0, Math.PI * 2);
  ctx.stroke();

  // Welcome
  ctx.font = "bold 64px Arial";
  ctx.fillStyle = "#60a5fa";
  ctx.shadowColor = "#3b82f6";
ctx.shadowBlur = 30;
  ctx.fillText("WELCOME", 80, 140);
  ctx.shadowBlur = 0;

  // Username
  ctx.font = "bold 48px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(member.displayName, 80, 230);

  // Member Count
  ctx.font = "28px Arial";
  ctx.fillStyle = "#9ca3af";
  ctx.fillText(
    `Member #${member.guild.memberCount}`,
    80,
    290
  );

  // Server Name
  ctx.font = "28px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    member.guild.name,
    80,
    340
  );

  // Petit texte
  ctx.font = "22px Arial";
  ctx.fillStyle = "#6b7280";
  ctx.fillText(
    "We're happy to have you here!",
    80,
    390
  );
  ctx.strokeStyle = "#3b82f6";
ctx.lineWidth = 4;

ctx.beginPath();
ctx.moveTo(80, 170);
ctx.lineTo(420, 170);
ctx.stroke();

ctx.fillStyle = "#3b82f6";

ctx.beginPath();
ctx.arc(110, 110, 8, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(140, 110, 8, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(170, 110, 8, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = "#2563eb";
ctx.roundRect(720, 70, 180, 45, 15);
ctx.fill();

ctx.font = "bold 22px Arial";
ctx.fillStyle = "#ffffff";
ctx.fillText("NEW MEMBER", 748, 100);

ctx.font = "20px Arial";
ctx.fillStyle = "#6b7280";

ctx.fillText(
    "Enjoy your stay and have fun!",
    80,
    430
);

  // Export PNG
  const buffer = await canvas.encode("png");

  const attachment = new AttachmentBuilder(buffer, {
    name: "welcome.png",
  });

  // Envoi
  await channel.send({
    content: `🎉 Welcome ${member}!`,
    files: [attachment],
  });

});
client.login(process.env.TOKEN);
