import app from './config/server';
import eventRoutes from './routes/eventRoutes';
import logger from './utils/logger';
import sequelize from './config/database';

app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    logger.info(`Server is running on port ${PORT}`);
    try {
        await sequelize.sync();
        logger.info('Database connected');
    } catch (error) {
        logger.error('Database connection failed:', error);
    }
});

export default app;