const shop = require('../../models/shopItems.js');

module.exports = {
  name: 'shop',
  aliases: ['s'],
  description: 'Mostra a loja.',
  usage: '?shop',
  // eslint-disable-next-line no-unused-vars
  async execute(message, profileData, args, Discord, client) {
    try {

			// Main variable declaration

			shop.items.forEach(item => {
				client.shopItems.set(item.name, item);
			});
			const items = client.shopItems.map((its) => {return its;});
			const backId = 'back';
			const forwardId = 'forward';

			// Shop buttons

			const backButton = new Discord.MessageButton({
        style: 'SECONDARY',
        label: 'Voltar',
        emoji: '⬅️',
        customId: backId,
      });
      const forwardButton = new Discord.MessageButton({
        style: 'SECONDARY',
        label: 'Seguir',
        emoji: '➡️',
        customId: forwardId,
      });

			// Generating shop

			const generateEmbed = async start => {
        const current = items.slice(start, start + 10);
        return new Discord.MessageEmbed({
          title: 'LOJA DO PRETO',
					color: '#fcba03',
					thumbnail: {
						url: 'https://c.tenor.com/jJKcXYqft4AAAAAC/hehehe.gif',
					},
          fields: await Promise.all(
            current.map(async item => ({
              name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
              value: ':coin: BR ' + item.cost,
            })),
          ),
        });
      };

			// Validating whether all items can fit on one page

			const canFitOnOnePage = items.length <= 5;

			// Sending embed

			const embedMessage = await message.channel.send({
        embeds:[await generateEmbed(0)],
        components: canFitOnOnePage
        ? []
        : [new Discord.MessageActionRow({ components: [forwardButton] })],
      });

			if (canFitOnOnePage) return;

			// Creating collector for buttons

      const collector = embedMessage.createMessageComponentCollector({
        filter: ({ user }) => user.id === message.author.id,
      });

			// Initializing collector

			let currentIndex = 0;
      collector.on('collect', async interaction => {
        interaction.customId === backId ? (currentIndex -= 5) : (currentIndex += 5);
        await interaction.update({
          embeds: [await generateEmbed(currentIndex)],
          components: [
            new Discord.MessageActionRow({
              components: [
                ...(currentIndex ? [backButton] : []),
                ...(currentIndex + 5 < items.length ? [forwardButton] : []),
              ],
            }),
          ],
        });
      });
    }
    catch (err) {
      console.log(err);
      return message.reply('Ocorreu um erro ao processar a loja!');
    }
  },
};