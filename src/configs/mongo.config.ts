import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export function getMongoConfig(): MongooseModuleAsyncOptions {
    return {
        useFactory: (configService: ConfigService) => ({
            uri: getMongoString(configService),
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
    }
}

function getMongoString(configService:ConfigService) {
    const host = configService.get('MONGO_HOST');
    const port = configService.get('MONGO_PORT');
    const database = configService.get('MONGO_DATABASE');
    const auth = configService.get('MONGO_AUTHDATABASE');    

    return `mongodb://${host}:${port}/${database}?authSource=${auth}`;
}