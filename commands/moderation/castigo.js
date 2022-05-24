module.exports = {
	name:'castigo',
	description: 'Coloque alguém de castigo (ADMIN).',
	category: 'moderation',
	aliases: ['ct'],
	usage: '?castigo <tempo_de_castigo> <motivo> <user>',
	execute(message, profileData, args) {
		const user = message.mentions.users.first();
		if (message.channel.type == 'DM') {
			message.reply('Este comando não pode ser executado no chat privado!');
			return;
		}
		if (user) {
		const member = message.guild.members.resolve(user);
			if (message.member.permissions.has('ADMINISTRATOR')) {
				try {

					// Validação de tempo do castigo

					let timeAmount;
					const amntValidation = isNaN(parseInt(args[0]));
					if (amntValidation === true) {
						timeAmount = 1 * 60000;
					}
					else {
						timeAmount = args.shift() * 60000;
					}

					// Declaração da razão do castigo

					const reason = args.join(' ');
					member.timeout(timeAmount, reason);
					message.channel.send(`${member} está preso na árvore do macaco por ${timeAmount / 60000} minuto(s)!`);
				}
				catch (error) {
					console.log(error);
					message.channel.send(`Você não tem permissão para usar este comando! ${message.author}`);
				}
			}
			else {
				message.channel.send(`Você não tem permissão para usar este comando! ${message.author}`);
			}
		}
		else {
			message.channel.send('Você precisar marcar alguém para poder bota-lo de castigo!');
		}
	},
};