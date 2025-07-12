const moment = require('moment-timezone');

let lock = false;

let handler = async function (m) {
  if (lock) return; // Prevent multiple runs
  lock = true;

  setInterval(async () => {
    try {
      const day = moment().tz('Africa/Nairobi').format('dddd');
      const date = moment().tz('Africa/Nairobi').format('MMMM Do YYYY');
      const time = moment().tz('Africa/Nairobi').format('h:mm A');
      const bio = `📅 ${day}, ${date} | 🕒 ${time} | 🤖 Silva Spark MD`;

      await this.updateProfileStatus(bio).catch(console.error);

      console.log(`✅ Bio updated: ${bio}`);
    } catch (err) {
      console.error('❌ Error updating bio:', err);
    }
  }, 60 * 1000); // Update every 1 minute
};

handler.before = handler;
module.exports = handler;