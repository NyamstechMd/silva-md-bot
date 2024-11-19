import { exec } from 'child_process';
import speed from 'performance-now';

let handler = async (m, { conn }) => {
  // Thumbnail for external ad reply
  const prankThumbnail = 'https://i.imgur.com/z9TGGlv.jpeg'; // Replace with your desired prank image URL
  const prankGif = 'https://github.com/SilvaTechB/silva-md-bot-cmds/blob/main/HACKING.gif'; // Example GIF URL

  // Fake contact message (optional)
  let prankContact = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `SYLIVANUS`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'SILVA MD'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  // Initial prank message
  let prankMsg = await conn.sendMessage(
    m.chat,
    { text: '⚠️ *CRITICAL ERROR DETECTED!* 🛠️ Starting diagnostics...', gifPlayback: true, video: { url: prankGif } },
    { quoted: prankContact }
  );

  // Simulate latency and system stats
  let timestamp = speed();

  await exec('neofetch --stdout', async (error, stdout) => {
    let latency = (speed() - timestamp).toFixed(4);

    // Prank sequence
    const prankSteps = [
      `🔍 *Scanning system for vulnerabilities...*`,
      `💻 *Analyzing network traffic...*`,
      `🔥 *ERROR!* Unexpected malware detected!`,
      `📡 *Deploying countermeasures...*`,
      `❌ *Failed to neutralize the threat!*`,
      `⚠️ *System breach in progress!*`,
      `🛠️ *Rebooting system...*`,
      `😂 *Gotcha! Just a prank. Relax!*`,
    ];

    // Send prank sequence messages with delay
    for (const step of prankSteps) {
      await new Promise((res) => setTimeout(res, 6000)); // 6-second delay
      await conn.sendMessage(m.chat, { text: step }, { quoted: prankContact });
    }

    // Final prank "system stats" message
    await conn.sendMessage(
      m.chat,
      {
        text: `😆 *Your SILVA MD Bot is running perfectly fine!* Here's a bot stat:\n\n` +
          `📊 *Latency*: ${latency} ms\n` +
          `💡 *Uptime*: ${process.uptime().toFixed(2)} seconds\n\n` +
          `🎉 Hope you enjoyed the hacking process!`,
        contextInfo: {
          externalAdReply: {
            title: '𝐒𝐈𝐋𝐕𝐀 𝐌𝐃 Hacking Mode',
            body: 'Just for hackers! 💀',
            thumbnailUrl: prankThumbnail,
            sourceUrl: 'https://github.com/SilvaTechB/silva-md-bot',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: prankContact }
    );
  });
};

// Command metadata
handler.help = ['prank'];
handler.tags = ['fun'];
handler.command = ['hack'];

export default handler;
