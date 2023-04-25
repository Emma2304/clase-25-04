const { SlashCommandBuilder, bold, User } = require('discord.js');
const db = require('../../db/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('borrar-usuario')
        .setDescription('Elimina tu usuario!'),

    async execute(interaction) {
        try {
            const id = interaction.user.id;

            const statement = db.prepare(`
            DELETE FROM users
            WHERE user_id = ?
        `);

            statement.run(id);

            await interaction.reply(stripIndents`
            <@${id}>
            Se eliminado tu usuario ${bold(id)}
            `);

        } catch (error) {
            if (error.message === 'UNIQUE constraint failed: users.user_id') {
                await interaction.reply(`<@${interaction.user.id}> Tu usuario ya esta registrado`);
            }
        }
    },
};