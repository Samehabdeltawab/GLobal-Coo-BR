import { connect, VarChar } from 'mssql';
import config from './dbConfig'; // Import database config

class DatabaseHelper {
    static pool = null;

    static async connect() {
        if (!this.pool) {
            this.pool = await connect(config);
        }
        return this.pool;
    }

    static async updateUserPassword(email, newPasswordHash) {
        try {
            let pool = await this.connect();

            let query = `
                UPDATE AbpUsers 
                SET PasswordHash = @passwordHash, EmailConfirmed = 1 
                WHERE Email = @userEmail
            `;

            let result = await pool.request()
                .input('passwordHash', VarChar, newPasswordHash)
                .input('userEmail', VarChar, email)
                .query(query);

            console.log(`Rows affected: ${result.rowsAffected}`);
            return result.rowsAffected;
        } catch (err) {
            console.error('SQL error', err);
        }
    }

    static async getLatestResetLinkByRecipient(recipient) {
        try {
            let pool = await this.connect();

            let query = `
            SELECT TOP 1 TemplateValues
            FROM Notifications
            WHERE Recipients = @recipient
            ORDER BY CreationTime DESC
        `;

            let result = await pool.request()
                .input('recipient', VarChar, recipient)
                .query(query);

            if (result.recordset.length > 0) {
                const templateValuesJson = result.recordset[0].TemplateValues;
                const templateValues = JSON.parse(templateValuesJson);
                return templateValues.ResetLink || null;
            } else {
                return null;
            }
        } catch (err) {
            console.error('SQL error', err);
            return null;
        }
    }

    static async close() {
        if (this.pool) {
            await this.pool.close();
            this.pool = null;
        }
    }
}

export default DatabaseHelper;