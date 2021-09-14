module.exports = {
  name:'ready',
  once:true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('b a n a n a', { type: 'WATCHING' });
  },
};